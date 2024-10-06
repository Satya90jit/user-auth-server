const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  // Check if token is present
  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  // Check if the token has the "Bearer" keyword and split
  const tokenParts = token.split(" ");
  if (tokenParts[0] !== "Bearer" || tokenParts.length !== 2) {
    return res
      .status(400)
      .json({ message: "Malformed token. Use 'Bearer <token>' format." });
  }

  const actualToken = tokenParts[1];

  try {
    // Log the token for debugging
    // console.log("Received Token: ", actualToken);

    // Verify the token
    const decoded = jwt.verify(actualToken, process.env.JWT_SECRET);
    req.user = decoded; // Store decoded user info in req.user

    next();
  } catch (err) {
    // console.log("JWT Verification Error:", err.message); // Log error
    return res.status(400).json({ message: "Invalid token" });
  }
};
const verifyAdmin = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  });
};

module.exports = { verifyToken, verifyAdmin };
