import { useEffect, useState } from "react";
import axios from "../axios.js";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

export default function NotesSection({ videoId }) {
  const [notes, setNotes] = useState([]);
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [query, setQuery] = useState("");

  const loadNotes = async (q = "") => {
    const res = await axios.get(`/api/notes/${videoId}?q=${q}`);
    setNotes(res.data);
  };

  useEffect(() => {
    if (!videoId) return;
    loadNotes();
  }, [videoId]);

  const handleCreate = async () => {
    if (!content.trim()) return;

    const res = await axios.post(`/api/notes/${videoId}`, {
      content,
      tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
    });

    setNotes((prev) => [res.data, ...prev]);
    setContent("");
    setTags("");
  };

  const handleDelete = async (id) => {
    await axios.delete(`/api/notes/${id}`);
    setNotes((prev) => prev.filter((n) => n._id !== id));
  };

  const handleSearch = async (e) => {
    const q = e.target.value;
    setQuery(q);
    loadNotes(q);
  };

  return (
    <Card className="p-6 space-y-4">
      <h3 className="text-lg font-semibold">Notes</h3>

      <div className="space-y-2">
        <Textarea
          placeholder="Write a note..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Input
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
        <Button onClick={handleCreate}>Add Note</Button>
      </div>

      <Input
        placeholder="Search notes..."
        value={query}
        onChange={handleSearch}
      />

      <div className="space-y-3">
        {notes.map((n) => (
          <div key={n._id} className="border rounded p-3 space-y-1">
            <p className="text-sm">{n.content}</p>

            <div className="flex gap-2 flex-wrap">
              {n.tags.map((t) => (
                <span
                  key={t}
                  className="text-xs bg-muted px-2 py-0.5 rounded"
                >
                  {t}
                </span>
              ))}
            </div>

            <div className="flex justify-end">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => handleDelete(n._id)}
              >
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
