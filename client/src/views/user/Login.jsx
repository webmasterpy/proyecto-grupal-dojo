import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form } from "react-bootstrap";
import BasicForm from '../../components/user/BasicForm';
import { useState } from "react";
import axios from "axios";
import ValidForm from '../../components/user/ValidForm';
import { useNavigate } from "react-router-dom";


const Login = () => {
	const API_URL = "http://localhost:8000";
	const [ email, setEmail ] = useState("")
	const [ password, setPassword ] = useState("");
	const [ isEmailValid, setIsEmailValid] = useState("");
	const [ isPasswordValid, setIsPasswordValid ] = useState("");
	const navigate = useNavigate();

	// ! Handle Submit
	const handleSubmit = (e) => {
		e.preventDefault();

		// Refrescamos los errores
		setIsEmailValid("");
		setIsPasswordValid("");

		// Envio del formulario
		axios.post(
			API_URL + "/api/login",
			{email, password},
			{withCredentials: true})
			.then(({ data }) => {
				// Si los datos son correctos
				axios.get(
					API_URL + "/api/authUser", 
					{withCredentials: true})
					// Guardamos en el localStorage los datos del usuario
					.then(({ data }) => {
						window.localStorage.setItem("userId", JSON.stringify(data.user));
						navigate("/home")
					})
					.catch((err) => {
						console.log(err);
					})
			})
			.catch(({ response }) => {
				setIsEmailValid(response.data.email);
				setIsPasswordValid(response.data.password);
			});
	}

	return (
		<>
		<div className="">
			<h2 className="titulo-form">Login</h2>
			<Form onSubmit={handleSubmit} >
				<BasicForm
					label="Email"
					type="text"
					placeholder="Email"
					onChange={({ target }) => setEmail(target.value)} />

				<BasicForm
					label="Password"
					type="password"
					placeholder="Password" 
					onChange={({ target }) => setPassword(target.value)}/>

				<ValidForm isFormValid={isEmailValid} />
				<ValidForm isFormValid={isPasswordValid} />
				
				<Button type="submit" >Login</Button>
			</Form>
			</div>
		</>
	);
}
export default Login;
