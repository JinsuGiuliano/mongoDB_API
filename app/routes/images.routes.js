const { authJwt } = require("../middlewares");
const controller = require("../controllers/images.controller");

const express = require('express');
const router = express.Router();

//IMAGES HANDLERS   

    router.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
    //READ all Images
    router.get('/',[authJwt.verifyToken], controller.ImagesAll);
    //READ Image by ID 
    router.get('//:id',[authJwt.verifyToken],controller.ImagesId);


    module.exports = router;