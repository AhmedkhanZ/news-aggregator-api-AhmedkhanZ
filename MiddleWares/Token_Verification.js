const jwt = require("jsonwebtoken");
const User = require("../Model_or_Database_Schema/user");
require("dotenv").config();

const token_verification = async (req, res, next) => {
  try {
    const auth = req.headers.authorization;
    const token = req.cookies.token || auth?.split(" ")[1];
    if (!token) {
      console.log(" token is Invalid");
      const err = new Error("Token is Invalid/not generated");
      err.statusCode = 401;
      throw err;
    }

    const decodedPayLoad = jwt.verify(token, process.env.JWT_SECRET);

    const { id } = decodedPayLoad;
    const user = await User.findById(id);
    console.log("user in tokenVerification middleware is: " + user);
    if (!user) {
      throw new Error(
        "You havent registered previously../User dont exist in Database(Dont behave like this you are not loggedIn bro😤😤",
      );
    }
    req.user = user;
    console.log("from auth req.user is: " + req.user);
    next();
  } catch (err) {
    res.status(err.statusCode || 500).json({
      success: false,
      message: err.message,
    });
  }
};

module.exports = token_verification;
