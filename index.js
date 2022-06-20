// import all required dependencies for the software to run
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const express = require("express");
const cors = require("cors");
const userRoutes = require("./users/routes");
const costsRoutes = require("./costs/routes");
const app = express();

// initialize environment configuration
dotenv.config();
const port = process.env.PORT;
const dbUrl = process.env.DB_PASS;

// setup http middleware
app.use(express.json());
app.use(cors());
app.use(userRoutes);
app.use(costsRoutes);

// create connection to db
mongoose.connect(dbUrl, (err) => {
  if (err) {
    console.log("Connection to DB fail");
    console.error(err);
  } else {
    console.log("Connection to DB succefful");
    app.listen(port, () => {
      console.log(`App is running on port: ${port}`);
    });
  }
});
