import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { userModel } from "./db";

const app = express();
app.use(express.json());

app.post("/api/v1/signin", async(req, res)=>{
    const {userName, password} = req.body;
    await userModel.create({userName, password});
    res.json({
        msg: "User Created Successfully"
    })
});

app.post("/api/v1/signup", (req, res)=>{

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
