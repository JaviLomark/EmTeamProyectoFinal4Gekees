import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import config from "../config";
import { Context } from "../store/appContext";

export const CandidateMenu = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    navigate("/");
  };

  const eliminarPerfil = async () => {
    const body = JSON.stringify(usuario.id);
    const res = await fetch(`${config.HOSTNAME}/api/usuario/<int:id>/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await res.json();
    const mensaje = confirm("¿Quieres eliminar tu perfil?");
    if (mensaje) {
      alert("Perfil eliminado");
    } else {
      alert("Tu perfil NO se ha eliminado");
    }
    return;
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
            <a
              className="dropdown-item"
              href={`/canditprofile/${store.userId}`}
            >
              Editar perfil
            </a>
          </li>
          <li>
            <a className="dropdown-item" onClick={eliminarPerfil}>
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
