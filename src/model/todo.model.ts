import * as mongoose from "mongoose";
import ITodo from './../interfaces/todo.interface';
const uri: string = "mongodb://127.0.0.1:27017/local";

mongoose.connect(uri,{ useNewUrlParser: true }, (err: any) => {
  if (err) {
    console.log(err.message);
  } else {
    console.log("Succesfully Connected!");
  }
});

export const TodoSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true }
});

const Todo = mongoose.model<ITodo>("Todo", TodoSchema);
export default Todo;