import {
  WebsocketMessageType,
  WebsocketGetMusicPlaylistQuery,
  WebsocketGetRemindersQuery,
  WebsocketInitQuery,
  WebsocketPlaylistPauseQuery,
  WebsocketPlaylistResumeQuery,
  WebsocketPlaylistSongSkipQuery,
  WebsocketSendMessageQuery,
  WebsocketSetReminderQuery,
  WebsocketVoiceStateUpdateQuery,
} from "./websocket_init.types";

export type WebSocketMessageMap = {
  [WebsocketMessageType.INIT]: WebsocketInitQuery;
  [WebsocketMessageType.SET_REMINDER]: WebsocketSetReminderQuery;
  [WebsocketMessageType.SEND_MESSAGE]: WebsocketSendMessageQuery;
  [WebsocketMessageType.VOICE_STATE_UPDATE]: WebsocketVoiceStateUpdateQuery;
  [WebsocketMessageType.GET_MUSIC_PLAYLIST]: WebsocketGetMusicPlaylistQuery;
  [WebsocketMessageType.PLAYLIST_SONG_SKIP]: WebsocketPlaylistSongSkipQuery;
  [WebsocketMessageType.PLAYLIST_PAUSE]: WebsocketPlaylistPauseQuery;
  [WebsocketMessageType.PLAYLIST_RESUME]: WebsocketPlaylistResumeQuery;
  [WebsocketMessageType.GET_REMINDERS]: WebsocketGetRemindersQuery;
};

export type WebSocketMessage = {
  [K in keyof WebSocketMessageMap]: {
    type: K;
    message: WebSocketMessageMap[K];
  };
}[keyof WebSocketMessageMap];
