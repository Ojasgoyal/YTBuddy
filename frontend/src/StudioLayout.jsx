import { Button } from "@/components/ui/button";

export default function StudioLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4 flex justify-between items-center">
        <h1 className="text-lg font-semibold">YT Buddy</h1>
        <Button variant="ghost">Logout</Button>
      </header>

      <main className="max-w-6xl mx-auto p-8 space-y-8">
        {children}
      </main>
    </div>
  );
}
