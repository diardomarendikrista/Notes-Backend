function errorHandler(err, req, res, next) {
  if (err.name == 'SequelizeValidationError') {
    res.status(400).json({
      code: 400,
      message: err.message.split("Validation error: ").join('').split("notNull Violation: ").join(''),
      detail: err
    })
  } else if (err.name == 'JsonWebTokenError') {
    res.status(401).json({
      code: 401,
      message: 'Not Authorized / Invalid token.',
      detail: err
    })
  } else if (err.name == 'SequelizeUniqueConstraintError') {
    res.status(401).json({
      code: 401,
      message: err.errors[0].message,
      detail: err
    })
  } else if (err.code == '400') {
    res.status(400).json({
      code: 400,
      message: err.message,
      detail: err
    });
  } else if (err.code == '401') {
    res.status(401).json({
      code: 401,
      message: err.message,
      detail: err
    });
  } else if (err.code == '403') {
    res.status(403).json({
      code: 403,
      message: err.message,
      detail: err
    });
  } else if (err.code == '404') {
    res.status(404).json({
      code: 404,
      message: err.message,
      detail: err
    });
  } else if (err.code == '405') {
    res.status(405).json({
      code: 405,
      message: err.message,
      detail: err
    });
  } else {
    res.status(500).json({
      code: 500,
      message: err.message,
      isHandled: false,
      detail: err
    });
  }
}

module.exports = errorHandler;

