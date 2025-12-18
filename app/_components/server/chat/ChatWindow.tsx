"use client";

import { Fragment } from "react";
import ChatMessageGroup from "./ChatMessageGroup";
import { WebsocketChatMessage } from "@/app/_websocket/types/websocket_init.types";
import { useMessageContainer } from "@/app/hooks/useMessageContainer";

interface ChatWindowProps {
  activeChannelId: string | null;
  messages: WebsocketChatMessage[];
}

export default function ChatWindow({
  activeChannelId,
  messages,
}: ChatWindowProps) {
  const { containerRef, isChannelInactive, groups } = useMessageContainer(
    activeChannelId,
    messages
  );

  if (!activeChannelId || isChannelInactive) return null;

  return (
    <div
      className="flex-1 max-h-full max-w-full overflow-x-hidden min-w-0 px-4 scrollbar-hide-nonhover scrollbar-transition"
      ref={containerRef}
    >
      {groups?.map((msgs, index) => (
        <Fragment key={(msgs[0]?.messageId ?? index) + "__msggroup"}>
          <ChatMessageGroup messages={msgs ?? []} />
          {index < groups.length - 1 ? (
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-1"></div>
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}
