import React, {useState} from 'react'
import { Link } from "react-router-dom";

const Navegacion = () => {
  let activoEncuesta ="";
  let actualUrl = window.location.href;

  actualUrl = actualUrl.split("/");
  actualUrl = actualUrl[4].toString();

  console.log(actualUrl)

  switch (actualUrl) {
    case 'encuesta': activoEncuesta="activado"; break;
  }


  return (
    <div className="vertical-menu">
        <div className="menu">
            <b>Menu</b>
        </div>
        <Link to="/admin/encuesta" className={activoEncuesta}>Encuesta</Link>
        <Link to="/admin/login" >Salir</Link>
    </div>
  )
}

export default Navegacion