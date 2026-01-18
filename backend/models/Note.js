import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    videoId: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    tags: [
      {
        type: String,
      },
    ],
  },
  { timestamps: true }
);

noteSchema.index({ userId: 1, videoId: 1 });
noteSchema.index({ tags: 1 });
noteSchema.index({ content: "text" });

export default mongoose.model("Note", noteSchema);
