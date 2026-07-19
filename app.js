const express = require("express");
const app = express();
const mongoDb = require("./DataBase_Configuration/DB_Connection");

const cookieParser = require("cookie-parser");

const authRouter = require("./Routes/auth");
const preferencesRouter = require("./Routes/preferences");
const newArticles_API_Router = require("./Routes/newArticles_API");


mongoDb().then(() => {
  app.listen(process.env.PORT, (err) => {
    if (err) {
      return console.log("Something bad happened", err);
    } else {
      // console.log(`Server is listening on ${process.env.PORT}`);
      console.log(`Server is listening on ${process.env.PORT}`);
    }
  });
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/",authRouter);
app.use("/",preferencesRouter);
app.use("/",newArticles_API_Router);

module.exports = app;

