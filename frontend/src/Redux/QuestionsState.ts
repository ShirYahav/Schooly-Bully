import QuestionModel from "../Models/QuestionModel";


export class QuestionsState {
    public questions: QuestionModel[] = [];
}

export enum QuestionsActionType {
    FetchQuestions = "FetchQuestions",
    AddQuestion = "AddQuestion"

}

export interface QuestionsAction {
    type: QuestionsActionType;
    payload: any;
}

export function fetchQuestionsAction(questions: QuestionModel[]): QuestionsAction {
    return { type: QuestionsActionType.FetchQuestions, payload: questions};
}

export function addQuestionAction(question:QuestionModel): QuestionsAction {
    return { type: QuestionsActionType.AddQuestion, payload: question};
}

export function questionsReducer(currentState: QuestionsState = new QuestionsState(), action: QuestionsAction): QuestionsState {
    const newState = {...currentState};

    switch(action.type) {
        case QuestionsActionType.FetchQuestions:
            newState.questions = action.payload
            break;
        
        case QuestionsActionType.AddQuestion:
            newState.questions.push(action.payload);
            break;
    }

    return newState;
}