import {
  WebsocketGetMusicPlaylistQuery,
  WebsocketMessageType,
  WebsocketPlaylistPauseQuery,
  WebsocketPlaylistResumeQuery,
  WebsocketPlaylistSongSkipQuery,
  WebsocketSendMessageQuery,
  WebsocketSetReminderQuery,
  WebsocketVoiceStateUpdateQuery,
} from "./websocket_init.types";

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
