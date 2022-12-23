import React, { useContext } from "react";
import { Context } from "../store/appContext";
import imagen from "../../img/imagen-home.webp";
import "../../styles/home.css";

export const Home = () => {
  const { store, actions } = useContext(Context);

  return (
    <div className="text-center">
      <img className="imagen-home" src={imagen} />
    </div>
  );
};
