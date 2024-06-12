import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowerCase: true,
      trim: true,
    },
    fullName: {
      type: String,
      required: true,
      trim: true,
      index: true,
    },
    avatar: {
      type: String, // cloudinary url
      required: true,
    },
    coverImage: {
      type: String,
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId,
        ref: "Video",
      },
    ],
    password: {
      type: String,
      required: [true, "Password Field is Required"],
    },
    refreshToken: {
      type: String,
    },
  },
  { timestamps: true }
);

// .pre() is mongoose hook, used to run just before the functionality you mention. And we r using here to encrypt pass before saving.
userSchema.pre("save", async function (next) {
  // don't use arrow fn here, because we need this in function.

  if (!this.isModified("password")) return next(); // this validation is to not encrypt pass any time someother field changed.

  this.password = bcrypt.hash(this.password, 10); // 10(or any no.) is no. of rounds, u have to pass it for hash algo

  next(); // next is middleware argument like res, req
});

// Adds an instance method to documents constructed from Models compiled from this schema.
// Compare the password (encryption and string)
userSchema.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password); // password is the string user entered, this.password is password that is stored as a encrypted pass in DB.
};

userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      userName: this.userName,
      fullName: this.fullName,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );
};
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id,
    },
    process.env.REFRESH_TOKEN_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );
};
export const User = mongoose.model("User", userSchema);
