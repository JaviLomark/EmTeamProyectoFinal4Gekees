import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onPrivate } from "../../private";
import config from "../../config";

const formularioTemplate = {
  nombreEmpresa: null,
  ubicacion: null,
  identFiscal: null,
  sede: null,
  tipoTrababajo: null,
  sector: null,
  telefono: null,
  numTrabajadores: null,
  descripcion: null,
};

export const FormularioEmp = () => {
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState(formularioTemplate);
  const [nombreEmpresa, insertarNomEmpre] = useState([]);
  const [ubicacion, insertarUbicacion] = useState([]);
  const [identFiscal, insertarIdentFiscal] = useState([]);
  const [sede, insertarSede] = useState([]);
  const [tipoTrabajo, insertarTipoTrabajo] = useState([]);
  const [sector, insertarSector] = useState([]);
  const [telefono, insertarTelefono] = useState([]);
  const [numTrabajadores, inserNumTrabajadores] = useState([]);
  const [descripcion, insertarDescrip] = useState([]);

  useEffect(() => {
    onPrivate(setDisabled, navigate, { namePage: "empprofile" });
    fetchEmpre();
  }, [disabled]);

  const fetchEmpre = async () => {
    const res = await fetch(`${config}/empprofile/${params.id}`);
    fetch(`${config}/empprofile/${params.uid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((resp) => {
        return resp.json();
      })
      .then((respJSON) => {
        console.log(respJSON);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container-fluid p-0">
      <h1 className="d-flex justify-content-center p-3 mb-2 bg-warning">
        Mi perfil
      </h1>
      <form>
        <div id="avatar" className="d-flex justify-content-center">
          <img
            src="https://res.cloudinary.com/dzpvz1nag/image/upload/v1673638486/image_1_zapzbe.png"
            className="img-fluid"
            style={{ width: "16rem" }}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button type="submit" className="btn btn-primary m-1 p-1">
            Cambiar foto
          </button>
        </div>
        {/* Columna derecha/izquierda */}
        <div className="row justify-content-center m-5 fw-bold">
          {/* Columna izquierda */}
          <div className="col-md-4">
            <div className="mt-3">
              <label htmlFor="nombre-empresa" className="form-label">
                Nombre de la empresa*
              </label>
              <input
                type="text"
                className="form-control"
                id="nombre-empresa"
                required
              />
            </div>
            <div className="mt-3">
              <label htmlFor="ubicacion" className="form-label">
                Ubicación*
              </label>
              <input
                type="text"
                className="form-control"
                id="ubicacion"
                required
              />
            </div>
            <div className="mt-3">
              <label htmlFor="identificacion-fiscal" className="form-label">
                Identificacion fiscal*
              </label>
              <input
                required
                type="text"
                className="form-control"
                id="identificacion-fiscal"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="sede" className="form-label">
                Sede*
              </label>
              <input type="text" className="form-control" id="sede" required />
            </div>
          </div>
          {/* Columna derecha */}
          <div className="col-md-4">
            <div className="mt-3">
              <label htmlFor="tipo-trabajo" className="form-label">
                Tipo de Trabajo*
              </label>
              <input
                type="text"
                className="form-control"
                id="tipo-trabajo"
                required
              />
            </div>
            <div className="mt-3">
              Sector*
              <select className="form-select mt-2" aria-label="sector" required>
                <option defaultValue>Selecciona un sector*</option>
                <option value="Desarrollador">Desarrollador</option>
                <option value="Junior">Junior</option>
                <option value="Senior">Senior</option>
              </select>
            </div>
            <div className="mt-3">
              <label htmlFor="telefono" className="form-label">
                Télefono*
              </label>
              <input
                type="text"
                className="form-control"
                id="telefono"
                required
              />
            </div>
            <div className="mt-3">
              <label htmlFor="numeroTrabajadores" className="form-label">
                Numero de Trabajadores*
              </label>
              <input
                type="text"
                className="form-control"
                id="numeroTrabajadores"
                required
              />
            </div>
          </div>
          <div className="form-floating col-md-8 mt-3">
            <label htmlFor="descripcion"></label>
            Descripcion*
            <textarea
              required
              className="form-control"
              type="text-area"
              id="descripcion"
              style={{ height: "10rem" }}
            ></textarea>
          </div>
          <button type="submit" className="btn btn-primary mt-3 col-5">
            GUARDAR
          </button>
        </div>
      </form>
    </div>
  );
};
