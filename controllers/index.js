class Controller {
  static getRootHandler(req, res) {
    res.status(200).json({ message: "welcome to Note App" });
  }
}

module.exports = Controller;
