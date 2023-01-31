import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { onPrivate } from "../../private";
import config from "../../config";
import { Context } from "../../store/appContext";

export const Candidato = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [loading, setLoading] = useState(true);
  const [candidato, setCandidato] = useState({});
  const { theid } = useParams();

  useEffect(() => {
    // onPrivate(setDisabled, navigate, { namePage: "candidato" });
    // const userId = store.userId;
    fetchCandit();
  }, [disabled]);

  const fetchCandit = async () => {
    console.log(">>> LISTADO");

    console.log({ theid });
    const candidatoResponse = await fetch(
      `${config.HOSTNAME}/api/candidato/${theid}`
    );
    // validar statusCode

    const data = await candidatoResponse.json();
    console.log({ data });
    setCandidato(data.data);
    setLoading(false);
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
        Perfil Candidato
      </h1>
      <form>
        <div id="avatar" className="d-flex justify-content-center">
          <img
            src={candidato.avatar}
            className="img-fluid"
            style={{ width: "16rem" }}
          />
        </div>
        <div className="d-flex justify-content-center mt-4">
          <button
            onClick={(e) => {
              e.preventDefault();
              actions.addToLike(candidato);
            }}
            type="submit"
            className="btn btn-primary m-2"
          >
            <i className="fas fa-thumbs-up"></i> Me gusta
          </button>
          {/* Button trigger modal */}
          <button
            type="button"
            className="btn btn-primary m-2"
            data-bs-toggle="modal"
            data-bs-target="#modalContacto"
          >
            <i className="fas fa-comments"></i> Contactar
          </button>
          {/* Modal */}
          <div
            className="modal fade"
            id="modalContacto"
            tabIndex="-1"
            aria-labelledby="modalContactoLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <span className="modal-title fs-5" id="modalContactoLabel">
                    Contacta con el candidato
                  </span>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  <label htmlFor="asunto" className="form-label">
                    Asunto*
                  </label>
                  <input type="text" className="form-control" id="asunto" />
                </div>
                <div className="modal-body">
                  <label htmlFor="mensaje" className="form-label">
                    Mensaje*
                  </label>
                  <textarea
                    className="form-control"
                    type="text-area"
                    style={{ height: "10rem" }}
                    id="mensaje"
                  />
                </div>
                <div className="modal-footer">
                  <button
                    type="button"
                    className="btn btn-primary col-12 m-auto"
                  >
                    Enviar mensaje
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="row justify-content-center m-3 fw-bold">
          <div className="col-md-4">
            <div className="mt-3">
              <label htmlFor="nombre-apellidos" className="form-label">
                Nombre y apellidos
              </label>
              <input
                type="text"
                style={{ height: "2rem" }}
                className="form-control"
                id="nombre-apellidos"
                defaultValue={`${candidato.nombre} ${candidato.primer_apellido}`}
                disabled
              />
            </div>
            <div className="mt-3">
              <label htmlFor="provincia" className="form-label">
                Provincia
              </label>
              <input
                type="text"
                className="form-control"
                id="provincia"
                style={{ height: "2rem" }}
                defaultValue={candidato.provincia}
                disabled
              />
            </div>
            <div className="mt-3">
              <label htmlFor="puestotrabajo" className="form-label">
                Puesto de trabajo
              </label>
              <input
                type="text"
                className="form-control"
                id="puestotrabajo"
                style={{ height: "2rem" }}
              />
            </div>
          </div>
          <div className="col-md-4">
            <div className="mt-3">
              <label htmlFor="tipo-trabajo" className="form-label">
                Tipo de trabajo
              </label>
              <input
                type="text"
                className="form-control"
                id="tipo-trabajo"
                style={{ height: "2rem" }}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="telefono" className="form-label">
                Télefono
              </label>
              <input
                type="text"
                className="form-control"
                id="telefono"
                style={{ height: "2rem" }}
              />
            </div>
            <div className="mt-3">
              <label htmlFor="experiencia" className="form-label">
                Experiencia
              </label>
              <input
                type="text"
                className="form-control"
                id="experiencia"
                style={{ height: "2rem" }}
              />
            </div>
          </div>
          <div className="form-floating col-md-8 mt-3 text-center">
            <label htmlFor="carta-presentacion"></label>
            Carta de presentación
            <input
              className="form-control"
              style={{ height: "15rem" }}
              id="carta-presentacion"
            ></input>
          </div>
        </div>
      </form>
      <div className="d-flex justify-content-center mb-5">
        <button type="submit" className="btn btn-primary col-5">
          DESCARGAR C.V
        </button>
      </div>
    </div>
  );
};

// import React, { useContext } from "react";
// import { Context } from "../../store/appContext";
// // import "../pages/Candidatos/Candidato.css";

// // div.row me define la etiqueta mas la clase
// // div*3 me define 3 div uno bajo el otro
// // div.col-12 me define un define una columna con 12

// export const Candidato = () => {
//   return (
//     <div className="container-fluid">
//       <div className="filaPrincipal row">
//         <div className="letraPerfilPrincipal col-12">
//           <h3 className="tituloPerfilPrincipal">Perfil candidato</h3>
//         </div>
//       </div>
//       <div className="filaAvatar row">
//         <div className="col-4 iconoMeGusta">
//           <p>Likes</p>
//         </div>
//         <div className="col-4 avatar">
//           <p>Foto</p>
//         </div>
//         <div className="col-4 iconoContactar">
//           <p>Contactar</p>
//         </div>
//       </div>
//       <div className="informacionCandidato row">
//         <div className="nombreCandidato col-12"></div>
//         <div className="textoInfoCandidato row">
//           <div className="localidad col-6">
//             <p className="datos textoLocalidad">Localidad</p>
//           </div>
//           <div className="profesion col-6">
//             <p className="datos textoProfesion">Profesión</p>
//           </div>
//         </div>
//         <div className="textoInfoCandidato row">
//           <div className="provincia col-6">
//             <p className="datos textoProvincia">Provincia</p>
//           </div>
//           <div className="experiencia col-6">
//             <p className="datos textoExperiencia">Experiencia</p>
//           </div>
//         </div>
//         <div className="textoInfoCandidato row">
//           <div className="telefono col-6">
//             <p className="datos textoTelefono">Telefono</p>
//           </div>
//           <div className="tipoTrabajo col-6">
//             <p className="datos textoTipoTrabajo">Tipo Trabajo</p>
//           </div>
//         </div>
//       </div>
//       <div className="filaPresentacion row">
//         <div className="informacionPresentacion col-12">
//           <h3 className="tituloPresentacion">Carta de Presentacion</h3>
//           <p className="textoPresentacion">
//             Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
//             nesciunt laborum dolore veritatis, saepe id dolor architecto nulla
//             sequi iusto a ipsa ratione aperiam totam eius earum quas? Quisquam,
//             aliquid?
//           </p>
//         </div>
//       </div>
//       <div className="filaBotonDescargar row">
//         <div className="cajaBoton col-12">
//           <button className="botonDescargarCv">Descargar CV</button>
//         </div>
//       </div>
//     </div>
//   );
// };
