import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Form, Col, Row } from "react-bootstrap";
import BasicForm from '../../components/user/BasicForm';
import { useState } from "react";
import axios from "axios";
import ValidForm from '../../components/user/ValidForm';


const Login = () => {
	const API_URL = "http://localhost:8000";
	const [ email, setEmail ] = useState("")
	const [ password, setPassword ] = useState("");
	const [ isEmailValid, setIsEmailValid] = useState("");
	const [ isPasswordValid, setIsPasswordValid ] = useState("");

	// ! Handle Submit
	const handleSubmit = (e) => {
		e.preventDefault();
	}

	return (
		<>
			<h1>Login</h1>
			<Form onSubmit={handleSubmit} >
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
					onChange={({ target }) => setPassword(target.value)}/>
				<ValidForm isFormValid={isPasswordValid} />

				<Button type="submit" >Login</Button>
			</Form>
		</>
	);
}
export default Login;
