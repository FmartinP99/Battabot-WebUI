"use client";

import { useMessageSenderFromForm } from "../../../hooks/useMessageSender";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { getWordAtCursor } from "@/app/helpers/utils";
import ChatEmoteSelectList from "./ChatEmoteSelectList";

export default function ChatInput() {
  const {
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
  } = useMessageSenderFromForm();

  if (!selectedChannelId || !selectedServerId) {
    return null;
  }

  return (
    <div className="relative w-full">
      {showEmoteList && (
        <div
          className="absolute bottom-full  left-1/2 w-[99%] -translate-x-1/2  shadow-lg mb-0.5 rounded-lg z-50
         bg-primary-x3 py-1"
        >
          <ChatEmoteSelectList
            serverId={selectedServerId}
            handleSelectListItemClick={handleSelectListItemClick}
            filter={emoteText}
            className="space-y-1 overflow-y-auto max-h-[30vh] "
          />
        </div>
      )}
      <div className="w-full bg-primary-x2 border-t border-primary-x1">
        <div className="relative">
          <div className="relative bg-primary-x1 rounded-lg overflow-hidden transition-all duration-200 hover:bg-primary-x4 ">
            <div className="flex items-end gap-2 p-3">
              <div className="flex-1 relative">
                <Textarea
                  ref={textAreaRef}
                  name="message"
                  placeholder="Type your message..."
                  className="w-full resize-none bg-transparent border-none focus:outline-none focus:ring-0 text-accent-x2 placeholder:text-accent-x4 min-h-[40px] max-h-[200px] py-1 px-2 text-sm"
                  rows={1}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey && !showEmoteList) {
                      handleSendMessage(e);
                    }
                  }}
                  onInput={(e) => {
                    const target = e.currentTarget;
                    const value = target.value;
                    const cursorPos = target.selectionStart;
                    const result = getWordAtCursor(value, cursorPos);
                    if (result && result.word[0] === ":") {
                      setShowEmoteList(true);
                      setEmoteText(result.word.slice(1));
                      return;
                    }
                    setShowEmoteList(false);
                    setEmoteText(null);
                  }}
                />
              </div>
              <Button
                type="submit"
                variant="chatMessageSend"
                className="h-[40px] w-[100px]"
                onClick={(e) => handleSendMessage(e)}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
