import mongoose, { Document, Schema } from 'mongoose';
import dotenv from "dotenv";
dotenv.config();

const dbUri = process.env.DB_URI;
if (!dbUri) {
  throw new Error("Database URI not valid");
}
mongoose.connect(dbUri).then(() => console.log("Connection to DB successful")).catch((error)=>console.error(error));

interface IUser extends Document {
    userName: string;
    userEmail: string;
    password: string;
}

const userSchema = new Schema<IUser>({
    userName: { type: String, required: true },
    userEmail: { type: String, required: true },
    password: { type: String, required: true }
});

const ContentSchema = new Schema({
  title: String,
  link: String,
  tags: [{type: mongoose.Types.ObjectId, ref: 'Tag'}],
  userId: {type: mongoose.Types.ObjectId, ref: 'User', require: true}
})

const LinkSchema = new Schema({
  hash: String,
  userId: {type: mongoose.Types.ObjectId, ref: 'User', require: true, unique: true}
})

export const userModel = mongoose.model<IUser>('User', userSchema);
export const ContentModel = mongoose.model("Content", ContentSchema);
export const LinkModel = mongoose.model("Link", LinkSchema);
