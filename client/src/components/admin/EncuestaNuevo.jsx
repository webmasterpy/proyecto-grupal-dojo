import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const BannerNuevo = () => {
    const [titulo, setTitulo] = useState('');
    const [imagen, setImagen] = useState('');
    const [activado, setActivado] = useState(true);
    

    const navigate = useNavigate();
    const [error, setError] = useState({});

    const onSubmitHandler = (e) => {
        e.preventDefault();
        console.log("Registrando nuevo banner")
        axios.post('http://localhost:8000/api/banner/nuevo', 
        {
            titulo: titulo
            , imagen: imagen
            , activado: activado
        })
            .then(res => {
                console.log("results");
                console.log(res.data);
                if (res.data.results) {
                    navigate('/admin/banner');
                } else {
                    console.log(res.data.err.errors)
                    setError(res.data.err.errors);
                }
            })
            .catch(err => console.log(err.data))
    }
    
    const navegar = (url)=>{
        navigate(url);
    }

    return (
        <>
        <h3 className="text-center mt-5">Agregar Banner</h3>
        <form onSubmit={onSubmitHandler} className="formulario">
            <div className="row">
                <div className="padding-20 col-lg-12 mt-4">
                    <div className="form-group">
                        <label htmlFor="titulo"><b>Titulo Banner</b></label>
                        <input type="text" className="form-control" id="titulo" name="titulo" onChange={(evento)=> setTitulo(evento.target.value)} required/>
                        {(titulo.length < 3 && titulo !== "") ? <p className="alert alert-danger">Titulo debe tener almenos 3 caracteres</p> : ""}
                    </div>

                    <div className="form-group mt-4">
                        <input type="file" id="avatar" name="avatar" accept="image/png, image/jpeg"/>
                        <label htmlFor="imagen"><b>Image Url</b></label>
                        <input type="text" className="form-control" id="imagen" name="imagen" onChange={(evento)=> setImagen(evento.target.value)} required/>
                        {(imagen.length < 3 && imagen !== "") ? <p className="alert alert-danger">Imagen debe tener almenos 3 caracteres <br/>{error.imagen && error.imagen.message}</p> : ""}
                    </div>

                    <div className="form-group mt-4">
                        <input className="form-check-input" name="activado" type="checkbox" onChange={(e) => setActivado(e.target.checked)} checked={activado} />
                        <label htmlFor="activado"><b>Activado?</b></label>
                        {(error.activado) ? <p className="alert alert-danger">{error.activado && error.activado.message}</p> : ""}
                    </div>
                </div>

                <div className="padding-20 col-lg-12 mt-0">
                <hr/>
                    <div className="form-group mt-0 text-center">
                        <input type="submit" value="Guardar Banner" className="btn btn-primary" />{" "}
                        <Link to={"/admin/banner"}><button className="btn btn-info">Volver</button></Link>
                    </div>
                </div>
            </div>
        </form>
    </>
    )
}

export default BannerNuevo