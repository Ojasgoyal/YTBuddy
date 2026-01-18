import mongoose from "mongoose";

const eventLogSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    videoId: {
      type: String, // YouTube video ID
    },
    action: {
      type: String,
      required: true,
    },
    metadata: {
      type: Object,
      default: {},
    },
  },
  { timestamps: true }
);

const EventLog = mongoose.model("EventLog", eventLogSchema);
export default EventLog;
