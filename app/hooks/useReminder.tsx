import { useState, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "./storeHooks";
import {
  selectSelectedChannelId,
  selectSelectedServerId,
} from "../store/selectors";
import { WebSocketMessage } from "../_websocket/types/websocket.types";
import { WebsocketMessageType } from "../_websocket/enums/websocket_message_type.enum";
import { sendMessageThroughWebsocket } from "../store/actions";

export function useReminder(memberId: string) {
  const dispatch = useAppDispatch();

  const selectedServerId = useAppSelector(selectSelectedServerId);
  const selectedChannelId = useAppSelector((state) =>
    selectedServerId ? selectSelectedChannelId(state, selectedServerId) : null
  );

  const [date, setDate] = useState<Date>(new Date());
  const [text, setText] = useState<string>("");

  const handleSetText = (t: string) => {
    if (t === text) return;
    setText(t);
  };

  const setValidDate = useCallback((newDate: Date | undefined) => {
    if (!newDate) return;
    if (newDate.getTime() < Date.now()) return;
    setDate(newDate);
  }, []);

  const sendReminder = useCallback(() => {
    if (!selectedServerId || !selectedChannelId) return;

    const payload: WebSocketMessage = {
      type: WebsocketMessageType.SET_REMINDER,
      message: {
        serverId: selectedServerId,
        channelId: selectedChannelId,
        memberId,
        date,
        text: text,
      },
    };

    dispatch(sendMessageThroughWebsocket(payload));
    setText("");
  }, [selectedServerId, selectedChannelId, memberId, date, dispatch, text]);

  return {
    date,
    setValidDate,
    sendReminder,
    text,
    handleSetText,
  };
}
