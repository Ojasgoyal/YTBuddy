import express from "express";
import { authStatus, googleAuth, googleCallback } from "../controllers/auth.controller.js";

const router = express.Router();

router.get("/google", googleAuth);
router.get("/google/callback", googleCallback);
router.get("/status", authStatus);


export default router;
