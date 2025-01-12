import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { userModel } from "./database/model";
import { comparePassword, hashPassword } from "./utils/helpers";

const app = express();
app.use(express.json());
const PORT = 3000;

app.get("/", (req,res)=>{
    res.send("Your server is up and running well !")
})

app.post("/api/v1/signup", async(req, res)=>{
    const {userName, userEmail} = req.body;
    const password = hashPassword(req.body.password);
    await userModel.create({userEmail, userName, password});
    res.json({
        msg: "User Created Successfully"
    })
});

app.post("/api/v1/signin", async (req, res)=>{
    const { userName, password } = req.body;
    // in user the complete detail of the user will be returned.
    const user = await userModel.findOne({userName});
    if (!user) {
        res.status(401).json({
            msg:"Invalid userName"
        });
        return;
    }
    const isPasswordValid = comparePassword(password, user.password);
    if (!isPasswordValid) {
        res.status(401).json({
            msg:"Incorrect Password"
        })
    }
    
    res.json({
        msg:"SignIn Successful",
        user
    })
});

app.post("/api/v1/content", (req, res)=>{

});

app.get("/api/v1/content", (req, res)=>{

});

app.delete("/api/v1/content", (req, res)=>{

});

app.post("/api/v1/brain/share", (req, res)=>{

});

app.post("/api/v1/brain/:share", (req, res)=>{

});

app.listen(PORT, ()=>{
    console.log(`Site is hosted on localhost: ${PORT}`)
})
