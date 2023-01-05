import { Document, model, Schema } from "mongoose";

export interface ISubjectModel extends Document {
    subject: string;
}

const SubjectSchema = new Schema<ISubjectModel> ({
    subject:{
        type: String,
        required: [true, "Missing Subject"],
        minlength: [3, "Subject too short"],
        maxlength: [20, "Subject too long"],
        trim: true,
        unique: true
    }
}, {
    versionKey: false
});

export const SubjectModel = model<ISubjectModel>("SubjectModel", SubjectSchema, "subjects");