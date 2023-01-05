import axios from "axios";
import BookModel from "../Models/BookModel";
import config from "../Utils/Config";

class BooksService {

    public async addNewBook(book: BookModel): Promise<BookModel> {
        const formData = new FormData();
        formData.append("subjectId", book.subjectId);
        formData.append("name", book.name);
        formData.append("pages", book.pages?.toString());

        const response = await axios.post<BookModel>(config.booksUrl, formData);
        const addedBook = response.data;
        return addedBook
    }
}

const booksService = new BooksService();

export default booksService;