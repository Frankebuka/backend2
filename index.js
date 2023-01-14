//import express
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const accountRoutes = require("./routes/account");
const bankRoutes = require("./routes/banks");
const userRoutes = require("./routes/user");

// create express server instance
const server = express();

//middlewares
server.use(bodyParser.json());

//routes
server.use(accountRoutes);
server.use(bankRoutes);
server.use(userRoutes);

//connect to database and start server
mongoose.set("strictQuery", false);
mongoose
  .connect(
    "mongodb+srv://Frank:jasper147@cluster0.aqq6vws.mongodb.net/codetrain?retryWrites=true&w=majority",
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then((result) => {
    server.listen(3000, () => console.log("server is ready"));
  })
  .catch((err) => console.log(err));
