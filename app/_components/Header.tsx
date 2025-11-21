"use client";

import Image from "next/image";
import ReconnectButton from "./ReconnectButton";
import defaultBg from "@/app/_files/profpic.png";
import { useSelector } from "react-redux";
import {
  selectSelectedServerId,
  selectServers,
  selectSocketReady,
} from "../_store/selectors";

export default function Header() {
  const socketReady = useSelector(selectSocketReady);
  const servers = useSelector(selectServers);
  const selectedServerId = useSelector(selectSelectedServerId);

  const selectedServer = servers.find(
    (server) => server.guildId === selectedServerId
  );

  if (!selectedServer) {
    return (
      <div className="flex items-center justify-center h-14 px-4 border-b border-primary-x3 bg-primary-x1">
        <span className="text-lg font-semibold bg-gradient-to-r from-primary-action-focus to-accent-x5 bg-clip-text text-transparent">
          Battabot Web UI!
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-row gap-4 items-center h-14 px-4 border-b border-primary-x3 bg-primary-x1 shadow-sm">
      <div className="flex items-center gap-3 flex-1 justify-center">
        <div className="relative group">
          <div className="absolute inset-0 bg-primary-action-focus rounded-full opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300" />
          <Image
            className="relative rounded-full object-cover w-8 h-8 ring-2 ring-primary-x3 group-hover:ring-primary-action-focus transition-all duration-300"
            src={selectedServer.iconUrl || defaultBg}
            alt="Server icon"
            width="32"
            height="32"
          />
        </div>

        <span className="text-base font-semibold text-accent-x2 truncate">
          {selectedServer.guildName}
        </span>
      </div>

      {socketReady ? null : (
        <div className="flex items-center">
          <ReconnectButton />
        </div>
      )}
    </div>
  );
}
