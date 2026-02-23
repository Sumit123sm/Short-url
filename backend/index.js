// import express from 'express';
// import mongoose from 'mongoose';
// import cors from 'cors';
// import { nanoid } from 'nanoid';
// import dotenv from 'dotenv';

// dotenv.config();

// const app = express();

// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // connection to database
// mongoose.connect(process.env.DATABASE_URL)
//   .then(() => console.log("DB connected sucessfully"))
//   .catch((err) => console.log("Failed to connect to Database", err));

// const urlSchema = new mongoose.Schema({
//   originalUrl: String,
//   shortUrl: String,
//   clicks: { type: Number, default: 0 },
// });

// const Url = mongoose.model('Url', urlSchema);

// // to save db api
// app.post('/api/short', async (req, res) => {
//   try {
//     const { originalUrl } = req.body || {};
//     if (!originalUrl) return res.status(400).json({ error: "OriginalUrl required" });

//     const shortUrl = nanoid(8);
//     const url = new Url({ originalUrl, shortUrl });

//     await url.save();

//     return res.status(200).json({ message: "URL Generated", url });
//   } catch (error) {
//     console.log(error);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// app.get('/:shortUrl', async (req, res) => {
//   try {
//     const { shortUrl } = req.params;
//     const url = await Url.findOne({ shortUrl });

//     if (!url) return res.status(404).send("URL not found");

//     url.clicks++;
//     await url.save();

//     return res.redirect(url.originalUrl);
//   } catch (error) {
//     console.log(error);
//     res.status(500).send("Server error");
//   }
// });

// app.listen(3000, () => {
//   console.log("Server is running on port 3000");
// });
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { nanoid } from "nanoid";
import dotenv from "dotenv";
import QRCode from "qrcode";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// DB connection
mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("DB connected successfully"))
  .catch((err) => console.log("DB connection failed", err));

// Schema
const urlSchema = new mongoose.Schema({
  originalUrl: String,
  shortUrl: String,
  clicks: { type: Number, default: 0 },
});

const Url = mongoose.model("Url", urlSchema);

// 🔥 Create Short URL + QR Code
app.post("/api/short", async (req, res) => {
  try {
    const { originalUrl } = req.body || {};
    if (!originalUrl)
      return res.status(400).json({ error: "OriginalUrl required" });

    const shortUrl = nanoid(8);

    const url = new Url({ originalUrl, shortUrl });
    await url.save();

    const myUrl = `http://localhost:3000/${shortUrl}`;

    const qrCodeImg = await QRCode.toDataURL(myUrl);

    return res.status(200).json({
      message: "URL Generated",
      shortUrl: myUrl,
      qrCodeImg,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server error" });
  }
});

// 🔥 Redirect Route
app.get("/:shortUrl", async (req, res) => {
  try {
    const { shortUrl } = req.params;
    const url = await Url.findOne({ shortUrl });

    if (!url) return res.status(404).send("URL not found");

    url.clicks++;
    await url.save();

    return res.redirect(url.originalUrl);
  } catch (error) {
    console.log(error);
    res.status(500).send("Server error");
  }
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});