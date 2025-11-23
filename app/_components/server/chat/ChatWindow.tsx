"use client";

import { Fragment } from "react";
import ChatMessage from "./ChatMessage";
import { WebsocketChatMessage } from "@/app/_websocket/types/websocket_init.types";
import { useMessageContainer } from "@/app/hooks/useMessageContainer";
import useAutoHideScrollbar from "@/app/hooks/useAutoHideScrollbar";

export default function ChatWindow({
  activeChannelId,
  messages,
}: {
  activeChannelId: string | null;
  messages: WebsocketChatMessage[];
}) {
  const { containerRef, isChannelInactive, groups } = useMessageContainer(
    activeChannelId,
    messages
  );

  const hidden = useAutoHideScrollbar(containerRef, 500);

  if (!activeChannelId || isChannelInactive) return null;

  return (
    <div
      className={`flex-1 max-h-full max-w-full overflow-x-hidden min-w-0 px-4 ${
        hidden ? "scrollbar-hide" : "overflow-y-auto"
      } scrollbar-transition`}
      ref={containerRef}
    >
      {groups?.map((msgs, index) => (
        <Fragment key={(msgs[0]?.messageId ?? index) + "__msggroup"}>
          <ChatMessage messages={msgs ?? []}></ChatMessage>
          {index < groups.length - 1 ? (
            <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-1"></div>
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}
