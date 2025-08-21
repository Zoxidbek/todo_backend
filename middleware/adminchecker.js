const jwt = require("jsonwebtoken");

function adminChecker(req, res, next) {
  try {
    const token = req.headers.authorization;

    if (!token) {
      res.status(401).json({ message: "Token not found" });
    }

    const bearer = token.split(" ")[0];
    const accessToken = token.split(" ")[1];

    if (bearer !== "Bearer" || !accessToken) {
      res
        .status(401)
        .json({ message: "Invalid bearer or invalid access token" });
    }

    const decode = jwt.verify(accessToken, process.env.SECRET_KEY);
    req.user = decode;

      const roles = ["admin"];

    next();
  } catch (error) {
    res.status(500).json({ message1: error.message });
  }
}

module.exports = adminChecker;
