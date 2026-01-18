import { Button } from "@/components/ui/button";
import axios from "./axios.js";

export default function StudioLayout({ children }) {
  const handleLogout = async () => {
    await axios.post("/auth/logout");
    window.location.reload();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">YT Buddy</h1>
        <Button variant="ghost" onClick={handleLogout}>Logout</Button>
      </header>

      <main className="max-w-6xl mx-auto p-8 space-y-8">{children}</main>
    </div>
  );
}
