"use client";

import { useSelector } from "react-redux";
import { useMessageSenderFromForm } from "../_hooks/useMessageSender";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { selectSelectedChannelId } from "../_store/selectors";

export default function ChatInput() {
  const { handleSendMessage, text, setText } = useMessageSenderFromForm();
  const selectedChannelId = useSelector(selectSelectedChannelId);

  if (!selectedChannelId) {
    return null;
  }

  return (
    <div className="w-full bg-primary-x2 border-t border-primary-x1">
      <div className="relative">
        <div className="relative bg-primary-x1 rounded-lg overflow-hidden transition-all duration-200 hover:bg-primary-x4 ">
          <form onSubmit={handleSendMessage}>
            <div className="flex items-end gap-2 p-3">
              <div className="flex-1 relative">
                <Textarea
                  name="message"
                  placeholder="Type your message..."
                  className="w-full resize-none bg-transparent border-none focus:outline-none focus:ring-0 text-accent-x2 placeholder:text-accent-x4 min-h-[40px] max-h-[200px] py-1 px-2 text-sm"
                  rows={1}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                />
              </div>
              <Button
                type="submit"
                variant="chatMessageSend"
                className="h-[40px] w-[100px]"
              >
                Send
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
