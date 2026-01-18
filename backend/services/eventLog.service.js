import EventLog from "../models/EventLog.js";

export async function logEvent({ userId, videoId, action, metadata = {} }) {
  try {
    await EventLog.create({
      userId,
      videoId,
      action,
      metadata,
    });
  } catch (err) {
    console.error("Failed to log event:", err);
  }
}
