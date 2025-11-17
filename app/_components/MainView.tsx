import { useEffect } from "react";
import { useAppDispatch } from "../_hooks/storeHooks";
import { connectWebSocket } from "../_store/actions";
import Header from "./Header";
import Server from "./Server";
import ServersList from "./ServersList";

export default function MainView() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(connectWebSocket());
  }, [dispatch]);

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
