// require("dotenv").config({ path: "./env" });
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./env",
});

connectDB();
/*
This is the first(basic) method to connect db.


* always use try catch, db is in another continent so it takes time to fetch so always use async await.
* you can also use iffy ()(), for defining and calling function.

import express from "express";
const app = express();
const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`); // db connected

    app.on("Error", (error) => {
      console.log(error);
      throw error;
    });

    app.listen(process.env.PORT, () => {
      console.log(`app is listening on ${process.env.PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
};

connectDB();
*/
