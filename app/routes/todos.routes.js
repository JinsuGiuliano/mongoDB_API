const { authJwt } = require("../middlewares");
const controller = require("../controllers/todos.controller");

const express = require('express');
const router = express.Router();

  router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });


  //READ Todos
  router.get('/:id', controller.TodosAll);

  //READ Todo by ID 
  router.get('/:id',controller.TodoById);

    //Update Todo by ID
  router.put('/:id', controller.TodoUpdateById);
  
  //READ Todo by Title 
  router.get('/search/:id', [authJwt.verifyToken], controller.TodoByTitle);
  
  //Delete Todo by ID
  router.delete('/:id', [authJwt.verifyToken],controller.TodoDelete);

   //Create Todo by ID
  router.post('/:id', [authJwt.verifyToken],controller.TodoCreate);


  module.exports = router;