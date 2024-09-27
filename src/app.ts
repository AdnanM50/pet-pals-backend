import express, { Application } from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/auth.route";

dotenv.config();

const app: Application = express();

app.use(express.json());

// app.use("/api/users", userRoutes);
app.use("/api/auth", userRoutes);
export default app;
