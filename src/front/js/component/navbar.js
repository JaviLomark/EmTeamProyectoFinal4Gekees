import React, { useState, useEffect, useContext } from "react";
// import { Context } from "../store/appContext";
import { Link } from "react-router-dom";
import { MenuHome } from "../component/menuHome";
import { CandidateMenu } from "../component/candidateMenu";
import { CompanyMenu } from "../component/companyMenu";

export const Navbar = () => {
  // const { store, actions } = useContext(Context);

  const [rol, setRol] = useState("");

  // useEffect(() => {
  //   if (store.rol == "candidato") {
  //     setRol("candidato");
  //   } else if (store.rol == "empresa") {
  //     setRol("empresa");
  //   }
  // }, [store.rol]);

  useEffect(() => {
    if (localStorage.getItem("rol") == "candidato") {
      setRol("candidato");
    } else if (localStorage.getItem("rol") == "empresa") {
      setRol("empresa");
    }
  }, [localStorage.getItem("rol")]);

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link to="/">
          <span className="navbar-brand h1">EmTalen</span>
        </Link>
        {/* <MenuHome />
        <CandidateMenu />
        <CompanyMenu /> */}
        {/* {typeMenu ? <MenuHome /> : <CandidateMenu /> || <CompanyMenu />} */}
        {rol == "candidato" ? (
          <CandidateMenu />
        ) : rol == "empresa" ? (
          <CompanyMenu />
        ) : (
          <MenuHome />
        )}
      </div>
    </nav>
  );
};
