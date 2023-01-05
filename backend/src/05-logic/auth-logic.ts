import cyber from "../01-utils/cyber";
import { ICredentialsModel } from "../03-models/credentials-model";
import { UserModel, IUserModel } from "../03-models/user-model";
import ErrorModel from "../03-models/error-model";
import RoleModel from "../03-models/role-model";


async function register(user: IUserModel): Promise<string> {

    const errors = user.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);


    const isTaken = await isEmailTaken(user);
    if (isTaken) {
        throw new ErrorModel(400, `email ${user.email} already taken`);

    }

    user.password = cyber.hash(user.password);

    user.rate = 0;

    user.role = RoleModel.User;

    user.save();

    delete user.password;

    const token = cyber.getNewToken(user);

    return token;
}

async function login(credentials: ICredentialsModel): Promise<string> {

    const errors = credentials.validateSync();
    if (errors) throw new ErrorModel(400, errors.message);

    credentials.password = cyber.hash(credentials.password);

    const existingUser = await UserModel.findOne({ email: credentials.email, password: credentials.password}).exec();

    if(!existingUser) {
        throw new ErrorModel(401, "Incorrect email or password");
    }

    delete existingUser.password;

    const token = cyber.getNewToken(existingUser);

    return token;
}

async function isEmailTaken(user: IUserModel): Promise<boolean> {
    user = await UserModel.findOne({email: user.email})
    if(!user){
        return false;
    }
    return true
}

export default {
    register,
    login,
    isEmailTaken,
}
