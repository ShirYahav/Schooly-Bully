import express, { NextFunction, Request, Response } from "express";
import path from "path";
import { UserModel } from "../03-models/user-model";
import logic from "../05-logic/users-logic";

const router = express.Router();

//Sorting Top 5 Rated Users
router.get("/top-rated", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const topRates = await logic.getTop5RatedUsers();
        response.json(topRates);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/users/:_id", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const _id = request.params._id;
        const user = await logic.getUserByUserId(_id);
        response.json(user);
    }
    catch (err: any) {
        next(err);
    }
});

router.put("/users/:_id" , async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body._id = request.params._id;
        request.body.image = request.files?.image;
        const user = new UserModel(request.body);
        const updatedUser = await logic.updateUser(user);
        response.json(updatedUser);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/users/images/:imageName", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const imageName = request.params.imageName;
        const absolutePath = path.join(__dirname, "..", "assets", "images", "users", imageName);
        response.sendFile(absolutePath);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;