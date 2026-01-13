import {
  nextSpecialWordRegex,
  previousSpecialWordRegex,
} from "@/app/helpers/regexes";
import { HandleKeyDownContext } from "@/app/helpers/selectlistHelpers";
import { getWordAtCursor } from "@/app/helpers/utils";

export function insertOrReplaceSelectlistTokens(
  value: string,
  cursor: number,
  strToInsert: string
): { newValue: string; newCursorStart: number } {
  const wordInfo = getWordAtCursor(value, cursor);
  if (
    wordInfo?.word.startsWith(":") ||
    wordInfo?.word.startsWith("@") ||
    wordInfo?.word.startsWith("#")
  ) {
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

export const handleKeyDownForSelectListBasic = ({
  e,
  items,
  selectedIndex,
  setSelectedIndex,
  onSelect,
}: HandleKeyDownContext<any>) => {
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

export function handleSpecialDelete(
  textarea: HTMLTextAreaElement,
  direction: "backward" | "forward"
): { newValue: string; newCursor: number } | null {
  const value = textarea.value;
  const cursorPos = textarea.selectionStart;

  if (
    (direction === "backward" && cursorPos === 0) ||
    (direction === "forward" && cursorPos === value.length)
  ) {
    return null;
  }

  let newValue = value;
  let newCursor = cursorPos;

  if (direction === "backward") {
    const before = value.slice(0, cursorPos);
    const match = before.match(previousSpecialWordRegex);
    const start = match ? cursorPos - match[0].length : cursorPos - 1;

    newValue = value.slice(0, start) + value.slice(cursorPos);
    newCursor = start;

    textarea.value = newValue;
    textarea.setSelectionRange(newCursor, newCursor);
    return { newValue, newCursor };
  } else {
    const after = value.slice(cursorPos);
    const match = after.match(nextSpecialWordRegex);
    const end = match ? cursorPos + match[0].length : cursorPos + 1;

    newValue = value.slice(0, cursorPos) + value.slice(end);
    newCursor = cursorPos;

    textarea.value = newValue;
    textarea.setSelectionRange(newCursor, newCursor);
    return { newValue, newCursor };
  }
}

function findPreviousSpecialWord(text: string) {
  const match = text.match(previousSpecialWordRegex); // last <…> at end of string
  if (!match) return null;
  return match[0];
}

function findNextSpecialWord(text: string) {
  const match = text.match(nextSpecialWordRegex); // first <…> at start of string
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
