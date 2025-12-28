import { WebsocketReminderStatus } from "@/app/_websocket/types/websocket_init.types";

export const statusClassMap = {
  [WebsocketReminderStatus.HAPPENED]: "text-green-500",
  [WebsocketReminderStatus.DUE]: "text-red-500",
  [WebsocketReminderStatus.PENDING]: "text-yellow-500",
};
