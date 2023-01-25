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
      <h1 className="d-flex justify-content-center p-3 mb-2 bg-warning">
        Listado de Candidatos
      </h1>
      <div className="row justify-content-center mt-4 fw-bold ">
        <div className="col-auto">
          Provincia
          <select className="form-select" aria-label="provincias">
            <option defaultValue>Seleccionar</option>
            <option value="madrid">Madrid</option>
            <option value="barcelona">Barcelona</option>
            <option value="bilbao">Bilbao</option>
          </select>
        </div>
        <div className="col-auto">
          Tipo de empleo
          <select className="form-select" aria-label="provincias">
            <option defaultValue>Seleccionar</option>
            <option value="presencial">Presencial</option>
            <option value="remoto">Remoto</option>
            <option value="hibrido">Hibrido</option>
          </select>
        </div>
      </div>
      <div className="row justify-content-center m-3">
        <div className="card col-10 col-md-8 mt-3">
          <div className="card-body">
            <h4 className="card-title">Desarrollador web</h4>
            <i className="fas fa-map-marker-alt"></i>
            <span> Madrid</span>
            <i className="fas fa-street-view ms-4"></i>
            <span> Remoto</span>
            <a
              href="#"
              className="btn btn-primary position-absolute top-0 end-0 m-4"
            >
              Ver Candidato
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
