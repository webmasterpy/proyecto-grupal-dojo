const mongoose = require("mongoose");
const { isEmail } = require("validator");
const bcrypt = require("bcrypt");

// * Creamos el esquema para nuestro modelo
const userSchema = new mongoose.Schema({
	user: {
		type: String,
		required: [true, "Please enter a User Name"],
		unique: true,
		lowercase: true,
	},
	email:{
		type:String,
		required: [true, "Please enter an email"],
		unique: true,
		lowercase: true,
		validate:[isEmail, "Please enter a valid email"]
	},
	password:{
		type: String,
		required: [true, "Please enter a password"],
		minlength: [6, "Minimun characters are 6"	]
	}
});

// * Encriptar el password antes de guardar
userSchema.pre("save", async function(next){
	const salt = await bcrypt.genSalt();
	this.password = await bcrypt.hash(this.password, salt);

	next();
})

// * Método estático para que acceder por login
userSchema.statics.login = async function(email, password) {
	const user = await this.findOne({ email });

	// Verificamos si existe el usuario
	if(user){
		const auth = await bcrypt.compare(password, user.password)
		
		if(auth)
			return user;
		
		throw Error("Incorrect Password");
	}
	throw Error("Incorrect Email");
}

// * Creamos el modelo
const User = mongoose.model("user", userSchema);

module.exports = User;