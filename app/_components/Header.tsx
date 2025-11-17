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
    return <div>Battabot Web UI!</div>;
  }

  return (
    <div className=" flex flex-row gap-4 items-center  p-2  border-b  border-gray-600 rounded-sm text-accent-500">
      <div className="w-full h-full  flex items-center gap-2 justify-center text-xl">
        <Image
          className="rounded-full object-cover max-h-[25px]"
          src={selectedServer.iconUrl || defaultBg}
          alt="Not available"
          width="25"
          height="25"
        />
        <span>{selectedServer.guildName}</span>
      </div>

      {socketReady ? null : <ReconnectButton />}
    </div>
  );
}
