import React from "react";
import { Link } from "react-router-dom";
import "../../styles/navbarStyles.css";

export const Navbar = () => {
  return (
    <nav className="navbar navbar-light bg-light">
      <div className="container">
        <Link to="/">
          <span className="navbar-brand mb-0 h1">EmTalent</span>
        </Link>
        <div className="ml-auto">
          <Link to="/demo">
            <button className="btn btn-primary">
              Check the Context in action
            </button>
          </Link>
        </div>
      </div>
      <div className="bajo container-fluid">
        <span className="hola">Perfil candidato</span>
      </div>
    </nav>
  );
};
