import express, { Application, Response, Request } from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import personRouter from "./routes/personRoutes";
import localesRouter from "./routes/localesRoutes"

import prisma from "./database";
import fs from 'fs';
import csv from 'csv-parser';

// Load environment variables from .env file
dotenv.config();

const app: Application = express();

// Middleware morgan dev
app.use(morgan("dev"));

// Middleware to parse JSON bodies
app.use(bodyParser.json({ limit: "1mb" }));

// Use cors middleware
app.use(cors());

// Use routers
app.use("/api/persons", personRouter);
app.use("/api/locales", localesRouter);

// Start the server
app.listen(3001, () => {
    console.log(`connected successfully on port 3001`);
});