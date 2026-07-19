const express = require("express");
const authRouter = express.Router();
const validateSignUpdata = require("../utils/validation");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../Model_or_Database_Schema/user");

authRouter.post("/users/signup", async (req, res) => {
  try 
  {
    
    validateSignUpdata(req);
    console.log(req.body);
    let { name, email, password, preferences } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed pw: " + hashedPassword);
    password = hashedPassword;
    console.log("updating hashed pw: " + password);
    const newObj = {
      name,
      email,
      password,
      preferences,
    };
    const user = new User(newObj);
    await user.save();
    console.log("saved document is: " + newObj);
    // res.send(
    //   "Signup data added/saved successfully to the database - User Registration Completed!!",
    // );
    res.status(200).json({
        success: true,
        message:"User Registration Successful!"
    
    });
    console.log("User data added to DB succeessfully");
  } 
  catch (err) 
  {
    res.status(400).json({
    success: false,
    error: {
        message: err.message
    }
    });
    console.error("data not addded to db: " + err.message);
  }
});

authRouter.post("/users/login", async (req, res) => {
  try 
  {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) 
    {
      console.log("Invalid email");
      const err = new Error("Invalid credentials");
      err.statusCode = 401;
      throw err;
    } else {
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (isPasswordValid) {
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        console.log("token gen...! " + token);

        res.cookie("token", token);

        console.log("login made it bro");
        console.log(token);
        res.status(200).json({
        success: true,
        message:`${user.name} Login Successful `  ,
        token:token
        });
      } 
      else 
      {
        console.log("Invalid Password");
        const err = new Error("Invalid credentials");
        err.statusCode = 401;
        throw err;
      }
    }
  }
  catch (err) 
  {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message
    });
  }
  
});

authRouter.post("/users/logout", async (req, res) => {
  res.cookie("token", null, { expires: new Date(Date.now()) });
  res.send();
});

module.exports = authRouter;