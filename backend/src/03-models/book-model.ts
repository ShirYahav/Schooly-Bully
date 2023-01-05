import { Document, model, Schema } from "mongoose";
import { SubjectModel } from "./subject-model";

export interface IBookModel extends Document {
    name: string;
    pages: number;
    subjectId: Schema.Types.ObjectId;
}

const BookSchema = new Schema<IBookModel> ({
    name:{
        type: String,
        required: [true, "Missing Book Name"],
        minlength: [3, "Name too short"],
        maxlength: [50, "Name too long"],
        trim: true,
        unique: true
    },
    pages :{
        type: Number,
        min: 0
    },
    subjectId: Schema.Types.ObjectId,

}, {
    versionKey: false,
    toJSON: { virtuals: true },
    id: false
});

BookSchema.virtual('subject', {
    ref: SubjectModel,
    localField:'subjectId',
    foreignField:'_id',
    justOne:true
})

export const BookModel = model<IBookModel>("BookModel", BookSchema, "books");