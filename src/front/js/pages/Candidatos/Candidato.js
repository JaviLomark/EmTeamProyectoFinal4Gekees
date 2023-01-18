import React, { useContext } from "react";
import { Context } from "../../store/appContext";
// import "../pages/Candidatos/Candidato.css";

// div.row me define la etiqueta mas la clase
// div*3 me define 3 div uno bajo el otro
// div.col-12 me define un define una columna con 12

export const Candidato = () => {
  return (
    <div className="container-fluid">
      <div className="filaPrincipal row">
        <div className="letraPerfilPrincipal col-12">
          <h3 className="tituloPerfilPrincipal">Perfil candidato</h3>
        </div>
      </div>
      <div className="filaAvatar row">
        <div className="col-4 iconoMeGusta">
          <p>Likes</p>
        </div>
        <div className="col-4 avatar">
          <p>Foto</p>
        </div>
        <div className="col-4 iconoContactar">
          <p>Contactar</p>
        </div>
      </div>
      <div className="informacionCandidato row">
        <div className="nombreCandidato col-12"></div>
        <div className="textoInfoCandidato row">
          <div className="localidad col-6">
            <p className="datos textoLocalidad">Localidad</p>
          </div>
          <div className="profesion col-6">
            <p className="datos textoProfesion">Profesión</p>
          </div>
        </div>
        <div className="textoInfoCandidato row">
          <div className="provincia col-6">
            <p className="datos textoProvincia">Provincia</p>
          </div>
          <div className="experiencia col-6">
            <p className="datos textoExperiencia">Experiencia</p>
          </div>
        </div>
        <div className="textoInfoCandidato row">
          <div className="telefono col-6">
            <p className="datos textoTelefono">Telefono</p>
          </div>
          <div className="tipoTrabajo col-6">
            <p className="datos textoTipoTrabajo">Tipo Trabajo</p>
          </div>
        </div>
      </div>
      <div className="filaPresentacion row">
        <div className="informacionPresentacion col-12">
          <h3 className="tituloPresentacion">Carta de Presentacion</h3>
          <p className="textoPresentacion">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque
            nesciunt laborum dolore veritatis, saepe id dolor architecto nulla
            sequi iusto a ipsa ratione aperiam totam eius earum quas? Quisquam,
            aliquid?
          </p>
        </div>
      </div>
      <div className="filaBotonDescargar row">
        <div className="cajaBoton col-12">
          <button className="botonDescargarCv">Descargar CV</button>
        </div>
      </div>
    </div>
  );
};
