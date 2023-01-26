import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onPrivate } from "../../private";
import { Context } from "../../store/appContext";
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

const infoBase = {
  candidato: null,
  provincias: null,
  tipoEmpleos: null,
  puestoTrabajos: null,
};

export const FormularioCandit = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [informacion, setInformacion] = useState(infoBase);

  useEffect(() => {
    const userId = store.userId;
    if (!userId) {
      navigate("/");
      return;
    }
    onPrivate(setDisabled, navigate, { namePage: "canditprofile" });
    fetchCandit(userId).then(() => setLoading(false));
  }, [disabled]);

  const fetchCandit = async (userId) => {
    const candidatoResponse = fetch(
      `${config.HOSTNAME}/api/candidato/${userId}`
    );
    const provinciasResponse = fetch(`${config.HOSTNAME}/api/provincias`);
    const tiposEmpleosResponse = fetch(`${config.HOSTNAME}/api/tiposEmpleo`);
    const puestoTrabajoResponse = fetch(
      `${config.HOSTNAME}/api/puestosTrabajo`
    );

    // const candidatoInfo = await candidatoResponse.json();
    // console.log({ candidatoInfo });

    const promises = [
      candidatoResponse,
      provinciasResponse,
      tiposEmpleosResponse,
      puestoTrabajoResponse,
    ];

    const responseList = await Promise.all(promises);

    const keys = Object.keys(infoBase);
    const auxInfoBase = { ...infoBase };
    for (let index = 0; index < responseList.length; index++) {
      const response = responseList[index];
      const data = await response.json();
      auxInfoBase[keys[index]] = data.data;
    }
    console.log(auxInfoBase);
    setInformacion(auxInfoBase);

    // TODO: comprobar q' los values != null (GESTIONAR)
    // if (
    //   [
    //     auxInfoBase.candidato,
    //     auxInfoBase.provincia,
    //     auxInfoBase.puestoTrabajos,
    //     auxInfoBase.puestoTrabajos,
    //   ].includes(null)
    // ) {
    //   // TODO: hacer algo
    // }
    setLoading(false);
  };

  if (loading) {
    return <>Cargando</>; //TODO: echarle un ojo
  }

  const onSave = async () => {
    console.log(">>> SALVANDO!!!!");

    //TODO: validar data.
    const nombre = document.getElementById("nombre").value;
    const primerApellido = document.getElementById("primer-apellido").value;
    const provincia = document.getElementById("provincia").value;

    const data = {
      nombre: nombre,
      primer_apellido: primerApellido,
      segundo_apellido: "",
      puesto_trab: "",
      telefono: "",
      experiencia: "",
      cv: "",
      carta_presen: "",
      tipo_emp: "",
      provincia: Number(provincia),
    };

    // console.log({ data });
    // return;
    const tokenOBJ = localStorage.token;
    const userId = store.userId;
    const tokenData = JSON.parse(tokenOBJ);
    const editarCanditatoResponse = await fetch(
      `${config.HOSTNAME}/api/candidato/${userId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${tokenData.token}`,
        },
        body: JSON.stringify(data),
      }
    );

    //TODO
    // if (editarCanditatoResponse.status === 401) {
    //  // ===> eliminar info del usuario del localStorage
    //   alert("Token no valido");
    //   navigate("/");
    //   return;
    // }

    const nuevaCandidatoInfo = await editarCanditatoResponse.json();
    //TODO: validar datos

    const auxInformacion = JSON.parse(JSON.stringify(informacion));
    auxInformacion.candidato = nuevaCandidatoInfo;
    setInformacion(auxInformacion);
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
                defaultValue={informacion.candidato.nombre}
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
                value={informacion.candidato.primer_apellido}
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
                id="provincia"
              >
                <option defaultValue>Selecciona una provincia</option>

                {informacion.provincias.map((p) => (
                  <option
                    selected={informacion.candidato.provincia_id == p.id}
                    key={p.id}
                    value={p.id}
                  >
                    {p.Nprovincia}
                  </option>
                ))}
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
                disabled
                defaultValue={informacion.candidato.email}
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
          <button
            type="submit"
            className="btn btn-primary mt-3 col-5"
            onClick={onSave}
          >
            GUARDAR
          </button>
        </div>
      </form>
    </div>
  );
};
