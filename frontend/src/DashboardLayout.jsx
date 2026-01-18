export default function DashboardLayout({ children }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b px-6 py-4 flex items-center justify-between">
        <h1 className="text-lg font-semibold">YT Companion</h1>
        <button className="text-sm text-muted-foreground">Logout</button>
      </header>

      <main className="flex">
        <div className="w-full max-w-4xl mx-auto p-8">
          {children}
        </div>
      </main>
    </div>
  );
}
