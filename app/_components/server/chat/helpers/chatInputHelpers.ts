import { WebsocketInitEmotes } from "@/app/_websocket/types/websocket_init.types";
import { HandleKeyDownContext } from "@/app/helpers/selectlistHelpers";
import { getWordAtCursor } from "@/app/helpers/utils";

export function insertOrReplaceEmoji(
  value: string,
  cursor: number,
  strToInsert: string
): { newValue: string; newCursorStart: number } {
  const wordInfo = getWordAtCursor(value, cursor);
  if (wordInfo?.word.startsWith(":")) {
    return {
      newValue:
        value.slice(0, wordInfo.start) +
        strToInsert +
        value.slice(wordInfo.end),
      newCursorStart: wordInfo.start,
    };
  }
  return {
    newValue: value.slice(0, cursor) + strToInsert + value.slice(cursor),
    newCursorStart: cursor,
  };
}

export const handleKeyDownForEmoteSelectList = ({
  e,
  items,
  selectedIndex,
  setSelectedIndex,
  onSelect,
}: HandleKeyDownContext<WebsocketInitEmotes>) => {
  if (!items.length) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    setSelectedIndex((prev) => (prev + 1) % items.length);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    setSelectedIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  } else if (e.key === "Enter") {
    e.preventDefault();
    onSelect(items[selectedIndex]);
  }
};
