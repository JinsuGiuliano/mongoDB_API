const { authJwt, cleanCache } = require("../middlewares");
const controller = require("../controllers/chat.controller");
const express = require("express");
const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
// [cleanCache], middleware for cleanning Cache

router.get(
  "/chatById",
  /**  #swagger.tags = ['Chats']
   */
  controller.ChatRetrieveById
);

router.delete(
  "/",
  /**  #swagger.tags = ['Chats']*/
  controller.ChatDeleteById
);

router.post(
  "/",
  /**  #swagger.tags = ['Chats']*/
  controller.ChatCreate
);

router.post(
  "/message",
  /**  #swagger.tags = ['Chats']*/
  controller.ChatMessage
);

module.exports = router;
