import { google } from "googleapis";
import User from "../models/User.js";
import { oauth2Client } from "../config/googleOAuth.js";

export async function getVideoDetails(userId, videoId) {
  const user = await User.findById(userId);
  if (!user || !user.tokens) throw new Error("Not authenticated");

  oauth2Client.setCredentials(user.tokens);

  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  const res = await youtube.videos.list({
    part: "snippet,statistics",
    id: videoId,
  });

  return res.data.items[0];
}

export async function updateVideoDetails(userId, videoId, { title, description }) {
  const user = await User.findById(userId);
  if (!user || !user.tokens) throw new Error("Not authenticated");

  oauth2Client.setCredentials(user.tokens);

  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  const res = await youtube.videos.update({
    part: "snippet",
    requestBody: {
      id: videoId,
      snippet: {
        title,
        description,
        categoryId: "22", // default category
      },
    },
  });

  return res.data;
}

export async function getComments(userId, videoId) {
  const user = await User.findById(userId);
  if (!user || !user.tokens) throw new Error("Not authenticated");

  oauth2Client.setCredentials(user.tokens);

  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  const res = await youtube.commentThreads.list({
    part: "snippet,replies",
    videoId,
    maxResults: 20,
  });

  return res.data.items;
}

export async function addComment(userId, videoId, text) {
  const user = await User.findById(userId);
  if (!user || !user.tokens) throw new Error("Not authenticated");

  oauth2Client.setCredentials(user.tokens);

  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  const res = await youtube.commentThreads.insert({
    part: "snippet",
    requestBody: {
      snippet: {
        videoId,
        topLevelComment: {
          snippet: {
            textOriginal: text,
          },
        },
      },
    },
  });

  return res.data;
}

export async function replyToComment(userId, parentId, text) {
  const user = await User.findById(userId);
  if (!user || !user.tokens) throw new Error("Not authenticated");

  oauth2Client.setCredentials(user.tokens);

  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  const res = await youtube.comments.insert({
    part: "snippet",
    requestBody: {
      snippet: {
        parentId,
        textOriginal: text,
      },
    },
  });

  return res.data;
}

export async function deleteComment(userId, commentId) {
  const user = await User.findById(userId);
  if (!user || !user.tokens) throw new Error("Not authenticated");

  oauth2Client.setCredentials(user.tokens);

  const youtube = google.youtube({ version: "v3", auth: oauth2Client });

  await youtube.comments.delete({
    id: commentId,
  });

  return true;
}
