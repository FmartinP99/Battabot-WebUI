"use client";

import { useSelector } from "react-redux";
import { useMessageSenderFromForm } from "../_hooks/useMessageSender";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { selectSelectedChannelId } from "../_store/selectors";

export default function ChatInput() {
  const { handleSendMessage } = useMessageSenderFromForm();
  const selectedChannelId = useSelector(selectSelectedChannelId);
  if (!selectedChannelId) {
    return null;
  }

  return (
    <form onSubmit={handleSendMessage} className="flex gap-3">
      <Textarea placeholder="Type your message here." name="message" rows={1} />
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
