const { authJwt } = require("../middlewares");
const controller = require("../controllers/user.controller");

const express = require("express");
const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});
// [authJwt.verifyToken],
router.get(
  "/all",
  /**  #swagger.tags = ['Users']*/
  controller.allUsers
);

router.get(
  "/",
  /**  #swagger.tags = ['Users']*/
  controller.userById
);

router.get(
  "/profile",
  /**  #swagger.tags = ['Users']*/
  controller.userProfile
);

router.put(
  "/:id",
  /**  #swagger.tags = ['Users']*/
  controller.userUpdate
);

router.post(
  "/follow",
  /**  #swagger.tags = ['Users']*/
  controller.followUser
);

router.post(
  "/unfollow",
  /**  #swagger.tags = ['Users']*/
  controller.unFollowUser
);

router.delete(
  "/",
  /**  #swagger.tags = ['Users']*/
  controller.DeleteAllUsers
);

module.exports = router;
