import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams} from "react-router-dom";
import axios from 'axios';

const EncuestaEditar = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [campos, setCampos] = useState(
        {
            question: ""
        }
    )
    const [errores, setErrores] = useState({})

    useEffect(() => detalleEncuesta(), [])
    
    const detalleEncuesta = () => {
        axios.get('http://localhost:8000/api/poll/'+id )
            .then(res => {
                console.log(res.data);
                setCampos(res.data)
            })
            .catch(err => console.log(err))
    }

    const onHandleChange = (e) => {
        setCampos(cargaEstados => ({ ...cargaEstados, [e.target.name]: e.target.value }))
    }

    const onSubmitHandler = (e) => {
        e.preventDefault()
        axios.patch('http://localhost:8000/api/poll/edit/'+id , campos)
            .then(res => {
                console.log("Datos actualizados:",res)
                navigate("/admin/encuesta")
            })
            .catch(err => {
                setErrores(err.response.data.errors)
            })
    }

    return (
        <>
        <h3 className="text-center mt-5">Actualizar Encuesta</h3>
        <form onSubmit={onSubmitHandler} className="formulario">
            <div className="row">
                <div className="padding-20 col-lg-12 mt-4">
                    <div className="form-group">
                        <label htmlFor="question"><b>Titulo Encuesta</b></label>
                        <input type="text" className="form-control" id="question" name="question" onChange={onHandleChange} value={campos.question} required/>
                        {(campos.question.length < 3 && campos.question !== "") ? <p className="alert alert-danger">Titulo debe tener almenos 3 caracteres</p> : ""}
                    </div>
                </div>

                <div className="padding-20 col-lg-12 mt-0">
                <hr/>
                    <div className="form-group mt-0 text-center">
                        <input type="submit" value="Actualizar" className="btn btn-primary" />{" "}
                        <Link to={"/admin"}><button className="btn btn-info">Volver</button></Link>
                    </div>
                </div>
            </div>
        </form>
    </>
    )
}

export default EncuestaEditar