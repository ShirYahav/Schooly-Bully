
class UserModel {
    public _id: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public password: string;
    public phoneNumber:string;
    public rate: number;
    public image: FileList;
    public imageName: string;
    public role: string;
}

export default UserModel;