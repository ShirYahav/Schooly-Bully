import axios from "axios";
import UserModel from "../Models/UserModel";
import store from "../Redux/Store";
import { fetchTop5RatedUsersAction } from "../Redux/UserState";
import config from "../Utils/Config";

class UsersService {

    public async fetchTop5RatedUsers(): Promise<UserModel[]> {
        if(store.getState().usersState.users.length === 0) {
           const response = await axios.get<UserModel[]>(config.topRatedUsers); 
           const users = response.data;
           store.dispatch(fetchTop5RatedUsersAction(users));
        }
        return store.getState().usersState.users;
    }

    public async getUserById(userId: string): Promise<UserModel> {
        const response = await axios.get<UserModel>(config.userByIdUrl + userId);
        const user = response.data;
        return user; 
    }
}

const usersService = new UsersService();

export default usersService