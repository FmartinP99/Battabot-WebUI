import { useEffect, useRef } from "react";
import { WebsocketChatMessage } from "../_websocket/interfaces/websocket_init.types";
import ChatMessage from "./ChatMessage";
import { groupMessages } from "../_helpers/utils";
import { useMessageContainer } from "../_hooks/useMessageContainer";

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

  if (isChannelInactive) return null;

  return (
    <div
      className="flex-1 max-h-full max-w-full overflow-y-auto overflow-x-hidden min-w-0 pl-2 pr-2 "
      ref={containerRef}
    >
      {groups?.map((messages, index) => (
        <>
          <ChatMessage
            key={messages[0].messageId}
            messages={messages}
          ></ChatMessage>
          {index < groups.length - 1 ? (
            <div className="bg-slate-500 h-[1px] w-full "></div>
          ) : null}
        </>
      ))}
    </div>
  );
}
