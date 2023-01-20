import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onPrivate } from "../../private";

export const ListadoCandidatos = () => {
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    onPrivate(setDisabled, navigate, { namePage: "listado-candidatos" });
  }, [disabled]);

  return (
    <div className="container-fluid p-0">
      <h1 className="d-flex justify-content-center mt-3 p-3 mb-2 bg-warning">
        Listado de Candidatos
      </h1>
      <div className="d-flex justify-content-center">
        <button type="button" className="btn btn-primary">
          <a
            className="dropdown-item"
            href="https://3000-4geeksacade-reactflaskh-oxcbm6rsuhk.ws-eu83.gitpod.io/candidato"
          >
            Ver candidato
          </a>
        </button>
      </div>
    </div>
  );
};
