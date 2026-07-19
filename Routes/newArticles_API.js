const express = require("express");
const newArticles_API_Router = express.Router();
const token_verification = require("../MiddleWares/Token_Verification");
const axios = require("axios");


newArticles_API_Router.get("/news", token_verification, async (req, res) => {
  try {
    console.log("api key is : " + process.env.API_KEY);
    const user = req.user;
    const preferences = user.preferences;
    const query = preferences.length > 0 ? preferences.join(" OR ") : "technology";
    const response = await axios.get(
      // "https://newsapi.org/v2/everything?q=apple&from=2026-07-17&to=2026-07-17&sortBy=popularity&apiKey=",
      "https://newsapi.org/v2/everything",
      {
        params: {
          q: query,
          sortBy: "popularity",
          apiKey: process.env.API_KEY,
        },
      },
    );
    console.log(response.data);
    res.status(200).json({
      success: true,
      message: "pulling news articles........",
      news : response.data.articles
    });
  } catch (err) {
    console.log(err.response?.data);
    console.log(err.response?.status);
    
    res.status(401).json({
      success: false,
      message: err.message
    });
  }
});


module.exports = newArticles_API_Router;