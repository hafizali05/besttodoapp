import * as mongoose from 'mongoose';
import User from './../interfaces/user.interface';

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  // token: String,
});

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;