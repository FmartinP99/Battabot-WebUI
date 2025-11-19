import { useState } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "../_hooks/storeHooks";
import { sendMessageThroughWebsocket } from "../_store/actions";
import {
  selectSelectedServerId,
  selectSelectedChannelId,
} from "../_store/selectors";
import { WebsocketMessageType } from "../_websocket/enums/websocket_message_type.enum";
import { WebSocketMessage } from "../_websocket/types/websocket.types";
import { DateTimePicker } from "./DateTimePicker";
import RemindmeControl from "./RemindmeControl";
import { Button } from "./ui/button";

export default function Remindme({ memberId }: { memberId: string }) {
  const selectedServerId = useSelector(selectSelectedServerId);
  const selectedChannelId = useSelector(selectSelectedChannelId);
  const dispatch = useAppDispatch();

  const [date, setDate] = useState<Date>(new Date());

  const handleSetDate = (date: Date | undefined) => {
    if (!date || date.getTime() < new Date().getTime()) return;
    setDate(() => date);
  };

  function sendReminder() {
    const payload: WebSocketMessage = {
      type: WebsocketMessageType.SET_REMINDER,
      message: {
        serverId: selectedServerId,
        channelId: selectedChannelId,
        memberId: memberId,
        date: date,
        text: "",
      },
    };
    dispatch(sendMessageThroughWebsocket(payload));
  }

  const isPast = (date: Date): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return date < today;
  };

  if (!memberId) {
    return null;
  }

  return (
    <div className="mt-3 pb-3 pl-3 flex flex-col gap-2">
      <DateTimePicker
        disabledMatcher={isPast}
        handleSetDate={handleSetDate}
        date={date}
        disablePortal={true}
      >
        <div className="flex flex-col-reverse gap-3 pl-3 ">
          <Button
            onClick={sendReminder}
            variant="outline"
            className="w-full  font-bold"
          >
            Remind me
          </Button>
        </div>
      </DateTimePicker>
      <RemindmeControl handleSetDate={handleSetDate} date={date} />
    </div>
  );
}
