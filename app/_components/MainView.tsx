import { useEffect } from "react";
import { useAppDispatch } from "../hooks/storeHooks";
import { connectWebSocket } from "../store/actions";
import Header from "./shared/Header";
import Server from "./server/Server";
import ServersList from "./server/ServersList";

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
