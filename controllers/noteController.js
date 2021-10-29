const { User, Note } = require("../models");
const Op = require("sequelize").Op;

class NoteController {
  static async readAll(req, res, next) {
    const { id } = req.decoded;

    try {
      const data = await Note.findAll({
        where: {
          user_id: id,
        },
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async readById(req, res, next) {
    const { id } = req.params;

    try {
      const data = await Note.findOne({
        where: { id },
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      });
      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async searchNote(req, res, next) {
    const { id } = req.decoded;
    const { keyword } = req.params;

    try {
      const data = await Note.findAll({
        where: {
          user_id: id,
          [Op.or]: {
            title: { [Op.iLike]: `%${keyword}%` },
            note: { [Op.iLike]: `%${keyword}%` },
            tag: { [Op.iLike]: `%${keyword}%` },
          },
        },
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
        order: [["createdAt", "DESC"]],
      });
      res.status(200).json({ status: "success", data });
    } catch (error) {
      next(error);
    }
  }

  static async addNote(req, res, next) {
    const { id } = req.decoded;

    const newNote = {
      title: req.body.title,
      note: req.body.note,
      tag: req.body.tag,
      status: req.body.status || "private",
      user_id: id,
    };

    try {
      const data = await Note.create(newNote);
      const addedNote = await Note.findOne({
        where: { id: data.id },
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      });
      res.status(201).json({ status: "success", data: addedNote });
    } catch (error) {
      next(error);
    }
  }

  static async editNote(req, res, next) {
    const { id } = req.params;

    const updateNote = {
      id,
      title: req.body.title,
      note: req.body.note,
      tag: req.body.tag,
      status: req.body.status || "public",
    };

    try {
      await Note.update(updateNote, { where: { id } });
      const updatedNote = await Note.findOne({
        where: { id },
        include: {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      });
      res.status(200).json({ status: "success", data: updatedNote });
    } catch (error) {
      next(error);
    }
  }

  static async deleteNote(req, res, next) {
    const { id } = req.params;

    try {
      await Note.destroy({ where: { id } });
      res
        .status(200)
        .json({ status: "success", message: "note has been deleted." });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = NoteController;
