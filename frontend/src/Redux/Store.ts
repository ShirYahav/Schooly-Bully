import { combineReducers, createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import { answersReducer } from "./AnswersState";
import { authReducer } from "./AuthState";
import { questionsReducer } from "./QuestionsState";
import { usersReducer } from "./UserState";

const reducers = combineReducers({ authState: authReducer, usersState: usersReducer, questionsState: questionsReducer, answersState: answersReducer });
const store = createStore(reducers, composeWithDevTools());

export default store;