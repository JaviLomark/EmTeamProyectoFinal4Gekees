import React, { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { onPrivate } from "../../private";
import { Context } from "../../store/appContext";
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

const infoBase = {
  empresa: null,
  provincias: null,
  tipoEmpleos: null,
  sectores: null,
};

export const FormularioEmp = () => {

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
    fetchEmp(userId).then(() => setLoading(false));
  }, [disabled]);

  const fetchEmp = async (userId) => {
    const empresaResponse = fetch(
      `${config.HOSTNAME}/api/empresa/${userId}`
    );
    const provinciasResponse = fetch(`${config.HOSTNAME}/api/provincias`);
    const tiposEmpleosResponse = fetch(`${config.HOSTNAME}/api/tiposEmpleo`);
    const sectorResponse = fetch(
      `${config.HOSTNAME}/api/sector`
    );
    const promises = [
      empresaResponse,
      provinciasResponse,
      tiposEmpleosResponse,
      sectorResponse,
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
    const nombreEmp = document.getElementById("nombre-empresa").value;
    const ubicacion = document.getElementById("ubicacion").value;
    const identificacionFiscal = document.getElementById("identificacion-fiscal").value;
    const sede = document.getElementById("sede").value;
    const tipoTrabajo = document.getElementById("tipo-trabajo").value;
    const sector = document.getElementById("sector").value;
    const telefono = document.getElementById("telefono").value;
    const numeroTrabajadores = document.getElementById("numeroTrabajadores").value;
    const descripcion = document.getElementById("descripcion").value;

    const avatar = document.getElementById("subirAvatar").files[0];
    console.log({ avatar });

    const body = new FormData();
    body.append("avatar", avatar);
    body.append("nombre_emp", nombreEmp);
    body.append("ubicacion", ubicacion);
    body.append("tipo_trab", Number(tipoTrabajo));
    body.append("telefono", telefono);
    body.append("numero_trab", numeroTrabajadores);
    body.append("sede", sede);
    body.append("sector", Number(sector));
    body.append("identificacion_fiscal", identificacionFiscal);
    body.append("descripcion", descripcion);

    const tokenOBJ = localStorage.token;
    const userId = store.userId;
    const tokenData = JSON.parse(tokenOBJ);
    const editarEmpresaResponse = await fetch(
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
