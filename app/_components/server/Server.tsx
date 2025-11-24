"use client";
import ChannelsList from "./channel/ChannelsList";
import MembersList from "./member/MembersList";
import ChatInput from "./chat/ChatInput";
import { useActiveServerData } from "../../hooks/useActiveServerData";
import Spinner from "../shared/Spinner";
import ChatWindow from "./chat/ChatWindow";

export default function Server() {
  const {
    selectedServer,
    selectedMembers,
    selectedChannels,
    selectedChannelId,
    handleOnChannelClick,
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
        onChannelClick={handleOnChannelClick}
        activeChannelId={selectedChannelId ?? null}
      />

      <div
        className="flex-1 flex gap-1 min-h-0 flex-col h-full min-w-0 bg-slate-800 pb-2 px-2"
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
