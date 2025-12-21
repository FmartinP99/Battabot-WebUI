import { useCallback, useState } from "react";
import { WebSocketMessage } from "../_websocket/types/websocket.types";
import { useDispatch } from "react-redux";
import {
  selectSelectedChannelId,
  selectSelectedServerId,
} from "../store/selectors";
import { sendMessageThroughWebsocket } from "../store/actions";
import { useAppSelector } from "./storeHooks";
import {
  WebsocketMessageType,
  WebsocketSendMessageQuery,
} from "../_websocket/types/websocket_init.types";

export function useMessageSenderFromForm() {
  const selectedServerId = useAppSelector(selectSelectedServerId);
  const selectedChannelId = useAppSelector((state) =>
    selectedServerId ? selectSelectedChannelId(state, selectedServerId) : null
  );
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
      } as WebsocketSendMessageQuery,
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
