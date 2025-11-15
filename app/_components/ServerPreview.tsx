"use client";

import Image from "next/image";
import { WebsocketInitServerReduced } from "../_websocket/interfaces/websocket_init.interface";
import defaultBg from "@/app/_files/profpic.png";
import { useWebSocket } from "../_websocket/websocket";

export function ServerPreview({
  server,
}: {
  server: WebsocketInitServerReduced;
}) {
  const { selectedServerId, setSelectedServerId } = useWebSocket();
  const isActive = selectedServerId === server.guildId;

  return (
    <div
      onClick={() => setSelectedServerId(server.guildId)}
      className="flex gap-1 w-[70px] h-[45px] overflow-hidden cursor-pointer "
    >
      <div
        className={`${
          isActive ? "bg-slate-200 border-slate-200 rounded-sm" : ""
        } w-[5px] h-auto`}
      ></div>

      <Image
        className="rounded-full object-cover"
        src={server.iconUrl || defaultBg}
        alt="Not available"
        width="45"
        height="45"
      />
    </div>
  );
}
