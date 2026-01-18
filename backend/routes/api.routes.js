import express from "express";
import { fetchVideo , updateVideo } from "../controllers/video.controller.js";
import {
  fetchComments,
  createComment,
  replyComment,
  removeComment,
} from "../controllers/comment.controller.js";
import {
  getNotes,
  createNote,
  deleteNote,
} from "../controllers/note.controller.js";


const router = express.Router();

router.get("/video/:videoId", fetchVideo);
router.patch("/video/:videoId", updateVideo);

router.get("/comments/:videoId", fetchComments);
router.post("/comments/:videoId", createComment);
router.post("/comments/reply/:commentId", replyComment);
router.delete("/comments/:commentId", removeComment);

router.get("/notes/:videoId", getNotes);
router.post("/notes/:videoId", createNote);
router.delete("/notes/:noteId", deleteNote);


export default router;
