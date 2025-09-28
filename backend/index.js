//step-1
// const express = require("express");
import express from "express";
import dotenv from "dotenv";
import databaseConnection from "./utils/database.js";
import cookieParser from "cookie-parser";
import userRoute from "./routes/userRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

databaseConnection();

dotenv.config({
    path:".env"
})

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
//middlewares 
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
const corsOptions = {
    origin:'http://localhost:3000',
    credentials:true
}
app.use(cors(corsOptions));

 
// api
app.use("/api/v1/user", userRoute);

app.use(express.static(path.join(__dirname, "..", "netflix", "build")));

// Handle React routing, return all requests to React's index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "netflix", "build", "index.html"));
});

app.listen(process.env.PORT,() => {
    console.log(`Server listen at port ${process.env.PORT}`);
});
