const { Note, User } = require("../models");
const jwt = require("../helpers/jwt");

const authenticate = (req, res, next) => {
  try {
    const decoded = jwt.verifyToken(req.headers.access_token);
    User.findOne({ where: { email: decoded.email } })
      .then((user) => {
        if (user) {
          req.decoded = {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
          };
          next();
        } else {
          next({
            code: 404,
            message: "Not Found",
          });
        }
      })
      .catch(next);
  } catch (err) {
    next(err);
  }
};

const authorize = (req, res, next) => {
  const { id } = req.params;

  Note.findOne({ where: { id } })
    .then((data) => {
      console.log(data.user_id, req.decoded.id);
      if (data) {
        if (data.user_id == req.decoded.id) next();
        else {
          next({
            code: 401,
            message: "Unauthorize access",
          });
        }
      } else {
        next({
          code: 404,
          message: "Not Found",
        });
      }
    })
    .catch(next);
};

const authorizeRead = (req, res, next) => {
  const { id } = req.params;

  Note.findOne({ where: { id } })
    .then((data) => {
      if (data) {
        console.log(data.user_id, req.decoded.id);
        // status disable due to still buggy
        // if (data.user_id == req.decoded.id || data.status == "public") next();
        if (data.user_id == req.decoded.id) next();
        else {
          next({
            code: 401,
            message: "Unauthorize access",
          });
        }
      } else {
        next({
          code: 404,
          message: "Not Found",
        });
      }
    })
    .catch(next);
};

module.exports = {
  authenticate,
  authorizeRead,
  authorize,
};
