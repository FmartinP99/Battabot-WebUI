"use client";

import { useMessageSenderFromForm } from "../../../hooks/useMessageSender";
import { Button } from "../../ui/button";
import { Textarea } from "../../ui/textarea";
import { getWordAtCursor } from "@/app/helpers/utils";
import ChatEmoteSelectList from "./ChatEmoteSelectList";
import ChatMirroredInput from "./ChatMirroredInput";
import {
  handleArrowSkipSpecialWord,
  handleSpecialDelete,
} from "./helpers/chatInputHelpers";
import ChatMemberSelectList from "./ChatMemberSelectList";
import { ReactNode } from "react";
import ChatChannelSelectList from "./ChatChannelSelectList";

const selectListClasses =
  "absolute bottom-full  left-1/2 w-[99%] -translate-x-1/2  shadow-lg mb-0.5 rounded-lg z-50 bg-primary-x3 py-1";
const selectListItemClasses = "space-y-1 overflow-y-auto max-h-[30vh]";

export default function ChatInput() {
  const {
    handleSendMessage,
    text,
    setText,
    selectedServerId,
    selectedChannelId,
    textAreaRef,
    handleSelectListItemClick,
    showSelectList,
    setShowSelectList,
    filterText,
    setFiltexText,
    resetItemListsVisibility,
    showMirroredCaret,
    setShowMirroredCaret,
  } = useMessageSenderFromForm();

  if (!selectedChannelId || !selectedServerId) {
    return null;
  }

  let renderedSelectListComponent: ReactNode = null;

  if (showSelectList === "emote") {
    renderedSelectListComponent = (
      <ChatEmoteSelectList
        serverId={selectedServerId}
        handleSelectListItemClick={handleSelectListItemClick}
        filter={filterText}
        className={selectListItemClasses}
      />
    );
  } else if (showSelectList === "member") {
    renderedSelectListComponent = (
      <ChatMemberSelectList
        serverId={selectedServerId}
        handleSelectListItemClick={handleSelectListItemClick}
        filter={filterText}
        className={selectListItemClasses}
      />
    );
  } else if (showSelectList === "channel") {
    renderedSelectListComponent = (
      <ChatChannelSelectList
        serverId={selectedServerId}
        handleSelectListItemClick={handleSelectListItemClick}
        filter={filterText}
        className={selectListItemClasses}
      />
    );
  }

  return (
    <div className="relative w-full">
      {renderedSelectListComponent !== null && (
        <div className={selectListClasses}>{renderedSelectListComponent}</div>
      )}

      <div className="w-full bg-primary-x2 border-t border-primary-x1">
        <div className="relative">
          <div className="relative bg-primary-x1 rounded-lg overflow-hidden transition-all duration-200 hover:bg-primary-x4 ">
            <div className="flex items-end gap-2 p-3">
              <div className="flex-1 relative">
                <ChatMirroredInput
                  mirroredText={text}
                  targetRef={textAreaRef}
                  showMirroredCaret={showMirroredCaret}
                  className="text-left overflow-y-auto bg-transparent border-none focus:outline-none focus:ring-0 text-accent-x2 placeholder:text-accent-x4 min-h-[40px] max-h-[200px] py-1 px-2 text-sm"
                />

                <Textarea
                  ref={textAreaRef}
                  name="message"
                  placeholder="Type your message..."
                  className="pointer-events-none absolute inset-0 opacity-0  resize-none bg-transparent border-none focus:outline-none focus:ring-0 text-accent-x2 placeholder:text-accent-x4 min-h-[40px] max-h-[200px] py-1 px-2 text-sm"
                  rows={1}
                  value={text}
                  onBlur={() => setShowMirroredCaret(false)}
                  onFocus={() => setShowMirroredCaret(true)}
                  onChange={(e) => setText(e.target.value)}
                  onKeyDown={(e) => {
                    if (
                      e.key === "Enter" &&
                      !e.shiftKey &&
                      showSelectList === null
                    ) {
                      handleSendMessage(e);
                    }

                    if (!textAreaRef.current) return;

                    if (e.key === "Backspace" || e.key === "Delete") {
                      e.preventDefault();

                      const direction =
                        e.key === "Backspace" ? "backward" : "forward";

                      const result = handleSpecialDelete(
                        textAreaRef.current,
                        direction
                      );

                      if (result) {
                        setText(result.newValue ?? "");

                        const wordAtCursor = getWordAtCursor(
                          result.newValue,
                          result.newCursor
                        );
                        if (!wordAtCursor || !wordAtCursor?.word.length) {
                          resetItemListsVisibility();
                        }
                      } else {
                        resetItemListsVisibility();
                        setText("");
                      }
                    }

                    if (e.key === "ArrowLeft") {
                      e.preventDefault();
                      handleArrowSkipSpecialWord(textAreaRef.current, "left");
                    }

                    if (e.key === "ArrowRight") {
                      e.preventDefault();
                      handleArrowSkipSpecialWord(textAreaRef.current, "right");
                    }
                  }}
                  onInput={(e) => {
                    resetItemListsVisibility();

                    const target = e.currentTarget;
                    const value = target.value;
                    const cursorPos = target.selectionStart;
                    const result = getWordAtCursor(value, cursorPos);

                    if (result) {
                      if (result.word[0] === ":") {
                        setShowSelectList("emote");
                        setFiltexText(result.word.slice(1));
                        return;
                      }

                      if (result.word[0] === "@") {
                        setShowSelectList("member");
                        setFiltexText(result.word.slice(1));
                        return;
                      }

                      if (result.word[0] === "#") {
                        setShowSelectList("channel");
                        setFiltexText(result.word.slice(1));
                        return;
                      }
                    }
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
