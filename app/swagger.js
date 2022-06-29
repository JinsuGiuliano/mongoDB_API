const swaggerAutogen = require("swagger-autogen")();

const outputFile = "./swagger_output.json";
const endpointsFiles = [
  "./app/routes/auth.routes.js",
  "./app/routes/users.routes.js",
  "./app/routes/images.routes.js",
  "./app/routes/todos.routes.js",
  "./app/routes/posts.routes.js",
  "./app/routes/chat.routes.js",
];

swaggerAutogen(outputFile, endpointsFiles).then(() => {
  require("../server.js");
  console.log("archivo creado");
});

module.exports = function (app) {
  var swaggerUi = require("swagger-ui-express");
  const swaggerFile = require("../swagger_output.json");

  // set port, listen for requests

  app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerFile));
};
