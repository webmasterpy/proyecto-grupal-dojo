import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from 'axios'

const EncuestaListado = () => {
    const [question, setQuestion] = useState([])
    let numeracion=1;

    useEffect(() => {
        axios.get('http://localhost:8000/api/polls')
            .then(res => {
                console.log(res.data);
                setQuestion(res.data);
            })
            .catch(err => console.log(err))
    }, [])

    const onHandleDelete = (id) => {
        console.log(id)
        axios.delete(`http://localhost:8000/api/poll/delete/${id}`)
            .then(res => console.log(res))
            .catch(err => console.log(err))
            setQuestion(question.filter(question => question._id !== id));
    }

    return (
    <>
        <h3 className="text-center">
            Listado de Encuestas<br/>
            {/* <Link to="/admin/banner/nuevo">
                <button className="btn btn-primary">Nuevo</button>
            </Link> */}
        </h3>
        <table className="table table-light table-hover">
            <thead>
                <tr>
                <th scope="col">#</th>
                <th scope="col">Question</th>
                <th scope="col">Accion</th>
                </tr>
            </thead>
            <tbody>
            {
                question.map((question, indice)=>{
                    
                    return (
                        <tr key={indice}>
                            <th scope="row">{numeracion++}</th>
                            <td>{question.question}</td>
                            <td>
                                <a href={"/admin/encuesta/editar/"+question._id}>
                                    <button className="btn btn-sm btn-success">Editar</button>{" "}
                                </a>
                                <button className="btn btn-sm btn-danger" onClick={()=>{window.confirm("Esta seguro que desea borrar este registro?") && onHandleDelete(question._id)}}>Borrar</button>                                
                            </td>
                        </tr>
                    )
                })
            }
            </tbody>
        </table>
    </>
    )
}

export default EncuestaListado