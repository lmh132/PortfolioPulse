import { ChatComponent } from "@/components/ChatComponent";

export const Research = () => {
  return (
    <div className="flex flex-col h-screen">
      <header className="p-4">
        <h1 className="text-white text-2xl font-bold mb-4">
          Research Assistant
        </h1>
        <div className="text-black h-[calc(100vh-120px)]">
          <ChatComponent />
        </div>{" "}
      </header>
      <main className="flex-grow"></main>
    </div>
  );
}
