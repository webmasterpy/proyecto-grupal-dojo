const express = require("express");
const app = express();
const port = 8000;
const cors = require("cors");
const user_routes = require("./routes/user.routes");
const cookieParser = require("cookie-parser");

//middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ 
  origin: "http://localhost:3000", 
  credentials: true 
}));
app.use(cookieParser())

//base de datos
require("./config/mongoose.config");

//enrutamiento
const projectRoutes = require("./routes/polls.routes.js");
projectRoutes(app);
app.use(user_routes);

//levantar servidor node
app.listen(port, () => console.log("Servidor corriendo en puerto:" + port));