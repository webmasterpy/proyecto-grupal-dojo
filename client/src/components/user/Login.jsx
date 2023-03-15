import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
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
		// Refrescamos los formularios
		setIsEmailValid("");
		setIsPasswordValid("");

		axios.post(
			API_URL + "/login", 
			{email, password}, {withCredentials: true})
			.then(result => 
				axios.get(API_URL + "/authUser", {withCredentials: true})
					.then((user) => {
				console.log(user.data);
				window.localStorage.setItem("user", JSON.stringify(user.data));
				navigate("noVisit");
			}))
			.catch(({response}) => {
				setIsEmailValid(response.data["email"]);
				setIsPasswordValid(response.data["password"]);
			})
	}

	return (
		<>
			<h1>Login</h1>
			<Form onSubmit={handleSubmit} >
				<Form.Group className="mb-3" controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Email"
						onChange={e => setEmail(e.target.value)} />
					{
						isEmailValid !== "" 
							? <Form.Text color="red">{ isEmailValid }</Form.Text> 
							: null
					}
				</Form.Group>

				<Form.Group className="mb-3" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						onChange={e => setPassword(e.target.value)} />
					{
						isPasswordValid !== "" 
							? <Form.Text color="red">{ isPasswordValid }</Form.Text> 
							: null
					}
				</Form.Group>

				<Button type="submit" >Signup</Button>
			</Form>
		</>
	);
}
export default Login;
