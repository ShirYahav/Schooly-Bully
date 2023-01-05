import { IQuestionModel, QuestionModel } from "../03-models/question-model";
import ErrorModel from "../03-models/error-model";


async function addQuestion(question: IQuestionModel): Promise<IQuestionModel> {
    const errors = question.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);
    return question.save();
}

async function getQuestionsByUserId(userId: string): Promise<IQuestionModel[]> {
    return QuestionModel.find({userId}).populate("subject").populate("book").exec();
}

async function getQuestionsByValues(bookId:string, page:number, questionNumber:number): Promise<IQuestionModel[]> {
    return QuestionModel.find({bookId, page, questionNumber}).exec();
}

export default {
    addQuestion,
    getQuestionsByUserId,
    getQuestionsByValues
};