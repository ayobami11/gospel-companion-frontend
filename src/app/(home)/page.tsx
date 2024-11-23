import Header from "./Header";
import Chat from "@/components/Chat/Chat";

export default function Home() {

  return (
    <div className="flex flex-col min-h-screen bg-[hsl(0,0%,97%)] dark:bg-[hsl(0,0%,12%)]">
      <Header />

      <main className="flex-1">
        <Chat />
      </main>

      <footer className="text-center p-2 sticky bottom-0">
        <p className="text-sm">Gospel Companion can make mistakes. Consider checking attached references.</p>
      </footer>
    </div>
  );
}
