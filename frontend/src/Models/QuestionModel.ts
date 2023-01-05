import BookModel from "./BookModel";
import SubjectModel from "./SubjectModel";

class QuestionModel {
    public _id: string;
    public subjectId: string;
    public bookId: string;
    public page: number;
    public questionNumber: number;
    public book: BookModel;
    public subject: SubjectModel;
}

export default QuestionModel;