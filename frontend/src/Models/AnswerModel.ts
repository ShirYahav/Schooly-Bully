
class AnswerModel {
    public _id: string;
    public questionId: string;
    public textAnswer: string;
    public imageAnswer: FileList;
    public imageAnswerName: string;
    public userId: string;
    public rate: number;
}

export default AnswerModel;