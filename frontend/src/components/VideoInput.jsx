import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function VideoInput({ onSubmit }) {
  const [url, setUrl] = useState("");

  const handleSubmit = () => {
    if (!url.trim()) return;
    onSubmit(url.trim());
    setUrl("");
  };

  return (
    <Card className="p-4 flex gap-2 max-w-xl mx-auto">
      <Input
        placeholder="Paste YouTube video URL"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <Button onClick={handleSubmit}>Load</Button>
    </Card>
  );
}
