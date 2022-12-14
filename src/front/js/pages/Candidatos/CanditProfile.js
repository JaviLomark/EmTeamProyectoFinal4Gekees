import propTypes from "prop-types";
import React, { useState, Component } from "react";
import "./image1.png";
import "./CanditProfile.css";

export const FormularioCandit = () => {
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    onPrivate(setDisabled, navigate, { namePage: "canditprofile" });
  }, [disabled]);

  // if (disabled) {
  //   <div className="d-flex justify-content-center">
  //     <div className="spinner-grow text-warning" role="status"></div>
  //   </div>;
  // }

  return (
    <div className="container-fluid">
      <h1 className="MiPerfil">Mi perfil</h1>
      <form>
        <div id="avatar">
          <img src="https://res.cloudinary.com/dzpvz1nag/image/upload/v1673638486/image_1_zapzbe.png" />
        </div>
        <div className="wrap-toggle">
          <label htmlFor="toggle" className="switch"></label>
          <input type="checkbox" id="toggle" className="offscreen" />
        </div>
        <div class="col-6 izquierda">
          <div>
            <label htmlFor="nombre" className="form-label">
              Nombre
            </label>
            <input type="text" className="form-control" id="izquierda" />
          </div>

          <div>
            <label htmlFor="Primer-apellido" className="form-label">
              Primer apellido
            </label>
            <input type="text" className="form-control" id="izquierda" />
          </div>
          <div>
            <label htmlFor="Segundo-apellido" className="form-label">
              Segundo apellido
            </label>
            <input type="text" className="form-control" id="izquierda" />
          </div>
          <div>
            <label htmlFor="Puesto-de-trabajo" className="form-label">
              Puesto de trabajo
            </label>
            <input type="text" className="form-control" id="izquierda" />
          </div>
          <div>
            <label htmlFor="provincia" className="form-label">
              Provincia
            </label>
            <select type="text" className="form-control" id="izquerda"></select>
          </div>
        </div>
        <div className="col-6 derecha">
          <div>
            <label htmlFor="tipodetrabajo" className="form-label">
              Tipo de trabajo
            </label>
            <input type="text" className="form-control" id="derecha" />
          </div>

          <div>
            <label htmlFor="telefono" className="form-label">
              Télefono
            </label>
            <input type="text" className="form-control" id="derecha" />
          </div>

          <div>
            <label htmlFor="experiencia" className="form-label">
              Experiencia
            </label>
            <input type="text" className="form-control" id="derecha" />
          </div>

          <div>
            <label htmlFor="Email" className="form-label">
              Email
            </label>
            <input type="text" className="form-control" id="derecha" />
          </div>
          <div>
            <label htmlFor="cv" className="form-label">
              C.V
            </label>
            <input type="file" className="form-control" id="derecha" />
          </div>
        </div>
        <div className="cpresent">
          <div>
            <label htmlFor="cpresentacion" className="form-label">
              Carta de presentación
            </label>
            <textarea
              type="text"
              className="form-control-text-area"
              id="cpresentacion"
            ></textarea>
          </div>
        </div>
        <div id="BtnGuardar">
          <button type="submit" className="btn btn-primary" id="BGuardar">
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};
