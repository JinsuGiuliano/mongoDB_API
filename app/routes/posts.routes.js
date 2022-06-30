const { authJwt, cleanCache, hasAuth } = require("../middlewares");
const controller = require("../controllers/posts.controller");
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
  "/all",
  hasAuth,
  /**  #swagger.tags = ['Posts']*/
  controller.PostsAll
);

router.get(
  "/latest",
  hasAuth,
  /**  #swagger.tags = ['Posts']*/
  controller.LatestPost
);

router.get(
  "/retrievebyid",
  /**  #swagger.tags = ['Posts']*/
  controller.PostById
);

router.get(
  "/retrievebyuser",
  /**  #swagger.tags = ['Posts']*/
  controller.PostsByUserId
);

router.put(
  "/update",
  /**  #swagger.tags = ['Posts']
   */
  controller.PostUpdateById
);

router.delete(
  "/delete",
  /**  #swagger.tags = ['Posts']*/
  controller.PostDelete
);

router.post(
  "/create",
  /**  #swagger.tags = ['Posts']*/
  controller.PostCreate
);

router.post(
  "/like",
  /**  #swagger.tags = ['Posts']*/
  controller.PostLike
);

router.post(
  "/dislike",
  /**  #swagger.tags = ['Posts']*/
  controller.PostDislike
);
module.exports = router;
