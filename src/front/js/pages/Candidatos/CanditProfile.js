import propTypes from 'prop-types';
import React, { useState, Component } from 'react';
import './CanditProfile.css';

export const FormularioCandit = () => {

    return (
        <div className='container-fluid'>
            <h1 className='MiPerfil'>Mi perfil</h1>
            <form>

                <div id="avatar">
                    <img src="https://img.freepik.com/vector-premium/icono-circulo-usuario-anonimo-ilustracion-vector-estilo-plano-sombra_520826-1931.jpg?w=740" />
                </div>

                <div className='wrap-toggle'>
                    <label htmlFor="toggle" className="switch"></label>
                    <input type="checkbox" id="toggle" className="offscreen" />
                </div>
                <div class="col">
                    <div className="row inputs">
                        <label htmlFor="nombre" className="form-label">Nombre</label>
                        <input type="text" className="form-control" id="nombre" />
                    </div>

                    <div id="row apellido1">
                        <label htmlFor="Primer-apellido" className="form-label">Primer apellido</label>
                        <input type="text" className="form-control" id="apellido1" />
                    </div>
                </div>
                <div>
                    <label htmlFor="Segundo-apellido" className="form-label">Segundo apellido</label>
                    <input type="text" className="form-control" />
                </div>

                <div>
                    <label htmlFor="Puesto-de-trabajo" className="form-label">Puesto de trabajo</label>
                    <input type="text" className="form-control" id="ptrabajo" />
                </div>

                <div>
                    <label htmlFor="provincia" className="form-label">Provincia</label>
                    <select type="text" className="form-control" id="provincia"></select>
                </div>

                <div>
                    <label htmlFor="tipodetrabajo" className="form-label">Tipo de trabajo</label>
                    <input type="text" className="form-control" id="tiptrabajo" />
                </div>

                <div>
                    <label htmlFor="telefono" className="form-label">Télefono</label>
                    <input type="text" className="form-control" id="telefono" />
                </div>

                <div>
                    <label htmlFor="experiencia" className="form-label">Experiencia</label>
                    <input type="text" className="form-control" id="experiencia" />
                </div>

                <div>
                    <label htmlFor="Email" className="form-label">Email</label>
                    <input type="text" className="form-control" id="Email" />
                </div>

                <div>
                    <label htmlFor="cv" className="form-label">C.V</label>
                    <input type="file" className="form-control" id="cv" />
                </div>

                <div>
                    <label htmlFor="cpresentacion" className="form-label">Carta de presentación</label>
                    <textarea type="text" className="form-control-text-area" id="cpresentacion"></textarea>
                </div>
                <div id="BtnGuardar">
                    <button type="submit" className="btn btn-primary" id="BGuardar">Guardar</button>
                </div>
            </form>
        </div>

    );
}