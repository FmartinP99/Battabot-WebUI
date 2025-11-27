import { WebsocketChatMessage } from "../_websocket/types/websocket_init.types";

export function formatEpoch(epoch: number): string {
  if (epoch < 1e12) epoch *= 1000;

  const date = new Date(epoch);
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
  const yesterdayStart = todayStart - 24 * 60 * 60 * 1000;

  if (epoch >= todayStart) {
    return HHmm;
  }

  if (epoch >= yesterdayStart) {
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
