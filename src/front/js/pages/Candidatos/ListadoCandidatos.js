import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onPrivate } from "../../private";
import config from "../../config";
import "./listadoCandidatos.css";

const infoBase = {
  candidatos: null,
  provincias: null,
  tipoEmpleos: null,
};

export const ListadoCandidatos = () => {
  const navigate = useNavigate();
  const [loading, setloading] = useState(true);
  const [disabled, setDisabled] = useState(true);
  const [informacion, setInformacion] = useState(infoBase);

  useEffect(() => {
    // onPrivate(setDisabled, navigate, { namePage: "listado_candidatos" });
    getData();
  }, [disabled]);

  const getData = async () => {
    const provinciasResponse = fetch(`${config.HOSTNAME}/api/provincias`);
    const tiposEmpleosResponse = fetch(`${config.HOSTNAME}/api/tiposEmpleo`);
    const candidatosRes = fetch(`${config.HOSTNAME}/api/lista_candidatos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({}),
    });

    const promises = [candidatosRes, provinciasResponse, tiposEmpleosResponse];

    const responseList = await Promise.all(promises);

    // --
    const keys = Object.keys(infoBase);
    const auxInfoBase = { ...infoBase };
    for (let index = 0; index < responseList.length; index++) {
      const response = responseList[index];
      const data = await response.json();
      auxInfoBase[keys[index]] = data.data;
    }
    console.log(auxInfoBase);
    setInformacion(auxInfoBase);

    // --
    setloading(false);
  };

  const onSearch = () => {
    const provinciaId = Number(document.getElementById("provincia").value);
    const tipoEmpleoId = Number(document.getElementById("tipoEmpleo").value);

    const candidatosRes = fetch(`${config.HOSTNAME}/api/lista_candidatos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        provinciaId: provinciaId > -1 ? provinciaId : undefined,
        tipoEmpleoId: tipoEmpleoId > -1 ? tipoEmpleoId : undefined,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        const newInformacion = JSON.parse(JSON.stringify(informacion)); // hago una copia
        newInformacion.candidatos = data.data;
        setInformacion(newInformacion);
      });
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
      <div className="row justify-content-center mt-3 fw-bold">
        <div className="mt-3 col-4 col-xl-3">
          Provincia*
          <select
            className="form-select mt-2"
            aria-label="provincias"
            required
            id="provincia"
            onChange={onSearch}
          >
            <option value={-1}>Selecciona una provincia</option>

            {informacion.provincias.map((p) => (
              <option key={p.id} value={p.id}>
                {p.Nprovincia}
              </option>
            ))}
          </select>
        </div>
        <div className="mt-3 col-4 col-xl-3">
          Tipo de trabajo*
          <select
            className="form-select mt-2"
            aria-label="tipoEmpleo"
            required
            id="tipoEmpleo"
            onChange={onSearch}
          >
            <option value={-1}>Selecciona un tipo de trabajo</option>

            {informacion.tipoEmpleos.map((pt) => (
              <option key={pt.id} value={pt.id}>
                {pt.NEmpleo}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* ---- */}
      {informacion.candidatos.map((candidato) => (
        <>
          <div key={candidato.id} className="row justify-content-center m-3">
            <div className="card col-10 mt-3">
              <div className="row">
                <div className="col-2">
                  <img src={candidato.avatar} style={{ width: "5rem" }}></img>
                </div>
                <div className="col-8">
                  <div className="card-body">
                    <h4 className="card-title">{candidato.puesto_trab}</h4>
                    <i className="fas fa-map-marker-alt"></i>
                    <span> {candidato.provincia}</span>
                    <i className="fas fa-street-view ms-4"></i>
                    <span> {candidato.tipo_emp}</span>
                    <a
                      href="#"
                      className="btn btn-primary position-absolute top-0 end-0 m-4"
                      onClick={() =>
                        navigate(`/candidato/${candidato.usuario_id}`)
                      }
                    >
                      Ver
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ))}
    </div>
  );
};
