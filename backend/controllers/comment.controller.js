import {
  getComments,
  addComment,
  replyToComment,
  deleteComment,
} from "../services/youtube.service.js";
import { logEvent } from "../services/eventLog.service.js";

export const fetchComments = async (req, res) => {
  try {
    const userId = req.cookies.userId;
    const { videoId } = req.params;

    const comments = await getComments(userId, videoId);
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
};

export const createComment = async (req, res) => {
  try {
    const userId = req.cookies.userId;
    const { videoId } = req.params;
    const { text } = req.body;

    const comment = await addComment(userId, videoId, text);
    await logEvent({
      userId,
      videoId,
      action: "COMMENT_ADDED",
      metadata: {
        commentId: comment._id,
      },
    });

    res.json(comment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add comment" });
  }
};

export const replyComment = async (req, res) => {
  try {
    const userId = req.cookies.userId;
    const { commentId } = req.params;
    const { text } = req.body;

    const reply = await replyToComment(userId, commentId, text);
    res.json(reply);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to reply" });
  }
};

export const removeComment = async (req, res) => {
  try {
    const userId = req.cookies.userId;
    const { commentId } = req.params;

    await deleteComment(userId, commentId);
    await logEvent({
      userId,
      action: "COMMENT_DELETED",
      metadata: {
        commentId,
      },
    });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete" });
  }
};
