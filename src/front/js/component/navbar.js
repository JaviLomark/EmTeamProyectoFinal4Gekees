import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { MenuHome } from "../component/menuHome";
import { CandidateMenu } from "../component/candidateMenu";
import { CompanyMenu } from "../component/companyMenu";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  useEffect(() => {
    const rol = localStorage.rol ?? null;
    const userId = localStorage.userId ?? null;

    actions.setRol(rol);
    actions.setUserId(userId);
  }, [store.rol]);

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link to="/">
          <span className="navbar-brand h1">EmTalen</span>
        </Link>
        {store.rol == "candidato" ? (
          <CandidateMenu />
        ) : store.rol == "empresa" ? (
          <CompanyMenu />
        ) : (
          <MenuHome />
        )}
      </div>
    </nav>
  );
};
