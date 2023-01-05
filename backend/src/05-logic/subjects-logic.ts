import { BookModel, IBookModel } from "../03-models/book-model";
import { SubjectModel, ISubjectModel } from "../03-models/subject-model";

async function getAllSubjects(): Promise<ISubjectModel[]> {
    return SubjectModel.find().sort({"subject":1}).exec();
}

async function getBooksBySubject(subjectId: string): Promise<IBookModel[]> {
    return BookModel.find({ subjectId }).populate("subject").sort({"subject":1}).exec();
}

export default {
    getAllSubjects,
    getBooksBySubject
};