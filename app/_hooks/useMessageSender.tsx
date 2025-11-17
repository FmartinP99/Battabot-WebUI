import { useCallback } from "react";
import { WebSocketMessage } from "../_websocket/types/websocket.types";
import { WebsocketMessageType } from "../_websocket/enums/websocket_message_type.enum";
import { useDispatch, useSelector } from "react-redux";
import { selectSelectedServerId } from "../_store/selectors";
import { sendMessageThroughWebsocket } from "../_store/actions";

export function useMessageSender(activeChannelId: string) {
  const selectedServerId = useSelector(selectSelectedServerId);
  const dispatch = useDispatch();

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
      dispatch(sendMessageThroughWebsocket(payload));
      e.currentTarget.reset();
    },
    [selectedServerId, activeChannelId]
  );

  return { handleSendMessage };
}
