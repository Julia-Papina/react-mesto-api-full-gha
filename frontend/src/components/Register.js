import { useState } from "react";
import { Link } from "react-router-dom";

function Register(props) {
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
    props.onRegister(email, password);
  }

  return (
    <section className="login">
      <h2 className="login__title">Регистрация</h2>
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
          Зарегистрироваться
        </button>
      </form>
      <p className="login__text">
        Уже зарегистрированы?{" "}
        <Link to="/sign-in" className="login__link">
          {" "}
          Войти{" "}
        </Link>
      </p>
    </section>
  );
}
export default Register;
