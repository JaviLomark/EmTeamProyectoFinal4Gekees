import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EmpProfile.css";
import { onPrivate } from "../../private";

export const FormularioEmp = () => {
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    onPrivate(setDisabled, navigate, { namePage: "empprofile" });
  }, [disabled]);

  return (
    <div className="container-fluid p-0">
      <h1 className="miPerfil d-flex justify-content-center p-3 mb-2 bg-warning">
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
              <input type="text" className="form-control" id="nombre-empresa" />
            </div>
            <div className="mt-3">
              <label htmlFor="ubicacion" className="form-label">
                Ubicación
              </label>
              <input type="text" className="form-control" id="ubicacion" />
            </div>
            <div className="mt-3">
              <label htmlFor="numero-trabajadores" className="form-label">
                Numero de trabajadores
              </label>
              <input
                type="text"
                className="form-control"
                id="numero-trabajadores"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="sede" className="form-label">
                Sede
              </label>
              <input type="text" className="form-control" id="sede" />
            </div>
          </div>
          {/* Columna derecha */}
          <div className="col-md-4">
            <div className="mt-3">
              <label htmlFor="tipo-trabajo" className="form-label">
                Tipo de Trabajo
              </label>
              <input type="text" className="form-control" id="tipo-trabajo" />
            </div>
            <div className="mt-3">
              <label htmlFor="sector" className="form-label">
                Sector
              </label>
              <input type="text" className="form-control" id="sector" />
            </div>
            <div className="mt-3">
              <label htmlFor="telefono" className="form-label">
                Télefono
              </label>
              <input type="text" className="form-control" id="telefono" />
            </div>
            <div className="mt-3">
              <label htmlFor="identificacion-fiscal" className="form-label">
                Identificacion fiscal
              </label>
              <input
                type="text"
                className="form-control"
                id="identificacion-fiscal"
              />
            </div>
          </div>
          <div className="form-floating col-md-8 mt-3">
            <label htmlFor="descripcion"></label>
            Descripcion
            <textarea
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
