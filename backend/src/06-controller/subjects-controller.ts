import express, { NextFunction, Request, Response } from "express";
import logic from "../05-logic/subjects-logic";

const router = express.Router();

router.get("/subjects", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const subjects = await logic.getAllSubjects();
        response.json(subjects);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;