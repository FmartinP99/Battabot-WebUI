import { MemberStatus } from "../_components/server/member/enums/memberStatus.enum";
import {
  WebsocketIncomingMessageResponse,
  WebsocketInitChannels,
  WebsocketInitMembers,
  WebsocketInitResponse,
  WebsocketInitRoles,
  WebsocketInitServer,
  WebsocketGetMusicPlaylistResponse,
  WebsocketPlaylistStateUpdateResponse,
  WebsocketPresenceUpdateResponse,
  WebsocketToggleRoleResponse,
  WebsocketVoiceStateUpdateResponse,
  ChannelType,
  WebsocketGetRemindersResponse,
} from "./types/websocket_init.types";
import { WebsocketChatMessage } from "./types/websocket_init_reduced.types";

function tryParseJson(data: string) {
  let rawData: any;
  try {
    rawData = JSON.parse(data);
  } catch (error) {
    rawData = null;
  }
  return rawData;
}

export function loadInitResponseToObject(
  message: string
): WebsocketInitResponse {
  const data = tryParseJson(message);

  const parsed: WebsocketInitResponse = {
    servers: data?.message?.serverDatas?.map((guild: WebsocketInitServer) => ({
      guildId: guild.guildId,
      guildName: guild.guildName ?? "Undefined",
      iconUrl: guild.iconUrl ?? "",
      channels: guild.channels?.map((ch: WebsocketInitChannels) => ({
        channelId: ch.channelId,
        name: ch.name ?? "Undefined",
        type: ch.type ?? ChannelType.Category,
        connectedMemberIds: ch.connectedMemberIds ?? [],
      })),
      members: guild.members?.map((m: WebsocketInitMembers) => ({
        memberId: m.memberId,
        name: m.name ?? "Undefined",
        displayName: m.displayName ?? "Undefined",
        avatarUrl: m.avatarUrl ?? "",
        bot: m.bot ?? false,
        status: m.status ?? MemberStatus.OFFLINE,
        roleIds: m.roleIds ?? [],
        activityName: m.activityName,
      })),
      roles: guild.roles?.map((r: WebsocketInitRoles) => ({
        id: r.id,
        name: r.name ?? "Undefined",
        priority: r.priority ?? -1,
        color: r.color ?? "#000000",
        displaySeparately: r.displaySeparately ?? false,
      })),
    })),
  };

  return parsed;
}

export function loadIncomingMessageToObject(
  message: string
): WebsocketIncomingMessageResponse {
  const data = tryParseJson(message);

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
): WebsocketVoiceStateUpdateResponse {
  const data = tryParseJson(message);

  const parsed: WebsocketVoiceStateUpdateResponse = {
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
): WebsocketGetMusicPlaylistResponse {
  const data = tryParseJson(message);

  const parsed: WebsocketGetMusicPlaylistResponse = {
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
): WebsocketPlaylistStateUpdateResponse {
  const data = tryParseJson(message);

  const parsed: WebsocketPlaylistStateUpdateResponse = {
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
): WebsocketPresenceUpdateResponse {
  const data = tryParseJson(message);

  const parsed: WebsocketPresenceUpdateResponse = {
    serverId: data?.message?.serverId,
    memberId: data?.message?.memberId,
    newStatus: data?.message?.newStatus,
    newDisplayName: data?.message?.newDisplayName,
    newActivityName: data?.message?.newActivityName,
  };

  return parsed;
}

export function loadIncomingToggleRoleResponseToObject(
  message: string
): WebsocketToggleRoleResponse {
  const data = tryParseJson(message);

  const parsed: WebsocketToggleRoleResponse = {
    serverId: data?.message?.serverId,
    roleId: data?.message?.roleId,
    memberId: data?.message?.memberId,
    roleIsAdded: data?.message?.roleIsAdded,
  };

  return parsed;
}

export function loadIncomingGetRemindersResponseToObject(
  message: string
): WebsocketGetRemindersResponse {
  const data = tryParseJson(message);

  const parsed: WebsocketGetRemindersResponse = {
    success: data?.message?.success ?? false,
    errorText: data?.message?.errorText,
    serverId: data?.message?.serverId,
    memberId: data?.message?.memberId,
    reminders: data?.message?.reminders,
  };

  return parsed;
}

export const incomingMessageMockData: WebsocketChatMessage[] = Array.from(
  { length: 300 },
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
