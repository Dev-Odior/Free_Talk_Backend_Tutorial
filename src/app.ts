import express, { NextFunction, Request, Response } from "express";
import { json, urlencoded } from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import cookieSession from "cookie-session";

import {
  newCommentRouter,
  deleteCommentRouter,
  deletePostRouter,
  newPostRouter,
  updatePostRouter,
  showPostRouter,
  signInRouter,
  signupRouter,
  currentUserRouter,
  addImagesRouter,
  deleteImagesRouter,
} from "./routers";

import {
  NotFoundError,
  currentUser,
  errorHandler,
  requireAuth,
} from "../common";

import * as dotenv from "dotenv";
import { signOutRouter } from "./routers/auth/signout";
dotenv.config();

const app = express();

app.use(
  cors({
    origin: "*",
    optionsSuccessStatus: 200,
  })
);

app.set("trust proxy", true);

app.use(urlencoded({ extended: false }));
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: false,
  })
);

app.use(currentUser); // this works first

app.use(signupRouter);
app.use(signInRouter);
app.use(currentUserRouter);
app.use(signOutRouter);

app.use(requireAuth, newPostRouter);
app.use(requireAuth, deletePostRouter);
app.use(requireAuth, updatePostRouter);
app.use(requireAuth, addImagesRouter);
app.use(requireAuth, deleteImagesRouter);

app.use(showPostRouter);
app.use(requireAuth, newCommentRouter);
app.use(requireAuth, deleteCommentRouter);

app.all("*", (req, res, next) => {
  next(new NotFoundError());
});

//when we  add teh err to the list of params then express knows it is an error handling middleware

//so when handling error , we have errors we created by our self and the  ones our of our control , we must handle all possible error in our application

//Advanced error handling is required

app.use(errorHandler);

export { app };
