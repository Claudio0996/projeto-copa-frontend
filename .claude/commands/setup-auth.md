# Setup Auth

Scaffolda a estrutura completa de autenticação baseada no padrão do projeto Copa FrontEnd.

O argumento opcional é a URL base da API. Se não for passado, usa `http://192.168.1.22`.

## O que fazer

**Leia os argumentos:** `$ARGUMENTS` — se o usuário passou uma URL, use-a como `baseURL` no apiClient. Caso contrário, use `http://192.168.1.22`.

**Crie os seguintes arquivos exatamente como descritos abaixo, sem modificar a estrutura.**

---

### 1. `src/shared/apiClient.js`

```js
import axios from "axios";

const instance = axios.create({
  baseURL: "BASE_URL_PLACEHOLDER",
  withCredentials: true,
});

export const setAuthInterceptor = (dispatch) => {
  instance.interceptors.response.use(
    function onSuccess(response) {
      return response;
    },
    async function onInvalidToken(error) {
      const originalRequest = error.config;

      if (error.response?.status === 401) {
        try {
          if (!originalRequest._retry) {
            originalRequest._retry = true;
            const newResponse = await instance.get("/auth/refresh");

            originalRequest.headers.Authorization = `Bearer ${newResponse.data.token}`;
            dispatch({ type: "ALTER_TOKEN", payload: newResponse.data.token });

            return instance(originalRequest);
          }
        } catch (err) {
          dispatch({ type: "REVOKE_DATA" });
        }
      }
      throw error;
    },
  );
};

export const refreshSession = async () => {
  const response = await instance.post("/auth/refresh");
  return response.data;
};

export const loginUser = async (formData) => {
  const response = await instance.post("/auth/login", formData);
  return response.data;
};
```

Substitua `BASE_URL_PLACEHOLDER` pela URL base resolvida do argumento.

---

### 2. `src/features/auth/context/authReducer.js`

```js
const authReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER": {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    }
    case "ALTER_TOKEN": {
      return {
        ...state,
        token: action.payload.token,
      };
    }
    case "REVOKE_DATA": {
      return {
        user: null,
        token: null,
      };
    }
    case "SET_LOADING": {
      return {
        ...state,
        isLoading: false,
      };
    }
    default: {
      return state;
    }
  }
};

export default authReducer;
```

---

### 3. `src/features/auth/context/AuthContext.jsx`

```jsx
import { createContext, useReducer, useEffect } from "react";

import authReducer from "./authReducer";
import { refreshSession, setAuthInterceptor } from "../../../shared/apiClient";

const initialValue = {
  user: null,
  token: null,
  isLoading: true,
};

export const AuthContext = createContext(initialValue);

export default function AuthContextProvider({ children }) {
  const [authState, authDispatch] = useReducer(authReducer, initialValue);

  useEffect(() => {
    setAuthInterceptor(authDispatch);
  }, []);

  useEffect(() => {
    async function refreshSessionLocal() {
      try {
        const refreshData = await refreshSession();
        authDispatch({ type: "SET_USER", payload: { user: refreshData.user, token: refreshData.token } });
      } catch (err) {
      } finally {
        authDispatch({ type: "SET_LOADING" });
      }
    }

    refreshSessionLocal();
  }, []);

  const ctxValue = {
    state: authState,
    dispatch: authDispatch,
  };

  return <AuthContext.Provider value={ctxValue}>{children}</AuthContext.Provider>;
}
```

---

### 4. `src/features/auth/hooks/useAuth.jsx`

```jsx
import { useContext } from "react";

import { AuthContext } from "../context/AuthContext";

export default function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthContextProvider");
  }

  return context;
}
```

---

### 5. `src/features/auth/LoginPage.jsx`

```jsx
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import useAuth from "./hooks/useAuth";
import { loginUser } from "../../shared/apiClient";

export default function LoginPage() {
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const { mutate, isPending } = useMutation({
    mutationFn: loginUser,
    onSuccess: (responseData) => {
      dispatch({ type: "SET_USER", payload: { user: responseData.user, token: responseData.token } });
      navigate("/admin");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    mutate({ email: email.value, password: password.value });
  }

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="E-mail"
          onChange={(e) => setEmail({ value: e.target.value, error: "" })}
          onBlur={(e) => {
            if (!e.target.value) setEmail((prev) => ({ ...prev, error: "Email não pode estar em branco" }));
          }}
        />
        {email.error && <p>{email.error}</p>}

        <input
          type="password"
          placeholder="Senha"
          onChange={(e) => setPassword({ value: e.target.value, error: "" })}
          onBlur={(e) => {
            if (!e.target.value) setPassword((prev) => ({ ...prev, error: "Senha não pode estar em branco" }));
          }}
        />
        {password.error && <p>{password.error}</p>}

        <button disabled={!!email.error || !!password.error || isPending}>
          {isPending ? "Logando..." : "Logar"}
        </button>
      </form>
    </section>
  );
}
```

---

### 6. `src/app/PrivateRoute.jsx`

```jsx
import useAuth from "../features/auth/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

export default function PrivateRoute() {
  const { state } = useAuth();

  if (state.isLoading) {
    return null;
  }

  if (!state.user || !state.token) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
}
```

---

### 7. `src/app/PublicRoute.jsx`

```jsx
import useAuth from "../features/auth/hooks/useAuth";
import { Navigate, Outlet } from "react-router";

export default function PublicRoute() {
  const { state } = useAuth();

  if (state.isLoading) {
    return null;
  }

  if (state.user && state.token) {
    return <Navigate to="/admin" />;
  }

  return <Outlet />;
}
```

---

### 8. `src/app/Router.jsx`

```jsx
import { createBrowserRouter } from "react-router";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";
import LoginPage from "../features/auth/LoginPage";

const router = createBrowserRouter([
  {
    path: "/admin",
    element: <PrivateRoute />,
    children: [{ index: true, element: <div>Admin Panel</div> }],
  },
  {
    path: "/",
    element: <PublicRoute />,
    children: [{ index: true, element: <LoginPage /> }],
  },
]);

export default router;
```

---

### 9. `src/main.jsx`

```jsx
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AuthContextProvider from "./features/auth/context/AuthContext";
import router from "./app/Router";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContextProvider>
        <RouterProvider router={router} />
      </AuthContextProvider>
    </QueryClientProvider>
  </StrictMode>,
);
```

---

### 10. `AUTH_SETUP.md` (na raiz do projeto)

Crie esse arquivo na raiz do projeto com o conteúdo de documentação descrito abaixo.

O arquivo deve documentar:
- Visão geral da estrutura criada
- Árvore de arquivos gerados
- O que cada arquivo faz (uma linha por arquivo)
- Dependências necessárias e o comando exato de instalação
- Como integrar com o backend (endpoints esperados)
- Fluxo de autenticação passo a passo
- Como estender (adicionar novas rotas protegidas, trocar o token de header, etc.)

Use linguagem clara, sem jargão desnecessário. O documento deve ser completo o suficiente para um desenvolvedor novo configurar tudo do zero.

---

## Após criar todos os arquivos

Informe o usuário:
1. Quais arquivos foram criados
2. O comando de instalação das dependências
3. Que o `main.jsx` deve ser revisado se já existir (para não sobrescrever imports existentes)
4. Que o `LoginPage.jsx` foi gerado sem estilos — o usuário deve adicionar CSS conforme o projeto
