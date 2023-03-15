const User = require("../models/user.model");
const jwt = require("jsonwebtoken");


// * TOKENS
const maxAge = 1 * 24 * 60 * 60; // Dias * horas * min * seg
const createToken = ( id ) => {
	return jwt.sign(
		{ user: id }, 
		process.env.TOKEN_KEY,
		{
			expiresIn: maxAge,
		})
}

// ! Handle Error
const handleErrors = ({errors, message, code}) => {
	const error =  {email:"", password:""};

	// Duplicated email
	if(code === 11000){
		error.email = "That email is registered";
		return error;
	}

	// Validation errors
	if(message.includes("user validation failed")){
		Object.values(errors).forEach(({properties}) => {
			error[properties.path] = properties.message;
		})
	}

	// Incorrect Email
	if (message === "Incorrect Email")
		error.email = "Email is incorrect";

	// Incorrect Password
	if(message === "Incorrect Password")
		error.password = "Password is incorrect";

	return error;
}

// * Controllers 
module.exports.signup_post = (req, res) => {
	const {email, password} = req.body;

	User.create({email, password})
		.then(user => {
			const token = createToken(user._id);

			res.cookie("New-User", token, { httpOnly: true, maxAge: maxAge * 1000 })
			res.status(201).json(user);
		})
		.catch(err => {
			const errors = handleErrors(err);			
			res.status(400).json(errors);
		});
}

module.exports.login_post = (req, res) => {
	const { email, password } = req.body;

	User.login(email, password)
		.then(user => {
			const token = createToken(user._id); // Creamos un token utilizando solo el id del usuario

			res.cookie("login", token, { httpOnly: true, maxAge: maxAge * 1000 })
			res.status(200).json({user: user._id}) //Enviamos solamente el id del usuario
		})
		.catch(err => {
			const errors = handleErrors(err);
			res.status(400).json(errors);
		})
}

module.exports.logout_get = (req, res) => {
	res.cookie("login", "", {maxAge: 1});
	res.status(200).json({ message:"User logout" });
}