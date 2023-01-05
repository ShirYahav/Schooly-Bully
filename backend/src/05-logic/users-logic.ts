import { IUserModel, UserModel } from "../03-models/user-model";
import ErrorModel from "../03-models/error-model";
import path from "path";
import { v4 as uuid } from "uuid";

//Sorting Top 5 Rated Users
async function getTop5RatedUsers() : Promise<IUserModel[]> {
    return UserModel.find().sort({"rate":-1}).limit(5).exec();
}

async function getUserByUserId(userId: string) : Promise<IUserModel> {
    return UserModel.findById(userId).exec();
}

async function updateUser (user: IUserModel):Promise<IUserModel> {

    if (user.image) {
        const extension = user.image.name.substring(user.image.name.lastIndexOf("."));
        user.imageName = uuid() + extension;
        await user.image.mv(path.join(__dirname, ".." , "assets", "images", "users", user.imageName));
        delete user.image;
    }

    const updatedUser = await UserModel.findByIdAndUpdate(user._id, user, { returnOriginal: false }).exec(); 
    if (!updatedUser) throw new ErrorModel(404, `_id ${user._id} not found`);

    return updatedUser;
}

export default {
    getTop5RatedUsers,
    getUserByUserId,
    updateUser
};