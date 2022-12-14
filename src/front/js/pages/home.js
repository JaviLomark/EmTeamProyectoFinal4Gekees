import React from "react";
import imagen from "../../img/imagen-home.webp";
import "../../styles/home.css";

export const Home = () => {
  return (
    <div className="text-center">
      <img className="imagen-home" src={imagen} />
    </div>
  );
};
