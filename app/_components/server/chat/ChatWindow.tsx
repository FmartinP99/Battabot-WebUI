"use client";
import ChatMessageGroup from "./ChatMessageGroup";
import { useMessageContainer } from "@/app/hooks/useMessageContainer";
import { WebsocketChatMessage } from "@/app/_websocket/types/websocket_init_reduced.types";

interface ChatWindowProps {
  activeChannelId: string | null;
  messages: WebsocketChatMessage[];
}

export default function ChatWindow({
  activeChannelId,
  messages,
}: ChatWindowProps) {
  const { containerRef, isChannelInactive, groups, rowVirtualizer } =
    useMessageContainer(activeChannelId, messages);

  if (!activeChannelId || isChannelInactive) return null;

  return (
    <div
      ref={containerRef}
      className="flex-1 max-h-full max-w-full overflow-x-hidden min-w-0 px-4 scrollbar-hide-nonhover scrollbar-transition"
    >
      <div
        style={{
          height: `${rowVirtualizer.getTotalSize()}px`,
          width: "100%",
          position: "relative",
        }}
      >
        {rowVirtualizer.getVirtualItems().map((virtualRow) => {
          const msgs = groups?.[virtualRow.index] ?? [];

          return (
            <div
              data-index={virtualRow.index}
              key={(msgs[0]?.messageId ?? virtualRow.index) + "__msggroup"}
              ref={(el) => {
                if (el) rowVirtualizer.measureElement(el);
              }}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                transform: `translateY(${virtualRow.start}px)`,
              }}
            >
              <ChatMessageGroup messages={msgs} />
              {virtualRow.index < (groups?.length ?? 0) - 1 && (
                <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent my-1" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
