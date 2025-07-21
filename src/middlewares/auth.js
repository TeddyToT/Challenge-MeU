const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const whiteLists = ["/sign-up", "/log-in"];
  if (whiteLists.find((item) => "/api" + item === req.originalUrl)) {
    next();
  } else {
    if (req?.headers?.authorization?.split(" ")?.[1]) {
      const token = req.headers.authorization.split(" ")[1];
      try {
        const decodeJWT = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        // console.log("decode: ", decodeJWT);
        req.user = {
          email: decodeJWT.email,
          name: decodeJWT.name,
        };
        console.log(req.user);

        next();
      } catch (error) {
        return res.status(401).json({
          message: "Token is invalid/expired",
        });
      }
    } else {
      return res.status(401).json({
        message: "Access Token was not found in header/Token is expired",
      });
    }
  }
};

module.exports = auth
