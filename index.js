//MAIN BACKEND FILE(day 29 to 35)

require("dotenv").config();
// const express = require("express");
// var cors = require("cors");
// const helmet = require("helmet");
// const mongoose = require("mongoose");
// require("@babel/core").transform("code", {
//   presets: ["@babel/preset-env"],
// });
//const { request, json } = require("express");

import express from "express";
import cors from "cors";
import helmet from "helmet";
import passport from "passport";
import googleOAuth from "passport-google-oauth20";

//Database Connection
import ConnectDB from "./database/connection";

//google authentication config
import googleAuthConfig from "./config/google.config";

//Private route authentication configuration
import privateRouteconfig from "./config/route.config";

//API
import Auth from "./API/Auth";
import Restaurant from "./API/Restaurant";
import Food from "./API/Food";
import menu from "./API/Menu";
import image from "./API/Image";
import order from "./API/Orders";
import Review from "./API/Reviews";
import users from "./API/Users";
import { UserModel } from "./database/user";
//passport config
googleAuthConfig(passport);
privateRouteconfig(passport);
const zomato = express();
zomato.use(cors());
zomato.use(express.json());
zomato.use(helmet());
zomato.use(passport.initialize());

// zomato.use(passport.session());

//Application Routes

//https://localhost:4000/auth/signup
zomato.use("/auth", Auth);
zomato.use("/restaurant", Restaurant);
zomato.use("/food", Food);
zomato.use("/menu", menu);
zomato.use("/image", image);
zomato.use("/order", order);
zomato.use("/review", Review);
zomato.use("/user", users);

zomato.listen(process.env.PORT || 4000, function () {
  ConnectDB()
    .then(() => {
      console.log("My Express zomato is running");
    })
    .catch((error) => {
      console.log(
        "My Express zomato is running, But database connection is not done"
      );
      console.log(error);
    });
});
