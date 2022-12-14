import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export const Candidato = (props) => {
    const params = useParams();
    const [detalle, modificarDetalle] = useState({});
    const [cargando, modificarCargando] = useState(true);

    useEffect(async () => {
        const res = await fetch(`https://3000-javilomark-emteamproyec-79yjx95hupo.ws-eu81.gitpod.io//candidatos//${params.uid}`);
        const data = await res.json();
        console.log({ detalle: data });
        modificarDetalle(data.result);
        modificarCargando(false);
    })

    if (cargando) {
        return <div className="d-flex justify-content-center">
            <div className="spinner-grow text-warning" role="status">
            </div>
        </div>
    }

    return (
        <div>
            <div className="card mb-3">
                <div className="row g-0">
                    <div className="col-md-4">
                        <img src={avatar} className="img-fluid rounded-start" />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h2 className="card-title">{detalle.properties.nombre}</h2>
                            <h2 className="card-title">{detalle.properties.primer_apellido}</h2>
                            <h2 className="card-title">{detalle.properties.segundo_apellido}</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="container text-center">
                <div className="row">
                    <div className="col"><h5></h5> {detalle.properties.height}</div>
                    <div className="vr"></div>
                    <div className="col"><h5>Peso:</h5> {detalle.properties.mass}</div>
                    <div className="vr"></div>
                    <div className="col"><h5>Color de Pelo:</h5> {detalle.properties.hair_color}</div>
                    <div className="vr"></div>
                    <div className="col"><h5>Color de piel:</h5> {detalle.properties.skin_color}</div>
                    <div className="vr"></div>
                    <div className="col"><h5>Año de Nacimiento:</h5> {detalle.properties.birth_year}</div>
                    <div className="vr"></div>
                    <div className="col"><h5>Genero:</h5> {detalle.properties.gender}</div>
                </div>
            </div>
        </div>
    )
}