import * as mongoose from "mongoose";
export default interface ITodo extends mongoose.Document {
    title: string;
    description: number;
}