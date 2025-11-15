import Header from "./Header";
import Server from "./Server";
import ServersList from "./ServersList";

export default function MainView() {
  return (
    <div className="flex flex-col h-[calc(100vh-46px-1rem)]">
      <Header />
      <div className="flex flex-1 mt-4 overflow-hidden">
        <ServersList />
        <Server />
      </div>
    </div>
  );
}
