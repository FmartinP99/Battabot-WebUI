"use client";

import Image from "next/image";
import defaultBg from "@/app/files/profpic.png";
import { selectSelectedServerId } from "../../store/selectors";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import { setSelectedServerId } from "../../_websocket/websocketSlice";
import { WebsocketInitServerReduced } from "@/app/_websocket/types/websocket_init_reduced.types";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

interface ServerPreviewProps {
  server: WebsocketInitServerReduced;
}

export function ServerPreview({ server }: ServerPreviewProps) {
  const dispatch = useAppDispatch();
  const selectedServerId = useAppSelector(selectSelectedServerId);
  const isActive = selectedServerId === server.guildId;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          onClick={() => dispatch(setSelectedServerId(server.guildId))}
          className="flex gap-1 w-[70px] h-[45px] mb-3
          overflow-hidden cursor-pointer "
        >
          <div
            className={`${
              isActive ? "bg-slate-200 border-slate-200 rounded-sm" : ""
            } w-[5px] h-auto`}
          />

          <Image
            className="rounded-full object-cover"
            src={server.iconUrl || defaultBg}
            alt="Not available"
            width="45"
            height="45"
          />
        </div>
      </TooltipTrigger>
      <TooltipContent side="right">
        <span className="py-3 px-1.5">{server.guildName}</span>
      </TooltipContent>
    </Tooltip>
  );
}
