import express from "express";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { ContentModel, LinkModel, userModel } from "./database/model";
import { comparePassword, hashPassword, random } from "./utils/helpers";
import dotenv from "dotenv";
import { userMiddleware } from "./middleware/middleware";
import cors from "cors";
import path from 'path';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("Your server is up and running well !");
});

app.post("/api/v1/signup", async (req, res) => {
  const { userName, userEmail } = req.body;

  const existingUser = await userModel.findOne({userEmail});
  if (existingUser) {
    res.status(409).json({
      msg:"User already exists. Please use a different email."
    })
    return;
  }

  const password = hashPassword(req.body.password);
  await userModel.create({ userEmail, userName, password });
  res.json({
    msg: "User Created Successfully",
  });
});

app.post("/api/v1/signin", async (req, res) => {
  const { userName, password } = req.body;
  // in user the complete detail of the user will be returned.
  const user = await userModel.findOne({ userName });
  if (!user) {
    res.status(401).json({
      msg: "Invalid Credentials",
    });
    return;
  }
  const isPasswordValid = comparePassword(password, user.password);
  if (!isPasswordValid) {
    res.status(401).json({
      msg: "Incorrect Password",
    });
    return;
  }

  const token = jwt.sign(
    { id: user._id, userName: user.userName },
    process.env.JWT_SECRET as string,
    { expiresIn: "1d" }
  );

  res.json({
    msg: "SignIn Successful",
    user,
    token,
  });
});

app.post("/api/v1/content", userMiddleware, async (req, res) => {
  const link = req.body.link;
  const type = req.body.type;
  const title = req.body.title;
  await ContentModel.create({
    link,
    type,
    title,
    // @ts-ignore
    userId: req.userId,
    tags: [],
  });
  res.json({
    msg: "Content added",
  });
});

app.get("/api/v1/content", userMiddleware, async (req, res) => {
  try {
    // @ts-ignore
    const userId = req.userId;

    // Extract query parameters
    const { title, link } = req.query;

    // Build the query object
    const query = { userId }; // Always filter by userId
    // @ts-ignore
    if (title) query.title = title; // Add title filter if provided
    // @ts-ignore
    if (link) query.link = link; // Add link filter if provided

    // Fetch content based on the query
    const content = await ContentModel.find(query).populate("userId", "userName");

    res.json({ content });
  } catch (error) {
    console.error("Error fetching content:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.delete("/api/v1/content", userMiddleware, async (req, res) => {
  const contentId = req.body.contentId;
  // @ts-ignore
  const userId = req.userId;
  await ContentModel.deleteMany({
    _id: contentId,
    userId,
  });
  const remainingContent = await ContentModel.find({
    userId,
  }).populate("userId", "userName");
  res.json({
    msg: "Content Deleted Successfully",
    remainingContent,
  });
});

app.post("/api/v1/brain/share", userMiddleware, async (req, res) => {
  const { share } = req.body;
  if (share) {
    const existingLink = await LinkModel.findOne({
      // @ts-ignore
      userId: req.userId,
    });
    if (existingLink) {
      res.json({
        msg: "/brain/" + existingLink.hash,
      });
      return;
    }
    const hash = random(10);
    await LinkModel.create({
      // @ts-ignore
      userId: req.userId,
      hash: hash,
    });
    res.json({
      msg: "/brain/" + hash,
    });
  } else {
    await LinkModel.deleteOne({
      // @ts-ignore
      userId: req.userId,
    });

    res.json({
      msg: "Removed Shareable link!",
    });
  }
});

app.get("/api/v1/brain/:shareLink", async (req, res) => {
  const hash = req.params.shareLink;
  const link = await LinkModel.findOne({
    hash,
  });
  if (!link) {
    res.status(411).json({
      msg: "sorry invalid link",
    });
    return;
  }
  const content = await ContentModel.find({
    userId: link.userId,
  });
  const user = await userModel.findOne({
    _id: link.userId,
  });
  res.json({
    userName: user?.userName,
    content: content,
  });
});

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '../../sb-client/dist')));

// The "catch all" handler: for any request that doesn't
// match one above, send back React's index.html file.
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../../sb-client/dist/index.html'));
});

app.listen(PORT, () => {
  console.log(`Site is hosted on localhost: ${PORT}`);
});
