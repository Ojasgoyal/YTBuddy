import Note from "../models/Note.js";

export const getNotes = async (req, res) => {
  try {
    const userId = req.cookies.userId;
    const { videoId } = req.params;
    const { q } = req.query;

    let filter = { userId, videoId };

    if (q) {
      filter.$or = [
        { content: new RegExp(q, "i") },
        { tags: new RegExp(q, "i") },
      ];
    }

    const notes = await Note.find(filter).sort({ createdAt: -1 });
    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
};

export const createNote = async (req, res) => {
  try {
    const userId = req.cookies.userId;
    const { videoId } = req.params;
    const { content, tags } = req.body;

    const note = await Note.create({
      userId,
      videoId,
      content,
      tags,
    });

    res.json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create note" });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const userId = req.cookies.userId;
    const { noteId } = req.params;

    await Note.deleteOne({ _id: noteId, userId });
    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete note" });
  }
};
