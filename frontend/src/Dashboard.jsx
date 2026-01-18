import { useEffect, useState } from "react";
import axios from "axios";
import VideoInput from "./components/VideoInput";
import { extractVideoId } from "./lib/extractVideoId";
import { Button } from "@/components/ui/button";
import CommentsSection from "./components/CommentsSection";

function Dashboard() {
  const [video, setVideo] = useState(null);
  const [saving, setSaving] = useState(false);

  const handleLoadVideo = async (url) => {
    const videoId = extractVideoId(url);
    if (!videoId) return alert("Invalid URL");

    const res = await axios.get(`/api/video/${videoId}`);
    setVideo(res.data);
    localStorage.setItem("currentVideoId", videoId);
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const res = await axios.patch(`/api/video/${video.id}`, {
        title: video.snippet.title,
        description: video.snippet.description,
      });

      setVideo(res.data);
      alert("Updated successfully");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    } finally {
      setSaving(false);
    }
  };

  const handleRemoveVideo = () => {
    setVideo(null);
    localStorage.removeItem("currentVideoId");
  };

  useEffect(() => {
    const savedVideoId = localStorage.getItem("currentVideoId");
    if (!savedVideoId) return;

    const restoreVideo = async () => {
      try {
        const res = await axios.get(`/api/video/${savedVideoId}`);
        setVideo(res.data);
      } catch (err) {
        console.error(err);
        localStorage.removeItem("currentVideoId");
      }
    };

    restoreVideo();
  }, []);

  return (
    <div className="space-y-8">
      <VideoInput onSubmit={handleLoadVideo} />

    <div className="flex gap-8 w-full">
      {/* fix the above div classname such that both the video and comment section are properly aligned and have full width */}
      {video && (
        <div className="border rounded-xl p-6 shadow-sm space-y-5 w-1/2">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-lg font-semibold">Video Details</h2>
              <p className="text-sm text-muted-foreground">
                Edit your video title and description
              </p>
            </div>

            <Button variant="ghost" onClick={handleRemoveVideo}>
              Remove
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Title</label>
            <input
              className="w-full bg-transparent outline-none border rounded-md px-3 py-2"
              value={video.snippet.title}
              onChange={(e) =>
                setVideo({
                  ...video,
                  snippet: { ...video.snippet, title: e.target.value },
                })
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Description</label>
            <textarea
              className="w-full resize-none bg-transparent outline-none border rounded-md px-3 py-2 text-sm"
              rows={5}
              value={video.snippet.description}
              onChange={(e) =>
                setVideo({
                  ...video,
                  snippet: {
                    ...video.snippet,
                    description: e.target.value,
                  },
                })
              }
            />
          </div>

          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={saving}>
              {saving ? "Saving..." : "Save changes"}
            </Button>
          </div>
        </div>
      )}

      {video && <CommentsSection videoId={video.id} className="w-1/2" />}
      </div>
    </div>
  );
}

export default Dashboard;
