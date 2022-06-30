const { hasAuth } = require("../middlewares");
const controller = require("../controllers/todos.controller");

const express = require("express");
const router = express.Router();

router.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

router.get(
  "/:id",
  /**  #swagger.tags = ['Todos']*/
  controller.TodosAll
);

router.get(
  "/:id",
  hasAuth,
  /**  #swagger.tags = ['Todos']*/
  controller.TodoById
);

router.put(
  "/:id",
  hasAuth,
  /**  #swagger.tags = ['Todos']*/
  controller.TodoUpdateById
);

router.get(
  "/search/:id",
  hasAuth,
  /**  #swagger.tags = ['Todos']*/
  controller.TodoByTitle
);

router.delete(
  "/:id",
  hasAuth,
  /**  #swagger.tags = ['Todos']*/
  controller.TodoDelete
);
("");

router.post(
  "/:id",
  hasAuth,
  /**  #swagger.tags = ['Todos']*/
  controller.TodoCreate
);

module.exports = router;
