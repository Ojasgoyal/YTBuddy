import dotenv from "dotenv";
dotenv.config();
import { google } from "googleapis";

const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;

// prefer explicit GOOGLE_REDIRECT_URI, fallback to BACKEND_URL + /auth/google/callback
const REDIRECT_URI =
  process.env.GOOGLE_REDIRECT_URI ||
  `${process.env.BACKEND_URL || "http://localhost:3000"}/auth/google/callback`;

export const oauth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
