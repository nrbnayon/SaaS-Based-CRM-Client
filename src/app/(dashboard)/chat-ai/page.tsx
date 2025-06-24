import ChatInterface from "../components/Chat/ChatInterface";
import DashboardHeader from "../components/dashboard-header";

export default function Home() {
  return (
    <div className="">
      <DashboardHeader title="Chat with ai" />
      <main className="bg-background">
        <ChatInterface />
      </main>
    </div>
  );
}
