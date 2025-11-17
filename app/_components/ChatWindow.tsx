"use client";

import { Fragment } from "react";
import { WebsocketChatMessage } from "../_websocket/types/websocket_init.types";
import ChatMessage from "./ChatMessage";
import { useMessageContainer } from "../_hooks/useMessageContainer";
import useAutoHideScrollbar from "../_hooks/useAutoHideScrollbar";

export default function ChatWindow({
  activeChannelId,
  messages,
}: {
  activeChannelId: string;
  messages: WebsocketChatMessage[];
}) {
  const { containerRef, isChannelInactive, groups } = useMessageContainer(
    activeChannelId,
    messages
  );

  let hidden = useAutoHideScrollbar(containerRef, 500);
  hidden = false;

  if (isChannelInactive) return null;

  return (
    <div
      className={`flex-1 max-h-full max-w-full overflow-x-hidden min-w-0 pl-2 pr-2  ${
        hidden ? "scrollbar-hide" : "overflow-y-auto"
      } scrollbar-transition`}
      ref={containerRef}
    >
      {groups?.map((msgs, index) => (
        <Fragment key={(msgs[0]?.messageId ?? index) + "__msggroup"}>
          <ChatMessage messages={msgs ?? []}></ChatMessage>
          {index < groups.length - 1 ? (
            <div className="bg-slate-500 h-[1px] w-full "></div>
          ) : null}
        </Fragment>
      ))}
    </div>
  );
}
