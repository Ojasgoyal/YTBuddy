import { getVideoDetails, updateVideoDetails } from "../services/youtube.service.js";

export const fetchVideo = async (req, res) => {
  try {
    const userId = req.cookies.userId;
    const { videoId } = req.params;

    const video = await getVideoDetails(userId, videoId);
    res.json(video);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch video" });
  }
};

export const updateVideo = async (req, res) => {
  try {
    const userId = req.cookies.userId;
    const { videoId } = req.params;
    const { title, description } = req.body;

    const updated = await updateVideoDetails(userId, videoId, {
      title,
      description,
    });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update video" });
  }
};
