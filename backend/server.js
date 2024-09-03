require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const favoritesRoutes = require("./routes/favorites");
const userRoutes = require("./routes/user.js");
const cors = require("cors");

//express app
const app = express();

//cors for coonecting frontend to backend
app.use(cors());

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

//routes
app.use("/favorites", favoritesRoutes);
app.use("/user", userRoutes);

//connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    //listen for response
    app.listen(process.env.PORT, () => {
      console.log("Connected to DB and listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
