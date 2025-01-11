import mongoose, { model, Schema } from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const dbUri = process.env.DB_URI;
if (!dbUri) {
  throw new Error("Database URI not valid");
}
mongoose.connect(dbUri).then(() => console.log("Connection to DB successful")).catch((error)=>console.error(error));

const userSchema = new Schema({
  userEmail:{
    type: String,
    require: true
  },
  userName: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  }  
});

export const userModel = model("Users", userSchema);
