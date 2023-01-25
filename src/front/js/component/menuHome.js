import React, { useContext } from "react";
// import { Context } from "../store/appContext";
import config from "../config";
import { useNavigate } from "react-router-dom";

export const MenuHome = () => {
  // const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const onRegistro = async () => {
    const email = document.getElementById("email-registro").value;
    const passwordNew = document.getElementById("password-registro").value;
    const passwordRepeat = document.getElementById("password-repite").value;

    if ((email == 0) & (passwordNew == 0) & (passwordRepeat == 0)) {
      alert("Por favor, rellena los campos");
      return;
    }

    if (email.length == 0) {
      alert("Por favor, introduce un correo");
      return;
    }

    if ((passwordNew == 0) & (passwordRepeat == 0)) {
      alert("Por favor, crea una contraseña");
      return;
    }

    const body = JSON.stringify({
      email,
      passwordNew,
      passwordRepeat,
    });

    const res = await fetch(`${config.HOSTNAME}/api/signup`, {
      method: "POST",
      body: body,
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await res.json();
    if (res.status != 201) {
      alert(data.msg);
      return;
    } else {
      alert("Cuenta creada! Puedes aceder a tu cuenta");
    }
    const btnCerrar = document.getElementById("cerrar-modal-registro");
    btnCerrar.click();
  };

  const onAcceso = async () => {
    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;

    if ((email == 0) & (password == 0)) {
      alert("Por favor, introduce tu correo y contraseña");
      return;
    }

    if (email.length === 0) {
      alert("Por favor, introduce tu correo");
      return;
    }

    if (password.length === 0) {
      alert("Por favor, introduce tu contraseña");
      return;
    }

    const body = JSON.stringify({ email, password });

    const res = await fetch(`${config.HOSTNAME}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await res.json();
    if (res.status == 200) {
      const token = data.data.token;
      localStorage.token = JSON.stringify({ token });
      const rol = data.data.rol;
      localStorage.setItem("rol", rol);
      // actions.setRol(rol);
      const btnCerrar = document.getElementById("cerrar-modal-acceso");
      btnCerrar.click();
      navigate("/canditprofile"); //TODO: Echarle un ojo
    } else {
      alert(data.msg);
    }
  };

  return (
    <div className="ml-auto d-flex">
      {/* <!-- Button trigger modal CREAR CUENTA--> */}
      <button
        type="button"
        className="btn btn-primary me-2"
        data-bs-toggle="modal"
        data-bs-target="#ModalRegistro"
      >
        Crear Cuenta
      </button>
      {/* <!-- Modal CREAR CUENTA --> */}
      <div
        className="modal fade"
        id="ModalRegistro"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <span className="modal-title fs-5" id="exampleModalLabel">
                Registrate
              </span>
              <button
                type="button"
                id="cerrar-modal-registro"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <label htmlFor="email-registro" className="form-label">
                Email*
              </label>
              <input
                type="email"
                className="form-control"
                id="email-registro"
                placeholder="Tu mejor correo"
              />
            </div>
            <div className="modal-body">
              <label htmlFor="password-registro" className="form-label">
                Contraseña*
              </label>
              <input
                type="password"
                className="form-control"
                id="password-registro"
                placeholder="Escribe una contraseña"
              />
            </div>
            <div className="modal-body">
              <label htmlFor="password-repite" className="form-label">
                Repite Contraseña*
              </label>
              <input
                type="password"
                className="form-control"
                id="password-repite"
                placeholder="Repite la contraseña"
              />
            </div>
            <div className="modal-body">
              <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="CheckEmpresa"
              />
              <label className="form-check-label mx-2" htmlFor="CheckEmpresa">
                Soy Empresa
              </label>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary col-12 m-auto"
                onClick={onRegistro}
              >
                CREAR CUENTA
              </button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button
          type="button"
          className="btn btn-outline-secondary"
          data-bs-toggle="modal"
          data-bs-target="#ModalAcceso"
        >
          Acceso
        </button>
        {/* <!-- Modal ACCESO --> */}
        <div
          className="modal fade"
          id="ModalAcceso"
          tabIndex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <span className="modal-title fs-5" id="exampleModalLabel">
                  Accede a tu cuenta
                </span>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  id="cerrar-modal-acceso"
                  aria-label="Close"
                ></button>
              </div>
              <div className="modal-body">
                <label htmlFor="email-login" className="form-label">
                  Email*
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email-login"
                  placeholder="Tu correo electronico"
                />
              </div>
              <div className="modal-body">
                <label htmlFor="password-login" className="form-label">
                  Contraseña*
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password-login"
                  placeholder="Tu contraseña"
                />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-primary col-12 m-auto"
                  onClick={onAcceso}
                >
                  ENTRAR
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
