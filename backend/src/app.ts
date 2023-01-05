import dotenv from "dotenv";
dotenv.config(); 

import express, { NextFunction, Request, Response } from "express";
import cors from "cors";
import expressRateLimit from "express-rate-limit";
import config from "./01-utils/config";
import errorsHandler from "./02-middleware/errors-handler";
import ErrorModel from "./03-models/error-model";
import dal from "./04-dal/dal";

dal.connect();

import authController from "./06-controller/auth-controller";
import usersController from "./06-controller/users-controller";
import subjectsController from "./06-controller/subjects-controller";
import booksController from "./06-controller/books-controller";
import questionsController from "./06-controller/questions-controller";
import answersController from "./06-controller/answers-controller";
import preventGarbage from "./02-middleware/prevent-garbage";
import fileUpload from "express-fileupload";
import sanitize from "./02-middleware/sanitize";


const server = express();

server.use("/", expressRateLimit({
    windowMs: 10000,
    max: 10000,
    message: "Are you a hacker?"
}));

if (config.isDevelopment) server.use(cors());
server.use(express.json());
server.use(preventGarbage);
server.use(fileUpload());
server.use(sanitize);

server.use("/api", authController);
server.use("/api", usersController);
server.use("/api", subjectsController);
server.use("/api", booksController);
server.use("/api", questionsController);
server.use("/api", answersController);

server.use("*", (request: Request, response: Response, next: NextFunction) => {
    next(new ErrorModel(404, "Route not found."));
});

server.use(errorsHandler);

server.listen(process.env.PORT, () => console.log("Listening..."));

