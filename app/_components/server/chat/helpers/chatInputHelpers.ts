import { WebsocketInitEmotes } from "@/app/_websocket/types/websocket_init.types";
import { specialWordRegex } from "@/app/helpers/regexes";
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

export function handleBackspaceDeleteSpecialWord(
  textarea: HTMLTextAreaElement
): string | null {
  const value = textarea.value;
  const cursorPos = textarea.selectionStart;
  if (cursorPos === 0) return null;

  const textBeforeCursor = value.slice(0, cursorPos);
  const match = textBeforeCursor.match(specialWordRegex);

  let deleteStart: number;
  if (match) {
    deleteStart = cursorPos - match[0].length;
  } else {
    deleteStart = cursorPos - 1;
  }

  const newValue = value.slice(0, deleteStart) + value.slice(cursorPos);
  textarea.value = newValue;
  textarea.setSelectionRange(deleteStart, deleteStart);

  return newValue;
}

function findPreviousSpecialWord(text: string) {
  const match = text.match(/<[^<>]*>$/); // last <…> at end of string
  if (!match) return null;
  return match[0];
}

function findNextSpecialWord(text: string) {
  const match = text.match(/^<[^<>]*>/); // first <…> at start of string
  if (!match) return null;
  return match[0];
}

export function handleArrowSkipSpecialWord(
  textarea: HTMLTextAreaElement,
  direction: "left" | "right"
) {
  const { selectionStart: pos, value } = textarea;

  if (direction === "left" && pos > 0) {
    const before = value.slice(0, pos);
    const word = findPreviousSpecialWord(before);
    if (word) {
      textarea.selectionStart = textarea.selectionEnd = pos - word.length;
    } else {
      textarea.selectionStart = textarea.selectionEnd = pos - 1;
    }
  }

  if (direction === "right" && pos < value.length) {
    const after = value.slice(pos);
    const word = findNextSpecialWord(after);
    if (word) {
      textarea.selectionStart = textarea.selectionEnd = pos + word.length;
    } else {
      textarea.selectionStart = textarea.selectionEnd = pos + 1;
    }
  }

  textarea.focus();
}
