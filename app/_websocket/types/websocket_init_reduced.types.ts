import { WebsocketIncomingMessageResponse, WebsocketInitServer } from "./websocket_init.types";

export type WebsocketInitServerReduced = Omit<
  WebsocketInitServer,
  "channels" | "members" | "roles"
>;

export type WebsocketChatMessage = Omit<
  WebsocketIncomingMessageResponse,
  "serverId"
>;