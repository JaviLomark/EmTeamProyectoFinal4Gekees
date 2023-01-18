import React from "react";
import { Link } from "react-router-dom";
import { MenuHome } from "../component/menuHome";
import { CandidateMenu } from "../component/candidateMenu";
import { CompanyMenu } from "../component/companyMenu";

export const Navbar = () => {
  // const typeMenu = true;

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link to="/">
          <span className="navbar-brand h1">EmTalen</span>
        </Link>
        <MenuHome />
        <CandidateMenu />
        <CompanyMenu />
        {/* {typeMenu ? <MenuHome /> : <CandidateMenu /> || <CompanyMenu />} */}
      </div>
    </nav>
  );
};
