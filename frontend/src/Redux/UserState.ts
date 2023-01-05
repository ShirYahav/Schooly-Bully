import UserModel from "../Models/UserModel";

export class UsersState {
    public users: UserModel[] = [];
}

export enum UsersActionType {
    fetchTop5RatedUsers = "FetchTop5RatedUsers",
}

export interface UsersAction {
    type: UsersActionType;
    payload: any;
}

export function fetchTop5RatedUsersAction(users: UserModel[]): UsersAction {
    return { type: UsersActionType.fetchTop5RatedUsers, payload: users};
}


export function usersReducer(currentState: UsersState = new UsersState(), action: UsersAction): UsersState {
    const newState = { ...currentState };

    switch (action.type) {

        case UsersActionType.fetchTop5RatedUsers:
            newState.users = action.payload
            break;

    }
    return newState;
}