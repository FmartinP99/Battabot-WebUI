"use client";

import { useWebSocket } from "../_websocket/websocket";
import { ServerPreview } from "./ServerPreview";

export default function ServersList() {
  const { servers } = useWebSocket();

  return (
    <div className="h-full flex flex-col gap-3 overflow-y-auto overflow-x-hidden pt-2 pb-2">
      {servers.map((server) => (
        <ServerPreview server={server} key={server.guildId} />
      ))}
    </div>
  );
}
