import { useState } from "react";
import { WebsocketInitChannels } from "../_websocket/interfaces/websocket_init.types";

export default function ChannelsList({
  channels,
  setActiveChannel,
  activeChannelId,
}: {
  channels: WebsocketInitChannels[];
  setActiveChannel: (channel: WebsocketInitChannels) => void;
  activeChannelId: string;
}) {
  if (activeChannelId === "0") {
    return null;
  }

  return (
    <div className="flex flex-col  justify-start truncate w-[200px] pl-3 pr-3 border-l border-r mr-2 border-gray-500">
      {channels.map((channel) => (
        <div
          key={channel.channelId}
          className={`truncate align-baseline cursor-pointer flex justify-start pt-1 pb-1 ${
            activeChannelId === channel.channelId
              ? "bg-accent-600 border-accent-600 rounded-sm"
              : ""
          }`}
          onClick={() => setActiveChannel(channel)}
        >
          <span># {channel.name}</span>
        </div>
      ))}
    </div>
  );
}
