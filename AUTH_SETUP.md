# Auth Setup

Documentação da estrutura de autenticação implementada no projeto.

---

## Visão geral

O sistema de auth utiliza React Context + useReducer para gerenciar estado global de autenticação, React Router para proteção de rotas, Axios com interceptor para renovação automática de token, e TanStack Query para a mutation de login.

O fluxo é baseado em **refresh token via cookie HttpOnly**: ao carregar a aplicação, uma chamada é feita ao backend para tentar restaurar a sessão. Se o cookie de refresh existir e for válido, o usuário é autenticado automaticamente e redirecionado para `/admin`.

---

## Arquivos gerados

```
src/
├── shared/
│   └── apiClient.js                    # Instância axios + interceptor 401 + funções de API
├── features/
│   └── auth/
│       ├── context/
│       │   ├── AuthContext.jsx         # Provider do contexto + restauração de sessão
│       │   └── authReducer.js          # Reducer com ações SET_USER, ALTER_TOKEN, REVOKE_DATA, SET_LOADING
│       ├── hooks/
│       │   └── useAuth.jsx             # Hook de acesso ao AuthContext
│       └── LoginPage.jsx               # Página de login (sem estilos — adicionar manualmente)
└── app/
    ├── PrivateRoute.jsx                # Rota protegida: redireciona para / se não autenticado
    ├── PublicRoute.jsx                 # Rota pública: redireciona para /admin se já autenticado
    └── Router.jsx                      # Configuração de rotas
```

---

## Dependências necessárias

| Pacote | Uso |
|---|---|
| `axios` | Cliente HTTP e interceptor de token |
| `react-router` | Roteamento, `<Navigate>`, `useNavigate` |
| `@tanstack/react-query` | Mutation de login com `useMutation` |

### Comando de instalação

```bash
npm install axios react-router @tanstack/react-query
```

---

## Endpoints esperados no backend

| Método | Rota | Descrição |
|---|---|---|
| `POST` | `/auth/login` | Recebe `{ email, password }`, retorna `{ user, token }` e seta cookie de refresh |
| `POST` | `/auth/refresh` | Lê o cookie HttpOnly, retorna `{ user, token }` |

O Axios já está configurado com `withCredentials: true` para enviar e receber cookies automaticamente.

---

## Fluxo de autenticação

### Restauração de sessão (ao carregar a app)

```
App monta
  └─> AuthContextProvider.useEffect
        └─> POST /auth/refresh
              ├─> Sucesso: dispatch SET_USER (user + token) → isLoading: false
              │     └─> PublicRoute detecta user/token → <Navigate to="/admin">
              └─> Erro: dispatch SET_LOADING → isLoading: false
                    └─> PublicRoute renderiza LoginPage
```

### Login

```
Usuário preenche formulário e submete
  └─> useMutation → POST /auth/login
        └─> onSuccess: dispatch SET_USER → navigate("/admin")
              └─> PrivateRoute: user e token existem → renderiza AdminPanel
```

### Token expirado durante uso (interceptor 401)

```
Requisição qualquer → resposta 401
  └─> interceptor: POST /auth/refresh
        ├─> Sucesso: dispatch ALTER_TOKEN + reexecuta requisição original
        └─> Erro: dispatch REVOKE_DATA → usuário volta para /
```

### Logout

Para implementar logout, basta despachar a ação `REVOKE_DATA`:

```js
const { dispatch } = useAuth();
dispatch({ type: "REVOKE_DATA" });
```

O `PrivateRoute` detecta que `user` e `token` são `null` e redireciona para `/`.

---

## Adicionando novas rotas protegidas

Em `src/app/Router.jsx`, adicione dentro do `PrivateRoute`:

```jsx
{
  path: "/admin",
  element: <PrivateRoute />,
  children: [
    { index: true, element: <AdminPanel /> },
    { path: "settings", element: <SettingsPage /> },  // nova rota
  ],
}
```

---

## Configuração do `main.jsx`

A ordem dos providers importa. `AuthContextProvider` deve estar **dentro** do `QueryClientProvider` (para poder usar hooks do React Query futuramente) e **fora** do `RouterProvider` (para ser acessível por toda a árvore de rotas):

```jsx
<QueryClientProvider client={queryClient}>
  <AuthContextProvider>
    <RouterProvider router={router} />
  </AuthContextProvider>
</QueryClientProvider>
```

> `AuthContextProvider` não pode usar `useNavigate()` porque está fora do router. O redirecionamento após restauração de sessão é feito pelo `PublicRoute`, que é um componente dentro do router.
