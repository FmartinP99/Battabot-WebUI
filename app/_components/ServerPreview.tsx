"use client";

import Image from "next/image";
import { WebsocketInitServerReduced } from "../_websocket/types/websocket_init.types";
import defaultBg from "@/app/_files/profpic.png";
import { selectSelectedServerId } from "../_store/selectors";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../_hooks/storeHooks";
import { setSelectedServerId } from "../_websocket/websocketSlice";

export function ServerPreview({
  server,
}: {
  server: WebsocketInitServerReduced;
}) {
  const dispatch = useAppDispatch();
  const selectedServerId = useSelector(selectSelectedServerId);
  const isActive = selectedServerId === server.guildId;

  return (
    <div
      onClick={() => dispatch(setSelectedServerId(server.guildId))}
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
