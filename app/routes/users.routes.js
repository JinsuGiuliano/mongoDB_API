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
router.get("/all", controller.allUsers);

router.get("/", controller.userById);

router.get("/profile", controller.userProfile);

router.put("/:id", controller.userUpdate);

router.post("/follow", controller.followUser);

router.post("/unfollow", controller.unFollowUser);

router.delete("/", controller.DeleteAllUsers);

module.exports = router;
