import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onPrivate } from "../../private";
import config from "../../config";

export const ListadoCandidatos = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [candidatos, setCandidatos] = useState([]);

  useEffect(() => {
    // onPrivate(setDisabled, navigate, { namePage: "listado_candidatos" });
    obtenerListaCandidatos();
  }, [disabled]);

  const obtenerListaCandidatos = async () => {
    const candidatosRes = await fetch(
      `${config.HOSTNAME}/api/lista_candidatos`
    );
    // TODO: validar candidatosRes.status(codigo) != 200 alert

    const data = await candidatosRes.json();
    console.log({ data });
    setCandidatos(data.data);
    setloading(false);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center mt-5 mb-5 spinner">
        <div
          className="spinner-grow text-warning mt-5 mb-5 p-4"
          role="status"
        ></div>
      </div>
    );
  }

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
      {/* ---- */}
      {candidatos.map((candidato) => (
        <>
          <div key={candidato.id} className="row justify-content-center m-3">
            <div className="card col-10 col-md-8 mt-3">
              <div className="card-body">
                <img src={candidato.avatar} style={{ width: "50px" }}></img>

                <h4 className="card-title">{candidato.puesto_trab}</h4>
                <i className="fas fa-map-marker-alt"></i>
                <span> {candidato.provincia}</span>
                <i className="fas fa-street-view ms-4"></i>
                <span> {candidato.tipo_emp}</span>
                <a
                  href="#"
                  className="btn btn-primary position-absolute top-0 end-0 m-4"
                  onClick={() => navigate(`/candidato/${candidato.usuario_id}`)}
                >
                  Ver Candidato
                </a>
              </div>
            </div>
          </div>
        </>
      ))}
      {/* ---- */}
    </div>
  );
};
