import React, { useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import config from "../config";
import { Context } from "../store/appContext";

export const CandidateMenu = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    localStorage.removeItem("userId");
    actions.setRol(undefined);
    navigate("/");
  };

  const eliminarPerfil = async () => {
    const mensaje = confirm("¿Quieres eliminar tu perfil?");
    console.log({ mensaje });
    if (mensaje) {
      const res = await fetch(
        `${config.HOSTNAME}/api/usuario/${store.userId}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (res.status != 200) {
        alert(data.msg);
        return;
      }

      console.log({ data });
      logout();
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
          Menu
        </button>
        <ul className="dropdown-menu dropdown-menu-end dropdown-menu-start">
          <li>
            <Link
              className="dropdown-item"
              to={`/canditprofile/${store.userId}`}
            >
              Editar perfil
            </Link>
          </li>
          <li>
            <button className="dropdown-item" onClick={eliminarPerfil}>
              Eliminar cuenta
            </button>
          </li>
          <hr className="dropdown-divider" />
          <li>
            <button className="dropdown-item" onClick={logout}>
              Cerrar sesión
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};
