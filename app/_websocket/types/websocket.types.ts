import { WebsocketMessageType } from "../enums/websocket_message_type.enum";
import {
  WebsocketChatMessage,
  WebsocketInitChannels,
  WebsocketInitMembers,
  WebsocketInitServerReduced,
} from "./websocket_init.types";

export interface WebSocketMessage {
  type: WebsocketMessageType;
  message: Record<string, unknown>;
}

export interface WebsocketProviderValue {
  socketReady: boolean;
  websocket: WebSocket | null;
  sendMessage: (_message: WebSocketMessage) => boolean;
  createWebSocket: () => void;

  servers: WebsocketInitServerReduced[];
  channels: Map<string, WebsocketInitChannels[]>;
  members: Map<string, WebsocketInitMembers[]>;
  selectedServerId?: string;
  setSelectedServerId: (id: string) => void;
  messages: Map<string, WebsocketChatMessage[]>;
}
