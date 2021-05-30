const { User, Note } = require("../models");
const { comparePassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");

class UserController {
  static async readAll(req, res, next) {
    try {
      // must be admin role
      if (req.decoded.role === "admin") {
        const users = await User.findAll({
          attributes: {
            exclude: ["password"],
          },
        });
        res.status(200).json({ status: "success", users });
      } else {
        res.status(401).json({ status: "error", message: "You are unauthorized" });
      }
    } catch (error) {
      next(error);
    }
  }

  static async register(req, res, next) {
    const newUser = {
      name: req.body.name,
      email: req.body.email.toLowerCase(),
      password: req.body.password,
    };

    try {
      const user = await User.create(newUser);
      console.log(user);
      res.status(201).json({ status: "success", user });
    } catch (error) {
      next(error);
    }
  }

  static async login(req, res, next) {
    const email = req.body.email;
    const password = req.body.password;

    try {
      const user = await User.findOne({ where: { email } });
      if (user) {
        const comparedPassword = comparePassword(password, user.password);
        if (comparedPassword) {
          const payload = {
            id: user.id,
            email: user.email,
            role: user.role,
          };
          const access_token = generateToken(payload);
          res.status(200).json({ access_token });
        } else {
          next({
            status: "error",
            code: 401,
            message: "Invalid Email or Password",
          });
        }
      } else {
        next({
          status: "error",
          code: 401,
          message: "Invalid Email or Password",
        });
      }
    } catch (error) {
      next(error);
    }
  }

  // emergency use only
  static async deleteUser(req, res, next) {
    const { id } = req.params;

    try {
      // must be admin role
      if (req.decoded.role === "admin") {
        const user = await User.destroy({ where: { id } });
        if (user) {
          res
            .status(200)
            .json({ status: "success", message: "user has been deleted." });
        } else {
          next({
            status: "error",
            code: 404,
            message: "User Not Found",
          });
        }
      } else {
        res.status(401).json({ status: "error", message: "You are unauthorized" });
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
