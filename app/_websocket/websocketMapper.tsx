import {
  WebsocketChatMessage,
  WebsocketIncomingMessageResponse,
  WebsocketInitChannels,
  WebsocketInitMembers,
  WebsocketInitResponse,
  WebsocketInitServer,
  WebsocketPlaylist,
  WebsocketPlaylistStateUpdate,
  WebsocketVoiceUpdateResponse,
} from "./types/websocket_init.types";

// to-do: parse guard, but im not sure what
export function loadInitResponseToObject(message: any): WebsocketInitResponse {
  const rawData = JSON.parse(message);

  const parsed: WebsocketInitResponse = {
    servers: rawData?.message?.map((guild: WebsocketInitServer) => ({
      guildId: guild.guildId,
      guildName: guild.guildName,
      iconUrl: guild.iconUrl,
      channels: guild.channels?.map((ch: WebsocketInitChannels) => ({
        channelId: ch.channelId,
        name: ch.name,
        type: ch.type,
        connectedMemberIds: ch.connectedMemberIds,
      })),
      members: guild.members?.map((m: WebsocketInitMembers) => ({
        memberId: m.memberId,
        name: m.name,
        displayName: m.displayName,
        avatarUrl: m.avatarUrl,
        bot: m.bot,
      })),
    })),
  };

  return parsed;
}

export function loadIncomingMessageToObject(
  message: any
): WebsocketIncomingMessageResponse {
  const data = JSON.parse(message);

  const parsed: WebsocketIncomingMessageResponse = {
    channelId: data?.message?.channelId,
    serverId: data?.message?.serverId,
    messageId: data?.message?.messageId,
    userId: data?.message?.userId,
    text: data?.message?.text,
    epoch: data?.message?.epoch,
  };

  return parsed;
}

export function loadIncomingVoiceUpdateToObject(
  message: any
): WebsocketVoiceUpdateResponse {
  const data = JSON.parse(message);

  const parsed: WebsocketVoiceUpdateResponse = {
    serverId: data?.message?.serverId,
    memberId: data?.message?.memberId,
    epoch: data?.message?.epoch,
    beforeChannel: data?.message?.beforeChannel,
    afterChannel: data?.message?.afterChannel,
  };

  return parsed;
}

export function loadIncomingPlaylistToObject(message: any): WebsocketPlaylist {
  const data = JSON.parse(message);

  const parsed: WebsocketPlaylist = {
    serverId: data?.message?.serverId,
    playlistState: {
      serverId: data?.message?.serverId,
      selectedSong: data?.message?.playlistState?.music,
      selectedModifiedAt: data?.message?.playlistState?.modifiedAt,
      isPlaying: data?.message?.playlistState?.isPlaying,
      songs: data?.message?.songs,
      playedDuration: 0, // default
    },
  };

  return parsed;
}

export function loadIncomingPlaylistStateUpdateToObject(
  message: any
): WebsocketPlaylistStateUpdate {
  const data = JSON.parse(message);

  const parsed: WebsocketPlaylistStateUpdate = {
    serverId: data?.message?.serverId,
    selectedSong: data?.message?.playlistState?.music,
    selectedModifiedAt: data?.message?.playlistState?.modifiedAt,
    isPlaying: data?.message?.playlistState?.isPlaying,
  };

  return parsed;
}

export const incomingMessageMockData: WebsocketChatMessage[] = Array.from(
  { length: 30 },
  (_, i) => i + 1
).map((v, i) => {
  return {
    channelId: "802245735994884154",
    messageId: "1439176029838114848" + i,
    userId: "802239701738192977",
    text: "test" + i,
    epoch: 1763196703 + i * 300,
  } as WebsocketChatMessage;
});
