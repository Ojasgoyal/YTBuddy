import { oauth2Client } from "../config/googleOAuth.js";
import { google } from "googleapis";
import User from "../models/User.js";

export const googleAuth = (req, res) => {
  const scopes = [
    "https://www.googleapis.com/auth/youtube.force-ssl",
    "https://www.googleapis.com/auth/userinfo.email",
    "https://www.googleapis.com/auth/userinfo.profile",
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: "offline", // IMPORTANT: gives refresh token
    prompt: "consent", // ensures refresh token on re-login
    scope: scopes,
  });

  res.redirect(url);
};

export const googleCallback = async (req, res) => {
  try {
    const { code } = req.query;

    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({
      auth: oauth2Client,
      version: "v2",
    });

    const { data } = await oauth2.userinfo.get();

    let user = await User.findOne({ email: data.email });

    if (!user) {
      user = await User.create({
        googleId: data.id,
        email: data.email,
        name: data.name,
        tokens,
      });
    } else {
      user.tokens = tokens;
      await user.save();
    }

    // Set cookie
    res.cookie("userId", user._id.toString(), {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    });

    res.redirect("http://localhost:5173"); // Vite default
  } catch (err) {
    console.error(err);
    res.status(500).send("OAuth failed");
  }
};

export const authStatus = async (req, res) => {
  const userId = req.cookies.userId;

  if (!userId) {
    return res.json({ connected: false });
  }

  const user = await User.findById(userId).select("email name");
  if (!user) {
    return res.json({ connected: false });
  }

  res.json({ connected: true, user });
};
