import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
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

    setLoading(false);
  };

  const onSave = async () => {
    console.log(">>> SALVANDO!!!!");

    //TODO: validar data.
    const nombre = document.getElementById("nombre").value;
    const primerApellido = document.getElementById("primer-apellido").value;
    const segundoApellido = document.getElementById("segundo-apellido").value;
    const puestoTrab = document.getElementById("puestoTrabajo").value;
    const telefono = document.getElementById("telefono").value;
    const experiencia = document.getElementById("experiencia").value;
    const cv = document.getElementById("cv").value;
    const cartaPresen = document.getElementById("carta-presentacion").value;
    const tipoEmpleo = document.getElementById("tipoEmpleo").value;
    const provincia = document.getElementById("provincia").value;

    const avatar = document.getElementById("subirAvatar").files[0];
    console.log({ avatar });

    const body = new FormData();
    body.append("avatar", avatar);
    body.append("nombre", nombre);
    body.append("primer_apellido", primerApellido);
    body.append("segundo_apellido", segundoApellido);
    body.append("puesto_trab", Number(puestoTrab));
    body.append("telefono", telefono);
    body.append("experiencia", experiencia);
    body.append("cv", cv);
    body.append("carta_presen", cartaPresen);
    body.append("tipo_emp", Number(tipoEmpleo));
    body.append("provincia", Number(provincia));

    const tokenOBJ = localStorage.token;
    const userId = store.userId;
    const tokenData = JSON.parse(tokenOBJ);
    const editarCanditatoResponse = await fetch(
      `${config.HOSTNAME}/api/edit_candidato/${userId}`,
      {
        method: "PUT",
        // headers: {
        //   // "Content-Type": "application/x-www-form-urlencoded",
        //   Authorization: `Bearer ${tokenData.token}`,
        // },
        // body: JSON.stringify(data),
        body: body,
      }
    );

    window.location.reload();

    //TODO
    // if (editarCanditatoResponse.status === 401) {
    //  // ===> eliminar info del usuario del localStorage
    //   alert("Token no valido");
    //   navigate("/");
    //   return;
    // }

    // const nuevaCandidatoInfo = await editarCanditatoResponse.json();
    // //TODO: validar datos

    // const auxInformacion = JSON.parse(JSON.stringify(informacion));
    // auxInformacion.candidato = nuevaCandidatoInfo;
    // setInformacion(auxInformacion);
  };

  const loadAvatar = () => {
    const subirAvatar = document.getElementById("subirAvatar").files[0];
    const blob = new Blob([subirAvatar], { type: subirAvatar.type });
    const urlAvatar = URL.createObjectURL(blob);
    console.log({ urlAvatar });
    const imageElement = document.getElementById("avatar");
    imageElement.src = urlAvatar;
  };

  const openFileWindow = () => {
    const inputFile = document.getElementById("subirAvatar");
    inputFile.click();
  };

  const setVisible = () => {
    const esVisible = document.getElementById("habilitar-deshabilitar").checked;
    console.log(">>> AQUIII: ", esVisible);

    fetch(`${config.HOSTNAME}/api/edit_visible_candidato/${store.userId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        es_visible: esVisible,
      }),
    })
      .then((res) => res.json())
      .then((data) => console.log({ data }));
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
        Mi perfil
      </h1>
      <form>
        <div className="d-flex justify-content-center">
          <input
            id="subirAvatar"
            type="file"
            onChange={loadAvatar}
            hidden
          ></input>
          <img
            id="avatar"
            src={informacion.candidato.avatar}
            className="img-fluid"
            style={{ width: "16rem" }}
          />
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-primary m-1 p-1"
            onClick={openFileWindow}
          >
            Cambiar foto
          </button>
        </div>
        <div className="form-check form-switch d-flex justify-content-center m-1">
          <input
            className="form-check-input"
            type="checkbox"
            role="switch"
            id="habilitar-deshabilitar"
            onChange={setVisible}
            defaultChecked={informacion.candidato.es_visible}
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
                defaultValue={informacion.candidato.primer_apellido}
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
                defaultValue={informacion.candidato.segundo_apellido}
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
                aria-label="tipoEmpleo"
                required
                id="tipoEmpleos"
              >
                <option defaultValue>Selecciona un tipo de trabajo</option>

                {informacion.tipoEmpleos.map((pt) => (
                  <option
                    selected={informacion.candidato.tipo_emp_id == pt.id}
                    key={pt.id}
                    value={pt.id}
                  >
                    {pt.Nempleo}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* Columna derecha */}
          <div className="col-md-4">
            <div className="mt-3">
              Puesto de trabajo*
              <select
                className="form-select mt-2"
                aria-label="puestoTrabajo"
                required
                id="puestoTrabajo"
              >
                <option defaultValue>Selecciona un puesto de trabajo</option>

                {informacion.puestoTrabajos.map((t) => (
                  <option
                    selected={informacion.candidato.puestos_id == t.id}
                    key={t.id}
                    value={t.id}
                  >
                    {t.Ntrabajo}
                  </option>
                ))}
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
                defaultValue={informacion.candidato.telefono}
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
                defaultValue={informacion.candidato.experiencia}
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
              <input type="file" className="form-control" id="cv" />
            </div>
          </div>
          <div className="form-floating col-md-8 mt-3">
            <label htmlFor="carta-presentacion"></label>
            Carta de presentación*
            <textarea
              required
              className="form-control"
              type="text-area"
              // style={{ height: "10rem" }}
              id="carta-presentacion"
              defaultValue={informacion.candidato.carta_presen}
            ></textarea>
          </div>
          <button
            type="button"
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
