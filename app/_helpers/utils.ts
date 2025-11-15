import { WebsocketChatMessage } from "../_websocket/interfaces/websocket_init.interface";

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
      msg.epoch - currentGroup[currentGroup.length - 1].epoch <= TEN_MINUTES
    ) {
      // Add to current group
      currentGroup.push(msg);
    } else {
      // Start new group
      currentGroup = [{ ...msg }];
      groups.push(currentGroup);
    }
  }

  return groups;
}