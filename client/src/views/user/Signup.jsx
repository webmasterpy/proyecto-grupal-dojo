import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import BasicForm from "../../components/user/BasicForm";
import ValidForm from "../../components/user/ValidForm";


const Signup = () => {
	const API_URL = "http://localhost:8000";
	const [ user, setUser ] = useState("");
	const [ email, setEmail ] = useState("");
	const [ password, setPassword ] = useState("");
	const [	isUserValid, setIsUserValid ] = useState("");
	const [ isEmailValid, setIsEmailValid] = useState("");
	const [ isPasswordValid, setIsPasswordValid ] = useState("");

	// ! Handle Submit
	const handleSubmit = (e) => {
		e.preventDefault();

		// Refrescamos los errores
		setIsUserValid("");
		setIsEmailValid("");
		setIsPasswordValid("");

		// Envio del formulario
		axios.post(
			API_URL + "/api/signup", 
			{user, email, password},
			{withCredentials: true})
			.then(user => console.log(user))
			.catch(({response}) => {
				setIsUserValid(response.data.user);
				setIsEmailValid(response.data.email);
				setIsPasswordValid(response.data.password);
			});
	}

	return (
		<>
			<h1>Signup</h1>
			<Form onSubmit={handleSubmit} >
				<BasicForm
					label="User"
					type="text"
					placeholder="User"
					onChange={({ target }) => setUser(target.value)} />
				<ValidForm isFormValid={isUserValid} />

				<BasicForm
					label="Email"
					type="text"
					placeholder="Email"
					onChange={({ target }) => setEmail(target.value)} />
				<ValidForm isFormValid={isEmailValid} />

				<BasicForm
					label="Password"
					type="password"
					placeholder="Password"
					onChange={({ target }) => setPassword(target.value)} />
				<ValidForm isFormValid={isPasswordValid} />

				<Button type="submit" >Signup</Button>
			</Form>
		</>
	);
}
export default Signup;