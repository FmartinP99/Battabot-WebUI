import { useCallback } from "react";
import { useWebSocket } from "../_websocket/websocket";
import { WebSocketMessage } from "../_websocket/types/websocket.types";
import { WebsocketMessageType } from "../_websocket/enums/websocket_message_type.enum";

export function useMessageSender(activeChannelId: string) {
  const { sendMessage, selectedServerId } = useWebSocket();

  const handleSendMessage = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      const formData = new FormData(e.currentTarget);

      const payload: WebSocketMessage = {
        type: WebsocketMessageType.SEND_MESSAGE,
        message: {
          serverId: selectedServerId,
          channelId: activeChannelId,
          text: formData.get("message"),
        },
      };

      sendMessage(payload);

      e.currentTarget.reset();
    },
    [sendMessage, selectedServerId, activeChannelId]
  );

  return { handleSendMessage };
}
