import { useCallback, useState } from "react";
import { WebSocketMessage } from "../_websocket/types/websocket.types";
import { WebsocketMessageType } from "../_websocket/enums/websocket_message_type.enum";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSelectedChannelId,
  selectSelectedServerId,
} from "../store/selectors";
import { sendMessageThroughWebsocket } from "../store/actions";

export function useMessageSenderFromForm() {
  const selectedServerId = useSelector(selectSelectedServerId);
  const selectedChannelId = useSelector(selectSelectedChannelId);
  const dispatch = useDispatch();
  const [text, setText] = useState("");

  const sendMessage = useCallback(() => {
    if (!text.trim()) return;

    const payload: WebSocketMessage = {
      type: WebsocketMessageType.SEND_MESSAGE,
      message: {
        serverId: selectedServerId,
        channelId: selectedChannelId,
        text,
      },
    };

    dispatch(sendMessageThroughWebsocket(payload));
    setText("");
  }, [text, selectedServerId, selectedChannelId, dispatch]);

  const handleSendMessage = useCallback(
    (
      e:
        | React.KeyboardEvent<HTMLTextAreaElement>
        | React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.preventDefault();
      sendMessage();
    },
    [sendMessage]
  );

  return { handleSendMessage, text, setText };
}
