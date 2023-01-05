import express, { NextFunction, Request, Response } from "express";
import cyber from "../01-utils/cyber";
import verifyLoggedIn from "../02-middleware/verify-logged-in";
import { QuestionModel } from "../03-models/question-model";
import logic from "../05-logic/questions-logic";

const router = express.Router();

router.post("/questions", verifyLoggedIn , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const question = new QuestionModel(request.body);
        const userId = cyber.getUserFromToken(request.header("authorization"))._id;
        question.userId = userId;
        const addedQuestion = await logic.addQuestion(question);
        response.status(201).json(addedQuestion);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/questions-by-userId/:userId", verifyLoggedIn , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.params.userId;
        const questions = await logic.getQuestionsByUserId(userId);
        response.json(questions);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/questions-by-values/:bookId/:page/:questionNumber" , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const bookId = request.params.bookId;
        const page = +request.params.page;
        const questionNumber = +request.params.questionNumber;
        const question = await logic.getQuestionsByValues(bookId, page, questionNumber);
        response.json(question);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;