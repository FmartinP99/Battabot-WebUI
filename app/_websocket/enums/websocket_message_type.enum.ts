export enum WebsocketMessageType {
  NULL = "",
  INIT = "init",
  SEND_MESSAGE = "sendMessage",
  INCOMING_MESSAGE = "incomingMessage",
  SET_REMINDER = "setReminder",
  VOICE_STATE_UPDATE = "voiceStateUpdate",
  GET_MUSIC_PLAYLIST = "getMusicPlaylist",
  PLAYLIST_STATE_UPDATE = "playlistStateUpdate",
  PLAYLIST_SONG_SKIP = "playlistSongSkip",
  PLAYLIST_PAUSE = "playlistPause",
  PLAYLIST_RESUME = "playlistResume",
}
