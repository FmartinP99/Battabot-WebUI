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
    selectedChannelId,
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
    <div className="w-[calc(100%-70px)] ml-3  flex h-full min-w-0 overflow-hidden">
      <ChannelsList
        channels={selectedChannels}
        setActiveChannel={handleSetActiveChannel}
        activeChannelId={selectedChannelId ?? null}
      />

      <div
        className="flex-1 flex gap-1 min-h-0 flex-col h-full min-w-0 bg-slate-800 pb-2"
        style={{ scrollbarGutter: "stable" }}
      >
        <ChatWindow
          activeChannelId={selectedChannelId ?? null}
          messages={(messages && selectedServerId
            ? messages[selectedServerId] ?? []
            : []
          ).filter((msg) => msg.channelId === selectedChannelId)}
        />
        <ChatInput />
      </div>
      <MembersList members={selectedMembers} />
    </div>
  );
}
