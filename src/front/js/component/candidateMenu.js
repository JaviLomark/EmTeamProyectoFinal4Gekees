import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const CandidateMenu = () => {
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <div className="btn-group me-2">
        <button
          type="button"
          className="btn btn-primary dropdown-toggle"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          MenuCan
        </button>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-start">
          <li>
            <a className="dropdown-item" href="/canditprofile">
              Editar perfil
            </a>
          </li>
          <li>
            <a className="dropdown-item" href="#">
              Eliminar cuenta
            </a>
          </li>
          <hr className="dropdown-divider" />
          <li>
            <a className="dropdown-item" onClick={logout}>
              Cerrar sesión
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};
