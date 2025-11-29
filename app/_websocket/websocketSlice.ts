import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  WebsocketInitServerReduced,
  WebsocketInitChannels,
  WebsocketInitMembers,
  WebsocketChatMessage,
  WebsocketVoiceUpdateResponse,
  WebsocketPlaylist,
  WebsocketPlaylistStateUpdate,
} from "./types/websocket_init.types";
import {
  Music,
  PlaylistState,
} from "../_components/server/musicPlayer/types/music.type";
import { clamp } from "../helpers/utils";

interface WebSocketState {
  socketReady: boolean;
  websocket: WebSocket | null;
  servers: WebsocketInitServerReduced[];
  channels: Record<string, WebsocketInitChannels[]>;
  members: Record<string, WebsocketInitMembers[]>;
  messages: Record<string, WebsocketChatMessage[]>;
  selectedServerId: string | null;
  selectedChannelId: string | null;
  playlistStates: Record<string, PlaylistState>;
}

const initialState: WebSocketState = {
  socketReady: false,
  websocket: null,
  servers: [] as WebsocketInitServerReduced[],
  channels: {} as Record<string, WebsocketInitChannels[]>,
  members: {} as Record<string, WebsocketInitMembers[]>,
  messages: {} as Record<string, WebsocketChatMessage[]>,
  selectedServerId: null,
  selectedChannelId: null,
  playlistStates: {} as Record<string, PlaylistState>,
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
      }
    },
    setSelectedChannelId(state, action: PayloadAction<string>) {
      if (!state.selectedServerId) return;
      const channel = state.channels?.[state.selectedServerId]?.find(
        (ch) => ch.channelId === action.payload
      );
      if (!channel) return;
      state.selectedChannelId = action.payload;
    },
    setVoiceEvent(state, action: PayloadAction<WebsocketVoiceUpdateResponse>) {
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

    setPlaylistState(state, action: PayloadAction<WebsocketPlaylist>) {
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
      action: PayloadAction<WebsocketPlaylistStateUpdate>
    ) {
      const { serverId, selectedModifiedAt, selectedSong, isPlaying } =
        action.payload;

      if (!serverId) return;
      const playlistState = state.playlistStates[serverId];
      if (!playlistState) return;

      playlistState.isPlaying = isPlaying ?? false;
      playlistState.selectedModifiedAt = selectedModifiedAt;
      playlistState.selectedSong = selectedSong;
    },
  },
});

export const {
  setSocketReady,
  setWebSocket,
  setServers,
  setChannels,
  setMembers,
  setMessages,
  addMessage,
  setSelectedServerId,
  setSelectedChannelId,
  setVoiceEvent,
  setPlaylistState,
  updatePlaylistState,
  incrementPlaylistPlayedDuration,
} = websocketSlice.actions;

export default websocketSlice.reducer;
