import {
  WebsocketChatMessage,
  WebsocketIncomingMessageResponse,
  WebsocketInitChannels,
  WebsocketInitMembers,
  WebsocketInitResponse,
  WebsocketInitRoles,
  WebsocketInitServer,
  WebsocketPlaylist,
  WebsocketPlaylistStateUpdate,
  WebsocketPresenceUpdate,
  WebsocketVoiceUpdateResponse,
} from "./types/websocket_init.types";

// to-do: parse guard, but im not sure what
export function loadInitResponseToObject(
  message: string
): WebsocketInitResponse {
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
        status: m.status,
        roleIds: m.roleIds,
      })),
      roles: guild.roles?.map((r: WebsocketInitRoles) => ({
        id: r.id,
        name: r.name,
        priority: r.priority,
        color: r.color,
        displaySeparately: r.displaySeparately,
      })),
    })),
  };

  return parsed;
}

export function loadIncomingMessageToObject(
  message: string
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
  message: string
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

export function loadIncomingPlaylistToObject(
  message: string
): WebsocketPlaylist {
  const data = JSON.parse(message);

  const parsed: WebsocketPlaylist = {
    serverId: data?.message?.serverId,
    playlistState: {
      serverId: data?.message?.serverId,
      selectedSong: data?.message?.playlistState?.music,
      selectedModifiedAt: data?.message?.playlistState?.modifiedAt,
      isPlaying: data?.message?.playlistState?.isPlaying,
      songs: data?.message?.songs,
      playedDuration: data?.message?.playlistState?.playedDuration ?? 0, // default
    },
  };

  return parsed;
}

export function loadIncomingPlaylistStateUpdateToObject(
  message: string
): WebsocketPlaylistStateUpdate {
  const data = JSON.parse(message);

  const parsed: WebsocketPlaylistStateUpdate = {
    serverId: data?.message?.serverId,
    selectedSong: data?.message?.playlistState?.music,
    selectedModifiedAt: data?.message?.playlistState?.modifiedAt,
    isPlaying: data?.message?.playlistState?.isPlaying,
    playedDuration: data?.message?.playlistState?.playedDuration ?? 0,
  };

  return parsed;
}

export function loadIncomingPresenceUpdateToObject(
  message: string
): WebsocketPresenceUpdate {
  const data = JSON.parse(message);

  const parsed: WebsocketPresenceUpdate = {
    serverId: data?.message?.serverId,
    memberId: data?.message?.memberId,
    newStatus: data?.message?.newStatus,
    newDisplayName: data?.message?.newDisplayName,
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
