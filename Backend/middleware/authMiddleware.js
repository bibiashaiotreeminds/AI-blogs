const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");

const protect = asyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      //get token from header
      token = req.headers.authorization.split(" ")[1];
      //verify token
      const decoded = jwt.verify(token, "aisha");
      //get user from token
      req.user = decoded;
      next();
    } catch (error) {
      res.status(401).json({message: 'Authorization error'})
      throw new Error("Not authorized");
    }
  }
  if(!token){
    res.status(401).json({message: 'Authorization error'})
    throw new Error("Not authorized");
  }
});

module.exports={protect}