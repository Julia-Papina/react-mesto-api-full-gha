import React from "react";
import { useState } from "react";

function Login(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleInputEmail(e) {
    setEmail(e.target.value);
  }

  function handleInputPassword(e) {
    setPassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(email, password);
  }
  return (
    <section className="login">
      <h2 className="login__title">Вход</h2>
      <form className="login__form" onSubmit={handleSubmit}>
        <input
          className="login__input"
          type="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleInputEmail}
        />
        <input
          className="login__input"
          type="password"
          placeholder="Пароль"
          required
          value={password}
          onChange={handleInputPassword}
        />
        <button className="login__button" type="submit">
          Войти
        </button>
      </form>
    </section>
  );
}
export default Login;
