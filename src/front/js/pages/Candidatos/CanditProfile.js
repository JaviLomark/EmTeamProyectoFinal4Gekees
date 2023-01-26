import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onPrivate } from "../../private";
import "./CanditProfile.css";
import config from "../../config";

const formularioTemplate = {
  nombre: null,
  primerApellido: null,
  segundoApellido: null,
  puestoTrabajo: null,
  telefono: null,
  experiencia: null,
  cv: null,
  cartaPresentacion: null,
  tipoEmpleo: null,
  provincia: null,
};

export const FormularioCandit = () => {
  const [disabled, setDisabled] = useState(true);
  const navigate = useNavigate();
  const [formulario, setFormulario] = useState(formularioTemplate);
  const [nombre, insertarNombre] = useState([]);
  const [primerApellido, insertarApellido1] = useState([]);
  const [segundoApellido, insertarApellido2] = useState([]);
  const [puestoTrabajo, insertarPuestoTrabajo] = useState([]);
  const [telefono, insertarTelefono] = useState([]);
  const [experiencia, insertarExperiencia] = useState([]);
  const [cv, insertarCv] = useState([]);
  const [cartaPresentacion, insertarCartaPresen] = useState([]);
  const [tipoEmpleo, insertarTipoEmpleo] = useState([]);
  const [provincia, insertarProvincia] = useState([]);

  // ------ORIGINAL------

  // useEffect(async () => {
  //   onPrivate(setDisabled, navigate, { namePage: "canditprofile" });
  //   const res = await fetch(`${config}/canditprofile/${params.uid}`);
  //   fetch(`${config}/canditprofile/${params.uid}`, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((resp) => {
  //       return resp.json();
  //     })
  //     .then((respJSON) => {
  //       console.log(respJSON);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // }, [disabled]);

  // ------CON RETURN------

  // useEffect(() => {
  //   return async () => {
  //     onPrivate(setDisabled, navigate, { namePage: "canditprofile" });
  //     const res = await fetch(`${config}/canditprofile/${params.uid}`);
  //     fetch(`${config}/canditprofile/${params.uid}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     })
  //       .then((resp) => {
  //         return resp.json();
  //       })
  //       .then((respJSON) => {
  //         console.log(respJSON);
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  // }, [disabled]);

  // ------FUNCION DENTRO + CREANDO CONSTANTE------

  // useEffect(() => {
  //   onPrivate(setDisabled, navigate, { namePage: "canditprofile" });
  //   const fetchCandit = async () => {
  //     const initialCandit = await fetch(
  //       `${config}/canditprofile/${params.uid}`
  //     );
  //     setCandit(initialCandit);
  //     fetchCandit();
  //     fetch(`${config}/canditprofile/${params.uid}`, {
  //       method: "PUT",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //   };
  // }, [disabled]);

  // ------SACANDO FUNCION Y LLAMANDOLA------

  useEffect(() => {
    onPrivate(setDisabled, navigate, { namePage: "canditprofile" });
    fetchCandit();
  }, [disabled]);

  const fetchCandit = async () => {
    const res = await fetch(`${config}/canditprofile/${params.id}`);
    fetch(`${config}/canditprofile/${params.uid}`, {
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
            Ocultar perfil
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
              <input
                type="text"
                className="form-control"
                id="nombre"
                required
              />
            </div>
            <div className="mt-3">
              <label htmlFor="primer-apellido" className="form-label" required>
                Primer apellido*
              </label>
              <input
                type="text"
                className="form-control"
                id="primer-apellido"
              />
            </div>
            <div className="mt-3">
              <label htmlFor="segundo-apellido" className="form-label" required>
                Segundo apellido*
              </label>
              <input
                type="text"
                className="form-control"
                id="segundo-apellido"
              />
            </div>
            <div className="mt-3">
              Provincia*
              <select
                className="form-select mt-2"
                aria-label="provincias"
                required
              >
                <option defaultValue>Selecciona una provincia</option>
                <option value="madrid">Madrid</option>
                <option value="barcelona">Barcelona</option>
                <option value="bilbao">Bilbao</option>
              </select>
            </div>
            <div className="mt-3">
              Tipo de trabajo*
              <select
                className="form-select mt-2"
                aria-label="tipoTrabajo"
                required
              >
                <option defaultValue>Selecciona un tipo de trabajo</option>
                <option value="remoto">Remoto</option>
                <option value="presencial">Presencial</option>
                <option value="hibrido">Hibrido</option>
              </select>
            </div>
          </div>
          {/* Columna derecha */}
          <div className="col-md-4">
            <div className="mt-3">
              Puesto de trabajo*
              <select
                className="form-select mt-2"
                aria-label="provincias"
                required
              >
                <option defaultValue>Selecciona un puesto de trabajo</option>
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
              <label htmlFor="experiencia" className="form-label">
                Experiencia*
              </label>
              <input
                type="text"
                className="form-control"
                id="experiencia"
                required
              />
            </div>
            <div className="mt-3">
              <label htmlFor="email" className="form-label">
                Email*
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
              />
            </div>
            <div className="mt-3">
              <label htmlFor="cv" className="form-label">
                C.V*
              </label>
              <input type="file" className="form-control" id="cv" required />
            </div>
          </div>
          <div className="form-floating col-md-8 mt-3">
            <label htmlFor="carta-presentacion"></label>
            Carta de presentación*
            <textarea
              required
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
