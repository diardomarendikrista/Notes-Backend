const { User, Note } = require("../models");

class NoteController {
  static readAll(req, res, next) {
    res.status(200).json({ message: "ini note" });
  }

  static add(req, res, next) {
    
  }
}

module.exports = NoteController;
