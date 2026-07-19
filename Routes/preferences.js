
const express = require("express");
const preferencesRouter = express.Router();
const token_verification = require("../MiddleWares/Token_Verification");
require("dotenv").config();


preferencesRouter.get("/users/preferences", token_verification, async (req, res) => 
  {
    try
    {
      const user = req.user;
      const preferences = user.preferences;
      console.log(preferences);
      res.status(200).json({
        success: true,
        message: "returning users preferences list",
        preferences:preferences
    });
  }
  catch (err) 
  {
    res.status(err.statusCode || 500).json({
      success: false,
        message: err.message
    });
  }

})

preferencesRouter.put("/users/preferences", token_verification, async (req, res) => 
  {
  try
  {
    const user = req.user;
    const userPreferences = req.body.preferences;
    user.preferences = userPreferences;
    console.log(user.preferences);
    await user.save();
    res.status(200).json({
        success: true,
        message: "returning updated users preferences list",
        preferences:user.preferences
    });
  }
  catch (err) 
  {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message
    });
  }
  
})


module.exports = preferencesRouter;