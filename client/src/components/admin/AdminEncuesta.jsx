import React from "react";
import EncuestaListado from "./EncuestaListado";
import EncuestaEditar from "./EncuestaEditar";
import Navegacion from './Navegacion'

const AdminEncuesta = (props) => {
    console.log("Administracion de Encuesta {accion}:",props.accion)
    return(
        <>
        <div className="contenedor">
            <div className="barra-izquierda">
                <Navegacion/>
            </div>
            <div className="barra-derecha container mt-2">
            {(props.accion==="listado")?<EncuestaListado/>:""}
            {/* {(props.accion==="nuevo")?<BannerNuevo/>:""} */}
            {(props.accion==="editar")?<EncuestaEditar/>:""}
            </div>
        </div>
        </>
    )
}

export default AdminEncuesta