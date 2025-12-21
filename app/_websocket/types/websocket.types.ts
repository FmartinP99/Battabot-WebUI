import {
  WebsocketGetMusicPlaylistQuery,
  WebsocketInitChannels,
  WebsocketInitMembers,
  WebsocketMessageType,
  WebsocketPlaylistPauseQuery,
  WebsocketPlaylistResumeQuery,
  WebsocketPlaylistSongSkipQuery,
  WebsocketSendMessageQuery,
  WebsocketSetReminderQuery,
  WebsocketVoiceStateUpdateQuery,
} from "./websocket_init.types";
import {
  WebsocketChatMessage,
  WebsocketInitServerReduced,
} from "./websocket_init_reduced.types";

export interface WebSocketMessage {
  type: WebsocketMessageType;
  message:
    | WebsocketSetReminderQuery
    | WebsocketPlaylistSongSkipQuery
    | WebsocketVoiceStateUpdateQuery
    | WebsocketGetMusicPlaylistQuery
    | WebsocketSendMessageQuery
    | WebsocketPlaylistPauseQuery
    | WebsocketPlaylistResumeQuery
    | WebsocketPlaylistSongSkipQuery;
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
