import { AnswerModel, IAnswerModel } from "../03-models/answer-model";
import ErrorModel from "../03-models/error-model";
import path from "path";
import { v4 as uuid } from "uuid";

async function addAnswer(answer: IAnswerModel): Promise<IAnswerModel> {
    const errors = answer.validateSync();

    // if (answer.imageAnswer && answer.imageAnswer !== null) {
    //     const extension = answer.imageAnswer.name.substring(answer.imageAnswer.name.lastIndexOf("."));
    //     answer.imageAnswerName = uuid() + extension;
    //     await answer.imageAnswer.mv(path.join(__dirname, ".." , "assets", "images", "answers", answer.imageAnswerName));
    //     delete answer.imageAnswer;
    // }

    if (errors) throw new ErrorModel(400, errors.message);
    return answer.save();
}

async function getAnswerByQuestion(questionId: string): Promise<IAnswerModel[]> {
    return AnswerModel.find({questionId}).populate("question").exec();
}

async function getAnswerUserId(userId: string): Promise<IAnswerModel[]> {
    return AnswerModel.find({userId}).populate("question").populate("user").exec();
}

async function deleteAnswer(_id: string): Promise<void> {
    const deletedAnswer = await AnswerModel.findByIdAndDelete(_id).exec();
    if (!deletedAnswer) throw new ErrorModel(404, `_id ${_id} not found`);
}

export default {
    addAnswer,
    getAnswerByQuestion,
    getAnswerUserId,
    deleteAnswer
};