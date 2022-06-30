const db = require("../models");
const Todo = db.todo;

exports.TodoCreate = async (req, res) => {
  try {
    const todo = new Todo({
      userId: req.params.id,
      title: req.body.title,
      completed: req.body.completed,
      date: req.body.date,
    });
    await todo.save((err, todo) => {
      if (err) {
        res.status(500).send({ message: err });
      } else {
        res.status(200).json({
          status: "success",
          data: {
            todo,
          },
        });
      }
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

exports.TodosAll = async (req, res) => {
  try {
    const allTodos = await Todo.find({ userId: req.params.id });
    res.status(200).json({
      status: "success",
      result: allTodos.length,
      data: {
        allTodos,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      result: allTodos.length,
      data: {
        err,
      },
    });
  }
};

exports.TodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({ id: req.params.id });
    res.status(200).json({
      status: "success",
      result: 1,
      data: {
        todo,
      },
    });
    console.log(req.params);
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

exports.TodoByTitle = async (req, res) => {
  try {
    const todo = await Todo.findOne({ title: req.params.id });
    res.status(200).json({
      status: "success",
      result: 1,
      data: {
        todo,
      },
    });
    console.log(req.params);
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

exports.TodoUpdateById = async (req, res) => {
  console.log(req.body);
  console.log("Server: " + JSON.stringify(req.params));
  try {
    const todo = await Todo.findByIdAndUpdate(
      req.params.id,
      {
        title: req.body.title,
        completed: req.body.completed,
        date: req.body.date,
      },
      {
        new: true,
        runValidators: true,
      }
    );
    res.status(200).json({
      status: "success",
      result: 1,
      data: {
        todo,
      },
    });
    console.log(req.params);
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};

exports.TodoDelete = async (req, res) => {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      data: "Todo with Id " + req.params.id + " has been deleted",
    });
  } catch (err) {
    res.status(400).json({
      status: "error",
      message: err,
    });
  }
};
