import React from "react";
import logo from "../images/logotip_mesto.svg";
import { Link } from "react-router-dom";

function Header(props) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Лого Место" />
      <nav className="header__auth">
        <p className="header__text">{props.mail}</p>
        <Link
          to={props.route}
          className="header__link"
          type="button"
          onClick={props.onClick}
        >
          {props.title}
        </Link>
      </nav>
    </header>
  );
}
export default Header;
