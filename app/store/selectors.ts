import { WebsocketMessageType } from "../_websocket/types/websocket_init.types";
import { RootState } from "../store/store";

export const selectWebSocketState = (state: RootState) => state.websocket;

export const selectSocketReady = (state: RootState) =>
  state.websocket.socketReady;

export const selectServers = (state: RootState) => state.websocket.servers;

export const selectSelectedServerId = (state: RootState) =>
  state.websocket.selectedServerId;

export const selectSelectedServer = (state: RootState) =>
  state.websocket.servers.find(
    (server) => server.guildId === state.websocket.selectedServerId
  );

export const selectChannels = (state: RootState) => state.websocket.channels;

export const selectChannelByActiveServer = (
  state: RootState,
  channelId: string
) => {
  const selectedServerId = selectSelectedServerId(state);
  if (!selectedServerId) return null;
  return (
    state.websocket.channels[selectedServerId].find(
      (ch) => ch.channelId === channelId
    ) ?? null
  );
};
export const selectMembers = (state: RootState) => state.websocket.members;

export const selectMembersByServerId = (state: RootState, serverId: string) =>
  state.websocket.members[serverId] ?? [];

export const selectAllMembersByActiveServer = (state: RootState) => {
  const selectedServerId = selectSelectedServerId(state);
  if (!selectedServerId) return undefined;
  return state.websocket.members[selectedServerId];
};

export const selectMemberByActiveServer = (
  state: RootState,
  memberId: string
) => {
  const selectedServerId = selectSelectedServerId(state);
  if (!selectedServerId) return undefined;
  return state.websocket.members[selectedServerId]?.find(
    (mem) => mem.memberId === memberId
  );
};

export const selectMessages = (state: RootState) => state.websocket.messages;

export const selectMessagesByServerId = (state: RootState, serverId: string) =>
  state.websocket.messages[serverId] ?? [];

export const selectSelectedChannelId = (state: RootState, serverId: string) =>
  state.websocket.lastSelectedChannelIds[serverId];

export const selectSongsForSelectedServer = (state: RootState) => {
  const serverId = selectSelectedServerId(state);
  if (!serverId) return null;
  return state.websocket.playlistStates[serverId]?.songs;
};

export const selectPlaylistState = (state: RootState, serverId: string) =>
  state.websocket.playlistStates[serverId];

export const selectRolesByServerId = (state: RootState, serverId: string) =>
  state.websocket.roles[serverId];

export const selectRemindersByServerIdAndMemberId = (
  state: RootState,
  serverId: string,
  memberId: string
) => state.websocket.currentReminders[serverId]?.[memberId] ?? [];

export const selectLoader = (state: RootState, key: WebsocketMessageType) =>
  state.websocket.loaders[key];
