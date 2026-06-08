import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router";

import useAuth from "./hooks/useAuth";
import { loginUser } from "../../shared/apiClient";
import styles from "./LoginPage.module.css";

export default function LoginPage() {
  const queryCliente = useQueryClient();
  const { dispatch } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });

  const { mutate, error, isPending, isError } = useMutation({
    mutationFn: loginUser,
    onSuccess: (responseData) => {
      dispatch({ type: "SET_USER", payload: { user: responseData.user, token: responseData.token } });
      queryClient.invalidateQueires({ queryKey: ["weekly-scoreboard"] });
      queryClient.invalidateQueires({ queryKey: ["weekly-rank"] });
      navigate("/admin");
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    const loginObject = {
      email: email.value,
      password: password.value,
    };

    mutate(loginObject);
  }

  function handleEmailChange(value) {
    setEmail((prev) => ({ error: "", value: value }));
  }

  function handleEmailValidation(value) {
    if (!value) {
      setEmail((prev) => ({ ...prev, error: "Email não pode estar em branco" }));
    }
  }

  function handlePasswordChange(value) {
    setPassword((prev) => ({ error: "", value: value }));
  }

  function handlePasswordValidation(value) {
    if (!value) {
      setPassword((prev) => ({ ...prev, error: "Senha não pode estar em branco" }));
    }
  }

  return (
    <section className={styles.container}>
      <div className={styles.container_content}>
        <div className={styles.container_header}>
          <h1>Bem vindo de volta Leo</h1>
        </div>
        <form className={styles.container_form} onSubmit={handleSubmit}>
          <div className={styles.form_field}>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="E-mail"
              className={styles.form_input}
              onChange={(e) => {
                handleEmailChange(e.target.value);
              }}
              onBlur={(e) => {
                handleEmailValidation(e.target.value);
              }}
            />
            {email.error && <p className={styles.error_message}>{email.error}</p>}
          </div>
          <div className={styles.form_field}>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Senha"
              className={styles.form_input}
              onChange={(e) => {
                handlePasswordChange(e.target.value);
              }}
              onBlur={(e) => {
                handlePasswordValidation(e.target.value);
              }}
            />
            {password.error && <p className={styles.error_message}>{password.error}</p>}
          </div>

          <button className={styles.form_button} disabled={!!password.error || !!email.error || isPending}>
            {isPending ? "Logando" : "Logar"}
          </button>
        </form>
      </div>
    </section>
  );
}
