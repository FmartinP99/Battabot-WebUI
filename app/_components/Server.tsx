"use client";
import { useEffect, useState } from "react";
import { useWebSocket } from "../_websocket/websocket";
import ChannelsList from "./ChannelsList";
import MembersList from "./MembersList";
import { WebsocketInitChannels } from "../_websocket/interfaces/websocket_init.interface";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";

export default function Server() {
  const { servers, selectedServerId, members, channels, messages } =
    useWebSocket();
  const [activeChannelId, setActiveChannelId] = useState("0");

  const handleSetActiveChannel = (channel: WebsocketInitChannels): void => {
    if (channel.channelId === activeChannelId) {
      return;
    }
    setActiveChannelId(channel.channelId);
  };

  const selectedServer = servers.find(
    (server) => server.guildId === selectedServerId
  );

  const selectedMembers = members.get(selectedServer?.guildId ?? "0") ?? [];
  const selectedChannels =
    channels
      .get(selectedServer?.guildId ?? "0")
      ?.filter((channel) => channel.type === "text") ?? [];

  useEffect(() => {
    if (selectedChannels.length > 0 && activeChannelId === "0") {
      setActiveChannelId(selectedChannels[0].channelId);
    }
  }, [selectedChannels, activeChannelId]);

  useEffect(() => {
    if (selectedServerId && selectedChannels.length > 0) {
      setActiveChannelId(selectedChannels[0].channelId);
    }
  }, [selectedServerId]);

  return (
    <div className="w-[calc(100%-70px)] ml-3 mr-3 flex h-full min-w-0 overflow-hidden ">
      <ChannelsList
        channels={selectedChannels}
        setActiveChannel={handleSetActiveChannel}
        activeChannelId={activeChannelId}
      />

      <div
        className="flex-1 flex gap-1 flex-col h-full min-w-0 bg-slate-800"
        style={{ scrollbarGutter: "stable" }}
      >
        <ChatWindow
          activeChannelId={activeChannelId}
          messages={(messages.get(selectedServerId ?? "0") ?? []).filter(
            (msg) => msg.channelId === activeChannelId
          )}
        />
        <ChatInput activeChannelId={activeChannelId} />
      </div>

      <MembersList members={selectedMembers} />
    </div>
  );
}
