import axios from "axios";
import AnswerModel from "../Models/AnswerModel";
import { addAnswerAction, deleteAnswerAction, getAnswersByQuestionIdAction } from "../Redux/AnswersState";
import store from "../Redux/Store";
import config from "../Utils/Config";

class AnswersService {

    public async getAnswersByQuestionId(questionId: string): Promise<AnswerModel[]> {
        const response = await axios.get<AnswerModel[]>(config.answerByQuestionIdUrl + questionId);
        const answers = response.data;
        store.dispatch(getAnswersByQuestionIdAction(answers))
        return answers;
    }

    public async getAnswersByUserId(userId: string): Promise<AnswerModel[]> {
        const response = await axios.get<AnswerModel[]>(config.answersByUserIdUrl + userId);
        const answers = response.data;
        return answers;
    }

    public async addNewAnswer(answer: AnswerModel): Promise<AnswerModel> {
        const formData = new FormData();
        formData.append("textAnswer", answer.textAnswer);
        formData.append("imageAnswer", answer.imageAnswer.item(0));
        formData.append("questionId", answer.questionId);

        const response = await axios.post<AnswerModel>(config.addAnswerUrl, formData);
        const addedAnswer = response.data;
        store.dispatch(addAnswerAction(addedAnswer));

        return addedAnswer;
    }

    public async deleteOneAnswer(id: string): Promise<void> {
        await axios.delete(config.deleteAnswerUrl + id);
        store.dispatch(deleteAnswerAction(id));
    }
}

const answersService = new AnswersService();

export default answersService; 