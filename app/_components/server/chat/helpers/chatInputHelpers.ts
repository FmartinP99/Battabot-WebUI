import { getWordAtCursor } from "@/app/helpers/utils";

export function insertOrReplaceEmoji(
  value: string,
  cursor: number,
  strToInsert: string
): { newValue: string; newCursorStart: number } {
  const wordInfo = getWordAtCursor(value, cursor);
  let newValue: string = "";

  if (wordInfo && wordInfo.word.startsWith(":")) {
    newValue =
      value.slice(0, wordInfo.start) + strToInsert + value.slice(wordInfo.end);
    return { newValue, newCursorStart: wordInfo.start };
  } else {
    newValue = value.slice(0, cursor) + strToInsert + value.slice(cursor);
    return { newValue, newCursorStart: cursor };
  }
}
