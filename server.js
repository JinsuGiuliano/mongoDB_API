const express = require("express");
const session = require("express-session");
const cors = require("cors");
const passport = require("passport");
require("./app/models/categories.model");
require("./app/services/passportConfig");
require("./app/services/cache");
// const { connectRedis } = require('./app/services/redis')
// connectRedis()

const AppError = require("./utils/appError");
const ErrorHandler = require("./app/controllers/error.controller");
require("dotenv").config();

// const passport = require("passport");
// require("./app/services/passportConfig")(passport);

const SwaggerInit = require("./app/swagger");

//CONNECT TO DATABASE
const database = require("./db");
database.connect();

const AuthRoutes = require("./app/routes/auth.routes");
const UsersRoutes = require("./app/routes/users.routes");
const ImagesRoutes = require("./app/routes/images.routes");
const PostsRoutes = require("./app/routes/posts.routes");
const ChatRoutes = require("./app/routes/chat.routes");
var corsOptions = {
  origin: "http://localhost:3000",
};

const app = express();
try {
  app.use(
    session({
      secret: `${process.env.SESSION_SECRET}`,
      resave: true,
      saveUninitialized: true,
    })
  );
  app.use(passport.session());
  app.use(passport.initialize());

  //CORS
  app.use(cors(corsOptions));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //SWAGGER AUTO-GEN
  SwaggerInit(app);

  // ROUTES
  app.get("/", (req, res) => {
    res.json({ message: "Bienvenido a la Aplicación de Gustavo Giuliano." });
  });
  app.use("/auth", AuthRoutes);
  app.use("/api/users", UsersRoutes);
  app.use("/api/posts", PostsRoutes);
  app.use("/api/images", ImagesRoutes);
  app.use("/api/chats/", ChatRoutes);

  app.all("*", (req, res, next) => {
    next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
  });

  app.use(ErrorHandler);

  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en puerto ${PORT}.`);
  });

  console.log("your enviroment is set to: ", process.env.NODE_ENV);
  console.log("Date Now: ", Date.now());
} catch (error) {
  console.log("error: ", error);
}

module.exports = app;
