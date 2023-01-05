import axios from "axios";
import { type } from "os";
import BookModel from "../Models/BookModel";
import QuestionModel from "../Models/QuestionModel";
import SubjectModel from "../Models/SubjectModel";
import { addQuestionAction } from "../Redux/QuestionsState";
import store from "../Redux/Store";
import config from "../Utils/Config";

class QuestionService {

    //Searching Questions
    public async getSubjects(): Promise <SubjectModel[]> {
        const response = await axios.get<SubjectModel[]>(config.subjectsUrl);
        const subjects = response.data;
        return subjects;
    }

    public async getBooksBySubjectId(subjectId: string): Promise<BookModel[]> {
        const response = await axios.get<BookModel[]>(config.booksBySubjectId + subjectId);
        const books = response.data;
        return books;
    }

    public async getBookById(bookId: string): Promise<BookModel> {
        const response = await axios.get<BookModel>(config.bookById + bookId);
        const book = response.data;
        return book;
    }

    //Is Question Exists Or not
    public async getQuestionByValues(bookId:string, page:number, questionNumber:number): Promise<QuestionModel[]> {
        const response = await axios.get<QuestionModel[]>(config.questionByValues + bookId +"/"+ page +"/" + questionNumber);
        const question = response.data;
        return question;
    }

    //Add Question
    public async addQuestion(question: QuestionModel): Promise<QuestionModel> {
        const formData = new FormData();
        formData.append("subjectId", question.subjectId);
        formData.append("bookId", question.bookId);
        formData.append("page", question.page?.toString());
        formData.append("questionNumber", question.questionNumber?.toString());

        const response = await axios.post<QuestionModel>(config.addQuestionUrl, formData);
        const addedQuestion = response.data;
        store.dispatch(addQuestionAction(addedQuestion));
        
        return addedQuestion;
    }

    public async getQuestionsByUserId(userId: string): Promise<QuestionModel[]> {
        const response = await axios.get<QuestionModel[]>(config.questionsByUserIdUrl + userId);
        const questions = response.data;
        return questions;
    }

}

const questionService = new QuestionService();

export default questionService; 