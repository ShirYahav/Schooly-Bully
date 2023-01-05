import { BookModel, IBookModel } from "../03-models/book-model";
import ErrorModel from "../03-models/error-model";

async function getAllBooks(): Promise<IBookModel[]> {
    return BookModel.find().sort({"name":1}).exec();
}

async function getBooksBySubject(subjectId: string): Promise<IBookModel[]> {
    return BookModel.find({ subjectId }).populate('subject').sort({"name":1}).exec();
}

async function getBookById(bookId: string): Promise<IBookModel> {
    return BookModel.findById( bookId ).exec();
}

async function addBook(book: IBookModel): Promise<IBookModel> {
    const errors = book.validateSync();

    //option to add an image
    // if (book.image) {
    //     const extension = book.image.name.substring(book.image.name.lastIndexOf("."));
    //     book.imageName = uuid() + extension;
    //     await book.image.mv(path.join(__dirname, ".." , "assets", "images", "books", book.imageName));
    //     delete book.image;
    // }
    
    if (errors) throw new ErrorModel(400, errors.message);
    return book.save();
}

export default {
    getAllBooks,
    getBooksBySubject,
    getBookById,
    addBook
};