import {
  getVideoDetails,
  updateVideoDetails,
} from "../services/youtube.service.js";
import { logEvent } from "../services/eventLog.service.js"

export const fetchVideo = async (req, res) => {
  try {
    const userId = req.cookies.userId;
    const { videoId } = req.params;

    const video = await getVideoDetails(userId, videoId);

    await logEvent({
      userId,
      videoId,
      action: "VIDEO_FETCHED",
    });

    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    res.setHeader("CDN-Cache-Control", "no-store");
    res.setHeader("Vercel-CDN-Cache-Control", "no-store");

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

    await logEvent({
      userId,
      videoId,
      action: "VIDEO_UPDATED",
      metadata: {
        title,
        description,
      },
    });

    res.setHeader(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, proxy-revalidate",
    );
    res.setHeader("Pragma", "no-cache");
    res.setHeader("Expires", "0");
    res.setHeader("Surrogate-Control", "no-store");
    res.setHeader("CDN-Cache-Control", "no-store");
    res.setHeader("Vercel-CDN-Cache-Control", "no-store");

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to update video" });
  }
};
