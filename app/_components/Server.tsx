"use client";
import ChannelsList from "./ChannelsList";
import MembersList from "./MembersList";
import ChatWindow from "./ChatWindow";
import ChatInput from "./ChatInput";
import { useActiveServerData } from "../_hooks/useActiveServerData";
import Spinner from "./Spinner";

export default function Server() {
  const {
    selectedServer,
    selectedMembers,
    selectedChannels,
    activeChannelId,
    handleSetActiveChannel,
    messages,
    selectedServerId,
  } = useActiveServerData();

  if (!selectedServer)
    return (
      <div className="relative grid items-center justify-center self-center w-[100vw]  ">
        <Spinner />
        <p className="text-xl text-primary-200">Loading servers...</p>
      </div>
    );

  return (
    <div className="w-[calc(100%-70px)] ml-3 mr-3 flex h-full min-w-0 overflow-hidden ">
      <ChannelsList
        channels={selectedChannels}
        setActiveChannel={handleSetActiveChannel}
        activeChannelId={activeChannelId}
      />

      <div
        className="flex-1 flex gap-1 flex-col h-full min-w-0 bg-slate-800 pb-2 pl-2"
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
