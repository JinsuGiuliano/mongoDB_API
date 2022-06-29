const { authJwt, cleanCache } = require("../middlewares");
const controller = require("../controllers/chat.controller");
const express = require('express');
const router = express.Router();


 router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
 });
// [cleanCache], middleware for cleanning Cache
 //READ Chat
//  router.get('/',  controller.ChatRetrieveAll);

 //READ Chat by ID 
 router.get('/',controller.ChatRetrieveById);

//  //Update Chat by ID
// router.put('/:id',controller.ChatUpdateById);

 //Delete Chat by ID
 router.delete('/',controller.ChatDeleteById);
 
//Create Chat
 router.post('/', controller.ChatCreate);

//Create Message
router.post('/message', controller.ChatMessage);

 module.exports = router;