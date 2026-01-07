import { useCallback, useRef, useState } from "react";
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
import { insertOrReplaceEmoji } from "../_components/server/chat/helpers/chatInputHelpers";

export function useMessageSenderFromForm() {
  const selectedServerId = useAppSelector(selectSelectedServerId);
  const selectedChannelId = useAppSelector((state) =>
    selectedServerId ? selectSelectedChannelId(state, selectedServerId) : null
  );
  const dispatch = useDispatch();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState("");
  const [emoteText, setEmoteText] = useState<string | null>(null);
  const [showEmoteList, setShowEmoteList] = useState<boolean>(false);

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

  function handleSelectListItemClick(strToInsert: string) {
    if (!textAreaRef || !strToInsert) return;
    const textarea = textAreaRef.current;
    if (!textarea) return;
    const startIndex = textarea.selectionStart;
    const { newValue, newCursorStart } = insertOrReplaceEmoji(
      textarea.value,
      startIndex,
      strToInsert
    );

    setText(newValue);
    requestAnimationFrame(() => {
      const cursorPos = newCursorStart + strToInsert.length;
      textarea.focus();
      textarea.setSelectionRange(cursorPos, cursorPos);
      setShowEmoteList(false);
    });
  }

  return {
    handleSendMessage,
    text,
    setText,
    selectedServerId,
    selectedChannelId,
    textAreaRef,
    handleSelectListItemClick,
    showEmoteList,
    setShowEmoteList,
    emoteText,
    setEmoteText,
  };
}
