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

export const selectChannelsByServerId = (state: RootState, serverId: string) =>
  state.websocket.channels[serverId] ?? [];

export const selectMembers = (state: RootState) => state.websocket.members;

export const selectMembersByServerId = (state: RootState, serverId: string) =>
  state.websocket.members[serverId] ?? [];

export const selectMembersByActiveServer = (state: RootState) => {
  const selectedServerId = selectSelectedServerId(state);
  if (!selectedServerId) return undefined;
  return state.websocket.members[selectedServerId];
};

export const selectMessages = (state: RootState) => state.websocket.messages;

export const selectMessagesByServerId = (state: RootState, serverId: string) =>
  state.websocket.messages[serverId] ?? [];

export const selectSelectedChannelId = (state: RootState) =>
  state.websocket.selectedChannelId;

export const selectSongs = (state: RootState, serverId: string) =>
  state.websocket.playlistStates[serverId]?.songs;

export const selectPlaylistState = (state: RootState, serverId: string) =>
  state.websocket.playlistStates[serverId];

export const selectRolesByServerId = (state: RootState, serverId: string) =>
  state.websocket.roles[serverId];
