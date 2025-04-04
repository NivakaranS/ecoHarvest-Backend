const jwt = require("jsonwebtoken");
const authenticate = (req, res, next) => {
  // Get token from the cookies
  const token = req.cookies.token;
  console.log("token from auth Middleware", token);
  if (!token) {
    return res.status(401).json({ message: "Unauthorized, no token provided" });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Use the same secret as in your login route
    req.user = decoded; // Attach decoded user info to the request object (company info here)
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error("Authentication error: ", error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
const verifyToken = (req, res, next) => {
  let token;
  let authHeader = req.headers.Authorization || req.headers.authorization;
  console.log("authHeader", authHeader);
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Access Denied" });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      console.log("The user is: ", req.user);
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  } else {
    return res.status(401).json({ message: "No token provided" });
  }
};

module.exports = verifyToken;
