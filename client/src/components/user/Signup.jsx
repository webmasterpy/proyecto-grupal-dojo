import { Button, Form } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const Signup = () => {
	const API_URL = "http://localhost:8000";
	const [ email, setEmail ] = useState("")
	const [ password, setPassword ] = useState("");
	const [ isEmailValid, setIsEmailValid] = useState("");
	const [ isPasswordValid, setIsPasswordValid ] = useState("");

	// ! Handle Submit
	const handleSubmit = (e) => {
		e.preventDefault();
		// Refrescamos los formularios
		setIsEmailValid("");
		setIsPasswordValid("");

		axios.post(
			API_URL + "/api/signup", 
			{email, password}, {withCredentials: true})
			.then(result => console.log(result))
			.catch(({response}) => {
				setIsEmailValid(response.data["email"]);
				setIsPasswordValid(response.data["password"]);
			})
	}

	return (
		<>
			<h1>Signup</h1>
			<Form onSubmit={handleSubmit} >
				<Form.Group className="mb-3" controlId="email">
					<Form.Label>Email</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Email"
						onChange={e => setEmail(e.target.value)} />
					{
						isEmailValid !== "" ? 
							<Form.Text color="red">{ isEmailValid }</Form.Text> :
							null
					}
				</Form.Group>

				<Form.Group className="mb-3" controlId="password">
					<Form.Label>Password</Form.Label>
					<Form.Control
						type="password"
						placeholder="Password"
						onChange={e => setPassword(e.target.value)} />
					{
						isPasswordValid !== "" ? 
							<Form.Text color="red">{ isPasswordValid }</Form.Text> :
							null
					}
				</Form.Group>

				<Button type="submit" >Signup</Button>
			</Form>
		</>
	);
}
export default Signup;