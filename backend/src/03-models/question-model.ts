import { Document, model, Schema } from "mongoose";
import { BookModel } from "./book-model";
import { SubjectModel } from "./subject-model";

export interface IQuestionModel extends Document {
    subjectId: Schema.Types.ObjectId;
    bookId: Schema.Types.ObjectId;
    page: number;
    questionNumber: number;
    userId: Schema.Types.ObjectId;
}

const QuestionSchema = new Schema<IQuestionModel> ({
    subjectId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    bookId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    page: {
        type: Number,
        required: true
    },
    questionNumber: {
        type: Number,
        required: true
    },

    userId: Schema.Types.ObjectId,
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

QuestionSchema.virtual('subject', {
    ref: SubjectModel,
    localField:'subjectId',
    foreignField:'_id',
    justOne:true
})

QuestionSchema.virtual('book', {
    ref: BookModel,
    localField:'bookId',
    foreignField:'_id',
    justOne:true
})

export const QuestionModel = model<IQuestionModel>("QuestionModel", QuestionSchema, "questions");
