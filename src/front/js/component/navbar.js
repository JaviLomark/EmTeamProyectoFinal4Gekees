import React, { useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { MenuHome } from "../component/menuHome";
import { CandidateMenu } from "../component/candidateMenu";
import { CompanyMenu } from "../component/companyMenu";
import { useNavigate } from "react-router-dom";

export const Navbar = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  useEffect(() => {
    const rol = localStorage.rol ?? null;
    const userId = localStorage.userId ?? null;

    console.log(`[UPDATE-ROL] rol:${rol}`);
    actions.setRol(rol);
    actions.setUserId(userId);
  }, [store.rol]);

  const toHome = () => {
    navigate("/canditprofile/39");
  };

  console.log(`>>> rol: ${store.rol}`);
  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        {/* <Link to="/"> */}
        <span className="navbar-brand h1" onClick={toHome}>
          EmTalen
        </span>
        {/* </Link> */}
        {/* <MenuHome />
        <CandidateMenu />
        <CompanyMenu /> */}
        {/* {typeMenu ? <MenuHome /> : <CandidateMenu /> || <CompanyMenu />} */}
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
