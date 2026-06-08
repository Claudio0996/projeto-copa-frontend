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
