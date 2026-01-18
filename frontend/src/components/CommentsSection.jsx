import { useEffect, useState } from "react";
import axios from "../axios.js";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";

export default function CommentsSection({ videoId }) {
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);
  const [replyingTo, setReplyingTo] = useState(null);
  const [replyText, setReplyText] = useState("");

  const loadComments = async () => {
    const res = await axios.get(`/api/comments/${videoId}`);
    const payload = res.data;
    // normalize common response shapes: array | { items: [...] } | { comments: [...] }
    const list = Array.isArray(payload) ? payload : payload.items ?? payload.comments ?? [];
    setComments(list);
  };

  useEffect(() => {
    if (!videoId) return;
    loadComments();
  }, [videoId]);

  const handleAddComment = async () => {
    if (!text.trim()) return;

    try {
      setPosting(true);
      const res = await axios.post(`/api/comments/${videoId}`, { text });
      setComments((prev) => [res.data, ...prev]);
      setText("");
    } catch (err) {
      console.error(err);
      alert("Failed to post comment");
    } finally {
      setPosting(false);
    }
  };

  const handleReply = async (parentId) => {
    if (!replyText.trim()) return;

    try {
      const res = await axios.post(`/api/comments/reply/${parentId}`, {
        text: replyText,
      });

      setComments((prev) =>
        prev.map((c) =>
          c.id === parentId
            ? {
                ...c,
                replies: {
                  comments: [
                    ...(c.replies?.comments || []),
                    res.data,
                  ],
                },
              }
            : c
        )
      );

      setReplyText("");
      setReplyingTo(null);
    } catch (err) {
      console.error(err);
      alert("Failed to reply");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/api/comments/${id}`);
      setComments((prev) => prev.filter((c) => c.id !== id));
    } catch (err) {
      console.error(err);
      alert("Failed to delete comment");
    }
  };

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold">Comments</h3>

      <div className="space-y-2">
        <Textarea
          placeholder="Add a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <div className="flex justify-end">
          <Button onClick={handleAddComment} disabled={posting}>
            {posting ? "Posting..." : "Post"}
          </Button>
        </div>
      </div>

      <div className="space-y-6">
        {Array.isArray(comments) && comments.map((c) => {
          const top = c.snippet.topLevelComment.snippet;

          return (
            <div key={c.id} className="space-y-2">
              <div className="border rounded p-3 space-y-1">
                <p className="text-sm font-medium">
                  {top.authorDisplayName}
                </p>

                <p
                  className="text-sm"
                  dangerouslySetInnerHTML={{
                    __html: top.textDisplay,
                  }}
                />

                <div className="flex gap-2 text-xs text-muted-foreground">
                  <button onClick={() => setReplyingTo(c.id)}>
                    Reply
                  </button>
                  <button onClick={() => handleDelete(c.id)}>
                    Delete
                  </button>
                </div>
              </div>

              {/* Replies */}
              <div className="pl-6 space-y-2">
                {c.replies?.comments?.map((r) => (
                  <div key={r.id} className="border rounded p-2">
                    <p className="text-xs font-medium">
                      {r.snippet.authorDisplayName}
                    </p>
                    <p
                      className="text-xs"
                      dangerouslySetInnerHTML={{
                        __html: r.snippet.textDisplay,
                      }}
                    />
                  </div>
                ))}

                {replyingTo === c.id && (
                  <div className="space-y-2">
                    <Textarea
                      placeholder="Write a reply..."
                      value={replyText}
                      onChange={(e) =>
                        setReplyText(e.target.value)
                      }
                    />
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => handleReply(c.id)}
                      >
                        Reply
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => setReplyingTo(null)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
