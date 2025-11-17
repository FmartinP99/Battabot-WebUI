"use client";

import { useMessageSender } from "../_hooks/useMessageSender";
import { WebsocketMessageType } from "../_websocket/enums/websocket_message_type.enum";
import { WebSocketMessage } from "../_websocket/types/websocket.types";
import { useWebSocket } from "../_websocket/websocket";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function ChatInput({
  activeChannelId,
}: {
  activeChannelId: string;
}) {
  if (activeChannelId === "0") {
    return null;
  }

  const { handleSendMessage } = useMessageSender(activeChannelId);

  return (
    <form onSubmit={handleSendMessage} className="flex gap-3">
      {/* <textarea
        name="message"
        id="message"
        className="w-full border border-gray-600 rounded-sm bg-inherit p-3 min-h-2 focus:ring-0 focus:outline-none "
        maxLength={1000}
        minLength={0}
        rows={1}
      /> */}
      <Textarea placeholder="Type your message here." name="message" />
      <Button
        variant="chatMessageSend"
        type="submit"
        className="h-full w-[120px] mr-2 "
      >
        Send
      </Button>
    </form>
  );
}
