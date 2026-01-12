import { WebsocketMessageType } from "../_websocket/types/websocket_init.types";
import { WebsocketChatMessage } from "../_websocket/types/websocket_init_reduced.types";
import { nextSpecialWordRegex, specialWordRegex } from "./regexes";

export function formatEpoch(
  epochInUtc: number,
  gmtOffsetInHour: number = 0
): string {
  if (epochInUtc < 1e12) epochInUtc *= 1000;

  const clientOffsetMinutes = new Date(epochInUtc).getTimezoneOffset();
  const offsetDifferenceHours = gmtOffsetInHour - clientOffsetMinutes / 60;
  const shiftedEpoch = epochInUtc + offsetDifferenceHours * 60 * 60 * 1000;
  const date = new Date(shiftedEpoch);
  const now = new Date();

  const two = (n: number) => String(n).padStart(2, "0");

  const HHmm = `${two(date.getHours())}:${two(date.getMinutes())}`;
  const MMddHHmm = `${two(date.getMonth() + 1)}-${two(date.getDate())} ${HHmm}`;
  const yyyyMMddHHmm = `${date.getFullYear()}-${two(date.getMonth() + 1)}-${two(
    date.getDate()
  )} ${HHmm}`;

  const todayStart = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate()
  ).getTime();

  const tomorrowStart = todayStart + 24 * 60 * 60 * 1000;
  const dayAfterTomorrowStart = tomorrowStart + 24 * 60 * 60 * 1000;
  const yesterdayStart = todayStart - 24 * 60 * 60 * 1000;

  if (shiftedEpoch >= tomorrowStart && shiftedEpoch < dayAfterTomorrowStart) {
    return `Tomorrow ${HHmm}`;
  }

  if (shiftedEpoch >= todayStart) {
    return HHmm;
  }

  if (shiftedEpoch >= yesterdayStart) {
    return `Yesterday ${HHmm}`;
  }

  if (date.getFullYear() === now.getFullYear()) {
    return MMddHHmm;
  }

  return yyyyMMddHHmm;
}

export function groupMessages(
  messages: WebsocketChatMessage[]
): WebsocketChatMessage[][] {
  if (!messages || messages.length === 0) return [];

  const sorted = [...messages].sort((a, b) => a.epoch - b.epoch);

  const groups: WebsocketChatMessage[][] = [];
  let currentGroup: WebsocketChatMessage[] | null = null;

  const TEN_MINUTES = 10 * 60;

  for (const msg of sorted) {
    if (
      currentGroup &&
      currentGroup[0].userId === msg.userId &&
      msg.epoch - currentGroup[0].epoch <= TEN_MINUTES
    ) {
      currentGroup.push(msg);
    } else {
      currentGroup = [{ ...msg }];
      groups.push(currentGroup);
    }
  }

  return groups;
}

export function getTimeString(time: Date): string {
  return (
    time.getHours().toString().padStart(2, "0") +
    ":" +
    time.getMinutes().toString().padStart(2, "0") +
    ":" +
    time.getSeconds().toString().padStart(2, "0")
  );
}

export function secondsToHHMMSS(
  totalSeconds: number,
  skipHoursIfLessThan1: boolean = false
): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  if (skipHoursIfLessThan1 && hours == 0) {
    return [
      minutes.toString().padStart(2, "0"),
      seconds.toString().padStart(2, "0"),
    ].join(":");
  }

  return [
    hours.toString().padStart(2, "0"),
    minutes.toString().padStart(2, "0"),
    seconds.toString().padStart(2, "0"),
  ].join(":");
}

export function addMinutes(date: Date, minutesToAdd: number) {
  const currentMinutes = date.getMinutes();
  date.setMinutes(currentMinutes + minutesToAdd);
  return date;
}

export const isPast = (date: Date): boolean => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date < today;
};

export function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function getTextColorBasedOnBg(backgroundColor: string) {
  let r, g, b;

  if (backgroundColor.startsWith("#")) {
    const hex = backgroundColor.replace("#", "");
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else if (backgroundColor.startsWith("rgb")) {
    [r, g, b] = backgroundColor
      .replace(/[^\d,]/g, "")
      .split(",")
      .map(Number);
  } else {
    return "#000";
  }

  const luminance = 0.2126 * r + 0.7152 * g + 0.0722 * b;

  return luminance > 140 ? "#000" : "#fff";
}

export function toWebsocketMessageType(
  value: string
): WebsocketMessageType | null {
  return Object.values(WebsocketMessageType).includes(
    value as WebsocketMessageType
  )
    ? (value as WebsocketMessageType)
    : null;
}

export interface WordAtCursorToken {
  word: string;
  isWordSpecial: boolean;
  start: number;
  end: number;
}

export function getWordAtCursor(
  value: string,
  cursorPos: number
): WordAtCursorToken | null {
  if (!value || cursorPos < 0) return null;

  let start = cursorPos;
  let end = cursorPos;

  while (start > 0 && !/\s/.test(value[start - 1])) {
    start--;
  }

  while (end < value.length && !/\s/.test(value[end])) {
    end++;
  }

  const word = value.slice(start, end);
  const isWordSpecial = specialWordRegex.test(word);

  return word
    ? {
        word,
        isWordSpecial,
        start,
        end,
      }
    : null;
}
