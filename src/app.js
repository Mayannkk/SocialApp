import express, { urlencoded } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

// .use is used to set middlewares(middlewares are middle process of req and res)
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

// cookie parser middleware is use to access and set user's browser's cookie. i.e. doing crud operation on cookie
app.use(cookieParser());

// data will come from many ways(json, url, files)

app.use(express.json({ limit: "16kb" })); // data is coming in form of json (from forms etc.)
app.use(urlencoded({ extended: true, limit: "16kb" })); //this is to configure the data which coming from url.
app.use(express.static("public")); // this is to configure the images, png etc, from a folder(public) that we created for storing files.

export { app };
