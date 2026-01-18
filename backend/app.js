import express from 'express';
import cookieParser from "cookie-parser";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173", // Vite default
    credentials: true, // IMPORTANT: allow cookies
  })
);

app.get("/", (req, res) => {
    res.send("ytbuddy api running...");
});

import authRoutes from "./routes/auth.routes.js";
import apiRoutes from "./routes/api.routes.js";

app.use("/auth", authRoutes);
app.use("/api", apiRoutes);


export default app;