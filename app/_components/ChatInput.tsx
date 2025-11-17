"use client";

import { useMessageSender } from "../_hooks/useMessageSender";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";

export default function ChatInput({
  activeChannelId,
}: {
  activeChannelId: string;
}) {
  const { handleSendMessage } = useMessageSender(activeChannelId);

  if (activeChannelId === "0") {
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
