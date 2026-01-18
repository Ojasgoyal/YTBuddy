import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ConnectYouTubeCard() {
  const handleConnect = () => {
    const base = import.meta.env.VITE_API_BASE_URL || "http://localhost:3000";
    window.location.href = `${base}/auth/google`;
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <Card className="w-95">
        <CardHeader>
          <CardTitle>Connect your YouTube</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Connect your YouTube account to manage your videos, comments, and ideas.
          </p>

          <Button className="w-full" onClick={handleConnect}>
            Connect with Google
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
