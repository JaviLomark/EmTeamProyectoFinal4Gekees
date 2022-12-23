import React, { useState } from 'react';
import './CanditProfile.css';

export const FormularioCandit = () => {
    return (
        <div>
            <h1 className='MiPerfil'>Mi perfil</h1>
        <form className='container'>
            <div className="mb-3">
                <input type="image" className="form-control" id="fotoperfil" />
            </div>

            <div className='wrap-toggle'>
                <input type="checkbox" id="toggle" class="offscreen" />
                <label for="toggle" class="switch"></label>
            </div>

            <div className="mb-3 row-">
                <label for="nombre" className="form-label">Nombre</label>
                <input type="text" className="form-control" id="nombre" />
            </div>

            <div className="mb-3 row">
                <label for="Primer-apellido" className="form-label">Primer apellido</label>
                <input type="text" className="form-control" id="apellido1" />
            </div>

            <div className="mb-3 col">
                <label for="Segundo-apellido" className="form-label">Segundo apellido</label>
                <input type="text" className="form-control" id="apellido2" />
            </div>

            <div className="mb-3 col">
                <label for="Puesto-de-trabajo" className="form-label">Puesto de trabajo</label>
                <input type="text" className="form-control" id="ptrabajo" />
            </div>

            <div className="mb-3 col">
                <label for="provincia" className="form-label">Provincia</label>
                <select type="text" className="form-control" id="provincia"></select>
            </div>

            <div className="mb-3 col">
                <label for="tipodetrabajo" className="form-label">Tipo de trabajo</label>
                <input type="text" className="form-control" id="tiptrabajo" />
            </div>

            <div className="mb-3">
                <label for="telefono" className="form-label">Télefono</label>
                <input type="text" className="form-control" id="telefono" />
            </div>


            <div className="mb-3">
                <label for="experiencia" className="form-label">Experiencia</label>
                <input type="text" className="form-control" id="experiencia" />
            </div>

            <div className="mb-3">
                <label for="Email" className="form-label">Email</label>
                <input type="text" className="form-control" id="Email" />
            </div>

            <div className="mb-3">
                <label for="cv" className="form-label">C.V</label>
                <input type="file" className="form-control" id="cv" />
            </div>

            <div className="mb-3">
                <label for="cpresentacion" className="form-label">Carta de presentación</label>
                <textarea type="text" className="form-control" id="cpresentacion"></textarea>
            </div>
            <button type="submit" className="btn btn-primary">Guardar</button>
        </form>
    </div>
        
    );
}