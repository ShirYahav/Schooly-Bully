import AnswerModel from "../Models/AnswerModel";


export class AnswersState { 
    public answers: AnswerModel[] =[];
}

export enum AnswersActionType {
    GetAnswersByQuestionId = "GetAnswersByQuestionId",
    AddAnswer = "AddAnswer",
    DeleteAnswer = "DeleteAnswer"
}

export interface AnswersAction {
    type: AnswersActionType;
    payload: any;
}

export function getAnswersByQuestionIdAction(answers: AnswerModel[]): AnswersAction {
    return { type: AnswersActionType.GetAnswersByQuestionId, payload: answers};
}

export function addAnswerAction(answer: AnswerModel): AnswersAction {
    return { type: AnswersActionType.AddAnswer, payload: answer};
}

export function deleteAnswerAction(id: string): AnswersAction {
    return { type: AnswersActionType.DeleteAnswer, payload:id };
}

export function answersReducer(currentState: AnswersState = new AnswersState(), action: AnswersAction): AnswersState {
    const newState = {...currentState};

    switch(action.type) {

        case AnswersActionType.GetAnswersByQuestionId:
            newState.answers = action.payload
            break;

        case AnswersActionType.AddAnswer:
            newState.answers.push(action.payload);
            break;

        case AnswersActionType.DeleteAnswer:
            const indexToDelete = newState.answers.findIndex(a => a._id === action.payload);
            if (indexToDelete >= 0) {
                newState.answers.splice(indexToDelete, 1);
            }
            break;
    }

    return newState;
}