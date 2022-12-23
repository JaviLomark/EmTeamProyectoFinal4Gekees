import React from "react";
import { Link, useNavigate } from "react-router-dom";

const HOSTNAME =
  "https://3001-4geeksacade-reactflaskh-oxcbm6rsuhk.ws-eu80.gitpod.io";

export const Navbar = () => {
  const navigate = useNavigate();

  const onRegistro = async () => {
    const email = document.getElementById("email-registro").value;
    const passwordNew = document.getElementById("password-registro").value;
    const passwordRepeat = document.getElementById("password-repite").value;

    // console.log({
    //   email,
    //   password,
    //   passwordRepeat,
    // });

    if (passwordNew.length < 6) {
      alert(
        "Formato de contraseña incorrecto, la contraseña debe tener 6 caracteres como mínimo"
      );
      return;
    }
    if (passwordNew !== passwordRepeat) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const body = JSON.stringify({
      email,
      passwordNew,
      passwordRepeat,
    });

    const res = await fetch(`${HOSTNAME}/api/signup`, {
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
    }

    // Cerrar el modal
    const btnCerrar = document.getElementById("cerrar-modal-registro");
    btnCerrar.click();

    // navigate("/candidato");
  };

  const onAcceso = async () => {
    const email = document.getElementById("email-login").value;
    const password = document.getElementById("password-login").value;

    const body = JSON.stringify({ email, password });
    const res = await fetch(`${HOSTNAME}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body,
    });

    const data = await res.json();
    if (res.status == 200) {
      const token = data.data;
      localStorage.token = JSON.stringify({ token });
    }
  };

  return (
    <nav className="navbar navbar-expand-lg bg-light">
      <div className="container-fluid">
        <Link to="/">
          <span className="navbar-brand h1">EmTalen</span>
        </Link>
        <div className="ml-auto d-flex">
          {/* <!-- Button trigger modal CREAR CUENTA--> */}
          <button
            type="button"
            className="btn btn-outline-primary me-2"
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
                  <label
                    className="form-check-label mx-2"
                    htmlFor="CheckEmpresa"
                  >
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
      </div>
    </nav>
  );
};