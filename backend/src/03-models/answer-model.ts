import { Document, model, Schema } from "mongoose";
import { UploadedFile } from 'express-fileupload';
import { QuestionModel } from "./question-model";
import { UserModel } from "./user-model";

export interface IAnswerModel extends Document {
    questionId: Schema.Types.ObjectId;
    textAnswer: string;
    imageAnswer: UploadedFile;
    imageAnswerName: string;
    userId: Schema.Types.ObjectId;
    rate: number;
}

const AnswerSchema = new Schema<IAnswerModel> ({
    questionId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    textAnswer: {
        type: String,
        required: [true, "Missing Answer"],
        minlength: [1, "Answer is too short"],
        match: [/.*[^ ].*/, "Invalid Answer"],
    },
    imageAnswer: {
        type: Object
    },
    imageAnswerName:{
        type: String,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    rate: {
        type:Number
    }
}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

AnswerSchema.virtual('question', {
    ref: QuestionModel,
    localField:'questionId',
    foreignField:'_id',
    justOne:true
})

AnswerSchema.virtual('user', {
    ref: UserModel,
    localField:'userId',
    foreignField:'_id',
    justOne:true
})

export const AnswerModel = model<IAnswerModel>("AnswerModel", AnswerSchema, "answers");
