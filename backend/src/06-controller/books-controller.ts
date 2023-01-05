import express, { NextFunction, Request, Response } from "express";
import verifyAdmin from "../02-middleware/verify-admin";
import { BookModel } from "../03-models/book-model";
import logic from "../05-logic/books-logic";

const router = express.Router();

router.get("/books" , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const books = await logic.getAllBooks();
        response.json(books);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/books-by-subject/:subjectId" , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const subjectId = request.params.subjectId;
        const books = await logic.getBooksBySubject(subjectId);
        response.json(books);
    }
    catch (err: any) {
        next(err);
    }
});

router.get("/book-by-id/:bookId" , async (request: Request, response: Response, next: NextFunction) => {
    try {
        const bookId = request.params.bookId;
        const book = await logic.getBookById(bookId);
        response.json(book);
    }
    catch (err: any) {
        next(err);
    }
});


router.post("/books" , verifyAdmin, async (request: Request, response: Response, next: NextFunction) => {
    try {
        //request.body.image = request.files?.image;
        const item = new BookModel(request.body);
        const addedBook = await logic.addBook(item);
        response.status(201).json(addedBook);
    }
    catch (err: any) {
        next(err);
    }
});




export default router;