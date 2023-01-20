import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { onPrivate } from "../../private";
import "./CanditProfile.css";

export const FormularioCandit = () => {
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    onPrivate(setDisabled, navigate, { namePage: "canditprofile" });
  }, [disabled]);

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
        <div className="form-check form-switch d-flex justify-content-center m-1">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="habilitar-deshabilitar"
            defaultChecked
          />
          <label
            className="form-check-label ms-1"
            htmlFor="habilitar-deshabilitar"
          >
            Habilitar/Deshabilitar
          </label>
        </div>
        {/* Columna derecha/izquierda */}
        <div className="row justify-content-center m-5 fw-bold">
          {/* Columna izquierda */}
          <div className="col-md-4">
            <div className="mt-3">
              <label htmlFor="nombre" className="form-label">
                Nombre*
              </label>
              <input type="text" className="form-control" id="nombre" />
            </div>
            <div className="mt-3">
              <label htmlFor="primer-apellido" className="form-label">
                Primer apellido*
              </label>
              <input
                type="text"
                className="form-control"
                id="primer-apellido"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="segundo-apellido" className="form-label">
                Segundo apellido
              </label>
              <input
                type="text"
                className="form-control"
                id="segundo-apellido"
              />
            </div>
            <div className="mt-3">
              Provincia
              <select className="form-select mt-2" aria-label="provincias">
                <option defaultValue>Provincia</option>
                <option value="madrid">Madrid</option>
                <option value="barcelona">Barcelona</option>
                <option value="bilbao">Bilbao</option>
              </select>
            </div>
            <div className="mt-3">
              <label htmlFor="puestotrabajo" className="form-label">
                Puesto de trabajo
              </label>
              <input type="text" className="form-control" id="puestotrabajo" />
            </div>
          </div>
          {/* Columna derecha */}
          <div className="col-md-4">
            <div className="mt-3">
              <label htmlFor="tipo-trabajo" className="form-label">
                Tipo de trabajo
              </label>
              <input type="text" className="form-control" id="tipo-trabajo" />
            </div>
            <div className="mt-3">
              <label htmlFor="telefono" className="form-label">
                Télefono
              </label>
              <input type="text" className="form-control" id="telefono" />
            </div>
            <div className="mt-3">
              <label htmlFor="experiencia" className="form-label">
                Experiencia
              </label>
              <input type="text" className="form-control" id="experiencia" />
            </div>
            <div className="mt-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input type="email" className="form-control" id="email" />
            </div>
            <div className="mt-3">
              <label htmlFor="cv" className="form-label">
                C.V
              </label>
              <input type="file" className="form-control" id="cv" />
            </div>
          </div>
          <div className="form-floating col-md-8 mt-3">
            <label htmlFor="carta-presentacion"></label>
            Carta de presentación
            <textarea
              className="form-control"
              type="text-area"
              style={{ height: "10rem" }}
              id="carta-presentacion"
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
