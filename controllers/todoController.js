const { Todo } = require("../models");
const Op = require("sequelize").Op;

class TodoController {
  static async add(req, res, next) {
    const newData = {
      todo: req.body.todo,
      order: req.body.order,
      done: req.body.done,
      note_id: req.body.note_id,
    };

    try {
      await Todo.create(newData);
      res.status(201).json({ status: "success", data: "Success Add Data" });
    } catch (error) {
      next(error);
    }
  }

  static async edit(req, res, next) {
    const { id } = req.params;

    const updateNote = {
      id,
      todo: req.body.todo,
      order: req.body.order,
      done: req.body.done,
      note_id: req.body.note_id,
    };

    try {
      await Todo.update(updateNote, { where: { id } });
      res.status(200).json({ status: "success", data: "Success Update Data" });
    } catch (error) {
      next(error);
    }
  }

  static async delete(req, res, next) {
    const { id } = req.params;

    try {
      await Todo.destroy({ where: { id } });
      res
        .status(200)
        .json({ status: "success", message: "note has been deleted." });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = TodoController;
