const jwt = require("jsonwebtoken");

const authToken = (req, res, next) => {
	const token = req.cookies.userToken;

	// Verifica que el token exista y sea valido
	if(token){
		jwt.verify(
			token,
			"clave-secreta-token",
			(err, decodedToken) => {
				if(err){
					// Retorna un status 401 UNAUTHORIZED
					res.status(401).json({"message": "Invalid Token"});
				} else {
					res.status(200).json(decodedToken);
				}
		})
	} else {
		// Retorna un status 401 UNAUTHORIZED
		res.status(401).json({"message": "Invalid User"});
		next();
	}
}

module.exports = {
	authToken,
}