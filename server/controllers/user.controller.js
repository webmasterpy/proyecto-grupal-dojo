const User = require("../models/user.model");
const jwt = require("jsonwebtoken");


// * TOKENS
const maxAge = 1 * 24 * 60 * 60; // Dias * horas * min * seg
const createToken = ( id ) => {
	return jwt.sign(
		{ user: id }, 
		"clave-secreta-token",
		{
			expiresIn: maxAge,
		})
}

// ! Handle Error
const handleErrors = ({errors, message, code, keyPattern}) => {
	const error =  {user:"", email:"", password:""};

	// Duplicated
	if(code === 11000){
		// If user is duplicated
		keyPattern.user 
			? error.user = "That user is registered"
			: error.email = "That email is registered"; 
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
	const {user, email, password} = req.body;

	User.create({user, email, password})
		.then(user => {
			res.status(201).json({user: user.user});
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

			res.cookie("userToken", token, { httpOnly: true, maxAge: maxAge * 1000 })
			res.status(200).json({user: user._id}) //Enviamos solamente el id del usuario
		})
		.catch(err => {
			const errors = handleErrors(err);
			res.status(400).json(errors);
		})
}

module.exports.login_admin = (req, res) => {
	const { email, password } = req.body;

	User.login(email, password)
		.then(user => {
			if(user.user=="admin"){
				const token = createToken(user._id); // Creamos un token utilizando solo el id del usuario

				res.cookie("userToken", token, { httpOnly: true, maxAge: maxAge * 1000 })
				res.status(200).json({user: user._id}) //Enviamos solamente el id del usuario
			}else{
				console.log("Vino aqui interno.");
				res.status(400).json({error:"Usted no es admin"});
			}
		})
		.catch(err => {
			console.log("Vino aqui.");
			const errors = handleErrors(err);
			res.status(400).json(errors);
		})
}

module.exports.logout_get = (req, res) => {
	res.cookie("login", "", {maxAge: 1});
	res.status(200).json({ message:"User logout" });
}