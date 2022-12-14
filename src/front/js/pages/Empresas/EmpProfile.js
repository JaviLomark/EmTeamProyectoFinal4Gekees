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

  // if (disabled) {
  //   <div className="d-flex justify-content-center">
  //     <div className="spinner-grow text-warning" role="status"></div>
  //   </div>;
  // }

  return (
    <div>
      <h1 className="MiPerfil">Mi perfil</h1>
      <form>
        <div className="mb-3">
          <input type="image" className="form-control" id="logoempresa" />
        </div>

        <div className="mb-3">
          <label for="nombre" className="form-label">
            Nombre de la empresa
          </label>
          <input type="text" className="form-control" id="nombre" />
        </div>

        <div className="mb-3">
          <label for="ntrabajadores" className="form-label">
            Numero de trabajadores
          </label>
          <input type="text" className="form-control" id="ntrabajadores" />
        </div>

        <div className="mb-3">
          <label for="Ubicacion" className="form-label">
            Ubicacion
          </label>
          <input type="text" className="form-control" id="Ubicacion" />
        </div>

        <div className="mb-3">
          <label for="tipoempleo" className="form-label">
            Tipo de empleo
          </label>
          <input type="text" className="form-control" id="tipoempleo" />
        </div>

        <div className="mb-3">
          <label for="Sede" className="form-label">
            Sede
          </label>
          <input type="text" className="form-control" id="Sede" />
        </div>

        <div className="mb-3">
          <label for="Telefono" className="form-label">
            Telefono
          </label>
          <input type="text" className="form-control" id="Telefono" />
        </div>

        <div className="mb-3">
          <label for="Sector" className="form-label">
            Sector
          </label>
          <input type="text" className="form-control" id="Sector" />
        </div>

        <div className="mb-3">
          <label for="idf" className="form-label">
            Identificacion fiscal (C.I.F o N.I.F)
          </label>
          <input type="text" className="form-control" id="idf" />
        </div>

        <div className="mb-3">
          <label for="experiencia" className="form-label">
            Experiencia
          </label>
          <input type="text" className="form-control" id="experiencia" />
        </div>

        <div className="mb-3">
          <label for="Descripcion" className="form-label">
            Descripcion
          </label>
          <textarea
            type="text"
            className="form-control"
            id="Descripcion"
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Guardar
        </button>
      </form>
    </div>
  );
};
