const { authJwt, cleanCache } = require("../middlewares");
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
//READ Posts
router.get("/all", controller.PostsAll);

router.get("/latest", controller.LatestPost);
//READ Post by ID
router.get("/id", controller.PostById);

router.get("/user", controller.PostsByUserId);
//Update Post by ID
router.put("/:id", controller.PostUpdateById);

//Delete Post by ID
router.delete("/:id", controller.PostDelete);

//Create Post
router.post("/", controller.PostCreate);

//Like Post
router.post("/like", controller.PostLike);

//Dislike Post
router.post("/dislike", controller.PostDislike);
module.exports = router;
