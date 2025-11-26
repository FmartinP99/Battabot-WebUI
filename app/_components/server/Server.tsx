"use client";
import ChannelsList from "./channel/ChannelsList";
import MembersList from "./member/MembersList";
import ChatInput from "./chat/ChatInput";
import { useActiveServerData } from "../../hooks/useActiveServerData";
import Spinner from "../shared/Spinner";
import ChatWindow from "./chat/ChatWindow";
import { isTextLike, isVoiceLike } from "./channel/helpers/channel_helpers";
import { ChannelType } from "./channel/enums/channel.enum";
import { ReactNode } from "react";
import MusicPlayer from "./musicPlayer/MusicPlayer";
import Member from "./member/Member";

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

  const activeChannelType =
    selectedChannels.find((ch) => ch.channelId === selectedChannelId)?.type ??
    ChannelType.Text;

  let renderedComponent: ReactNode = null;

  if (isTextLike(activeChannelType)) {
    renderedComponent = (
      <>
        <ChatWindow
          activeChannelId={selectedChannelId ?? null}
          messages={(messages && selectedServerId
            ? messages[selectedServerId] ?? []
            : []
          ).filter((msg) => msg.channelId === selectedChannelId)}
        />
        <ChatInput />{" "}
      </>
    );
  } else if (isVoiceLike(activeChannelType)) {
    renderedComponent = (
      <>
        <MusicPlayer />
      </>
    );
  }

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
        {renderedComponent}
      </div>
      <MembersList members={selectedMembers} />
    </div>
  );
}
