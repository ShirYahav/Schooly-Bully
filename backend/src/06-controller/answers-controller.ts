import express, { NextFunction, Request, Response } from "express";
import path from "path";
import cyber from "../01-utils/cyber";
import verifyAdmin from "../02-middleware/verify-admin";
import verifyLoggedIn from "../02-middleware/verify-logged-in";
import { AnswerModel } from "../03-models/answer-model";
import logic from "../05-logic/answers-logic";

const router = express.Router();

router.post("/answers", verifyLoggedIn , async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.files?.image;
        const answer = new AnswerModel(request.body);
        const userId = cyber.getUserFromToken(request.header("authorization"))._id;
        answer.userId = userId;
        const addedAnswer = await logic.addAnswer(answer);
        response.status(201).json(addedAnswer);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/answers-by-question/:questionId" , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const questionId = request.params.questionId;
        const answers = await logic.getAnswerByQuestion(questionId);
        response.json(answers);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/answers-by-userId/:userId" , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const userId = request.params.userId;
        const answers = await logic.getAnswerUserId(userId);
        response.json(answers);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/answers/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "assets", "images", "answers", imageName);
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

router.delete("/answers/:_id", verifyAdmin , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        await logic.deleteAnswer(_id);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;