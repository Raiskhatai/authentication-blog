const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        error: "Unauthorized. Missing token.",
      });
    }

    const token = authHeader.split(" ")[1];

    const decode = jwt.verify(token, process.env.SECRET_KEY);

    req.user = decode;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      error: "Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
