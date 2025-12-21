import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  WebsocketInitChannels,
  WebsocketInitMembers,
  WebsocketVoiceStateUpdateResponse,
  WebsocketGetMusicPlaylistResponse,
  WebsocketPlaylistStateUpdateResponse,
  WebsocketPresenceUpdateResponse,
  WebsocketInitRoles,
  WebsocketToggleRoleResponse,
  WebsocketPlaylistState,
} from "./types/websocket_init.types";
import { clamp } from "../helpers/utils";
import { isGuildText } from "../_components/server/channel/helpers/channel_helpers";
import { WebsocketChatMessage, WebsocketInitServerReduced } from "./types/websocket_init_reduced.types";

interface WebSocketState {
  socketReady: boolean;
  websocket: WebSocket | null;
  gmtOffsetInHour: number;
  servers: WebsocketInitServerReduced[];
  channels: Record<string, WebsocketInitChannels[]>;
  members: Record<string, WebsocketInitMembers[]>;
  roles: Record<string, WebsocketInitRoles[]>;
  messages: Record<string, WebsocketChatMessage[]>;
  selectedServerId: string | null;
  lastSelectedChannelIds: Record<string, string>;
  playlistStates: Record<string, WebsocketPlaylistState>;
}

const initialState: WebSocketState = {
  socketReady: false,
  websocket: null,
  gmtOffsetInHour: 0,
  servers: [] as WebsocketInitServerReduced[],
  channels: {} as Record<string, WebsocketInitChannels[]>,
  members: {} as Record<string, WebsocketInitMembers[]>,
  roles: {} as Record<string, WebsocketInitRoles[]>,
  messages: {} as Record<string, WebsocketChatMessage[]>,
  selectedServerId: null,
  lastSelectedChannelIds: {} as Record<string, string>,
  playlistStates: {} as Record<string, WebsocketPlaylistState>,
};

const websocketSlice = createSlice({
  name: "websocket",
  initialState,
  reducers: {
    setSocketReady(state, action: PayloadAction<boolean>) {
      state.socketReady = action.payload;
    },
    setWebSocket(state, action: PayloadAction<WebSocket | null>) {
      if (action.payload) {
        state.websocket = action.payload;
      }
    },
    setServers(state, action: PayloadAction<WebsocketInitServerReduced[]>) {
      state.servers = action.payload;
    },
    setChannels(
      state,
      action: PayloadAction<Record<string, WebsocketInitChannels[]>>
    ) {
      state.channels = action.payload;
    },
    setMembers(
      state,
      action: PayloadAction<Record<string, WebsocketInitMembers[]>>
    ) {
      state.members = action.payload;
    },
    setRoles(
      state,
      action: PayloadAction<Record<string, WebsocketInitRoles[]>>
    ) {
      state.roles = action.payload;
    },
    setMessages(
      state,
      action: PayloadAction<Record<string, WebsocketChatMessage[]>>
    ) {
      state.messages = action.payload;
    },
    addMessage(
      state,
      action: PayloadAction<{ serverId: string; message: WebsocketChatMessage }>
    ) {
      const { serverId, message } = action.payload;
      const serverMessages = state.messages[serverId] ?? [];
      if (!serverMessages.some((msg) => msg.messageId === message.messageId)) {
        state.messages[serverId] = [...serverMessages, message];
      }
    },
    setSelectedServerId(state, action: PayloadAction<string>) {
      if (state.servers.map((s) => s.guildId).includes(action.payload)) {
        state.selectedServerId = action.payload;

        const lastSelectedChannelId =
          state.lastSelectedChannelIds[action.payload];
        if (lastSelectedChannelId) return;

        const firstTextChannel = state.channels[action.payload]?.find((ch) =>
          isGuildText(ch.type)
        );
        if (!firstTextChannel) return;

        state.lastSelectedChannelIds[action.payload] =
          firstTextChannel.channelId;
      }
    },
    setSelectedChannelId(state, action: PayloadAction<string>) {
      if (!state.selectedServerId) return;
      const channel = state.channels?.[state.selectedServerId]?.find(
        (ch) => ch.channelId === action.payload
      );
      if (!channel) return;
      state.lastSelectedChannelIds[state.selectedServerId] = action.payload;
    },
    setVoiceEvent(
      state,
      action: PayloadAction<WebsocketVoiceStateUpdateResponse>
    ) {
      const serverId = action.payload.serverId;
      const memberId = action.payload.memberId;
      if (!serverId || !memberId) return;

      const channels = state.channels[action.payload.serverId];
      if (!channels) return;

      // if there is no before channel its a new connect, if theres no after channel its a disconnect - by discordpy
      const afterChannel = action.payload.afterChannel;
      const beforeChannel = action.payload.beforeChannel;

      // does nothing
      if (!afterChannel && !beforeChannel) return;

      // if there is a join
      if (afterChannel) {
        const channel = channels.find((c) => c.channelId === afterChannel);
        if (channel && !channel.connectedMemberIds.includes(memberId)) {
          channel.connectedMemberIds.push(memberId);
        }
      }

      if (beforeChannel) {
        const channel = channels.find((c) => c.channelId === beforeChannel);
        if (channel) {
          channel.connectedMemberIds = channel.connectedMemberIds.filter(
            (id) => id !== memberId
          );
        }
      }
    },

    setPlaylistState(
      state,
      action: PayloadAction<WebsocketGetMusicPlaylistResponse>
    ) {
      const playlistState = action.payload.playlistState;
      if (!playlistState) return;
      state.playlistStates[action.payload.serverId] = playlistState;
    },

    // increments it by a value
    incrementPlaylistPlayedDuration(state, action: PayloadAction<number>) {
      const selectedServerId = state.selectedServerId;
      if (!selectedServerId) return;
      const playlistState = state.playlistStates[selectedServerId];
      if (!playlistState) return;

      const { playedDuration, selectedSong } = playlistState;
      const maximumDuration = selectedSong.length;
      const next = playedDuration + action.payload;
      playlistState.playedDuration = clamp(next, 0, maximumDuration);
    },

    // sets it to an exact value
    setPlaylistPlayedDuration(state, action: PayloadAction<number>) {
      const selectedServerId = state.selectedServerId;
      if (!selectedServerId) return;
      const playlistState = state.playlistStates[selectedServerId];
      if (!playlistState) return;
      const maximumDuration = playlistState.selectedSong.length;
      const next = action.payload;
      playlistState.playedDuration = clamp(next, 0, maximumDuration);
    },

    updatePlaylistState(
      state,
      action: PayloadAction<WebsocketPlaylistStateUpdateResponse>
    ) {
      const {
        serverId,
        selectedModifiedAt,
        selectedSong,
        isPlaying,
        playedDuration,
      } = action.payload;

      if (!serverId) return;
      const playlistState = state.playlistStates[serverId];
      if (!playlistState) return;

      playlistState.isPlaying = isPlaying ?? false;
      playlistState.selectedModifiedAt = selectedModifiedAt;
      playlistState.selectedSong = selectedSong;
      playlistState.playedDuration = playedDuration;
    },

    updatePresenceStates(
      state,
      action: PayloadAction<WebsocketPresenceUpdateResponse>
    ) {
      const { serverId, memberId, newDisplayName, newActivityName, newStatus } =
        action.payload;
      if (!serverId || !memberId) return;

      const member = state.members[serverId]?.find(
        (mem) => mem.memberId === memberId
      );
      if (!member) return;

      member.status = newStatus;
      member.displayName = newDisplayName;
      member.activityName = newActivityName;
    },

    setRoleForMember(
      state,
      action: PayloadAction<WebsocketToggleRoleResponse>
    ) {
      const { serverId, roleId, memberId, roleIsAdded } = action.payload;
      if (!serverId || !roleId || !memberId) return;

      const member = state.members[serverId]?.find(
        (mem) => mem.memberId === memberId
      );
      if (!member) return;

      const rolesOfServer = state.roles[serverId];
      if (!rolesOfServer) return;

      const modifiedRole = rolesOfServer.find((r) => r.id === roleId);
      if (!modifiedRole) return;

      if (roleIsAdded) {
        // to keep the RoleId array in descending priority order
        const newRolePriority = modifiedRole.priority ?? -1;
        const priorityMap = new Map(
          rolesOfServer.map((r) => [r.id, r.priority])
        );
        const priorities = member.roleIds?.map(
          (id) => priorityMap.get(id) ?? -1
        );

        let insertIndex = member.roleIds?.length;
        for (let i = 0; i < priorities.length; i++) {
          if (newRolePriority > priorities[i]) {
            insertIndex = i;
            break;
          }
        }
        member.roleIds?.splice(insertIndex, 0, modifiedRole.id);
      } else {
        member.roleIds = member.roleIds.filter((_roleId) => _roleId !== roleId);
      }
    },
  },
});

export const {
  setSocketReady,
  setWebSocket,
  setServers,
  setChannels,
  setMembers,
  setRoles,
  setMessages,
  addMessage,
  setSelectedServerId,
  setSelectedChannelId,
  setVoiceEvent,
  setPlaylistState,
  updatePlaylistState,
  incrementPlaylistPlayedDuration,
  setPlaylistPlayedDuration,
  updatePresenceStates,
  setRoleForMember,
} = websocketSlice.actions;

export default websocketSlice.reducer;
