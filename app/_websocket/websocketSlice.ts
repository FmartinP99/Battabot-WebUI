import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  WebsocketInitServerReduced,
  WebsocketInitChannels,
  WebsocketInitMembers,
  WebsocketChatMessage,
  WebsocketVoiceUpdateResponse,
} from "./types/websocket_init.types";

interface WebSocketState {
  socketReady: boolean;
  websocket: WebSocket | null;
  servers: WebsocketInitServerReduced[];
  channels: Record<string, WebsocketInitChannels[]>;
  members: Record<string, WebsocketInitMembers[]>;
  messages: Record<string, WebsocketChatMessage[]>;
  selectedServerId?: string;
  selectedChannelId?: string;
}

const initialState: WebSocketState = {
  socketReady: false,
  websocket: null,
  servers: [],
  channels: {},
  members: {},
  messages: {},
  selectedServerId: undefined,
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
      console.log(state.selectedChannelId);
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
        const ch = channels.find((c) => c.channelId === afterChannel);
        if (ch) {
          if (!ch.connectedMemberIds.includes(memberId)) {
            ch.connectedMemberIds.push(memberId);
          }
        }
      }

      if (beforeChannel) {
        const ch = channels.find((c) => c.channelId === beforeChannel);
        if (ch) {
          ch.connectedMemberIds = ch.connectedMemberIds.filter(
            (id) => id !== memberId
          );
        }
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
  setMessages,
  addMessage,
  setSelectedServerId,
  setSelectedChannelId,
  setVoiceEvent,
} = websocketSlice.actions;

export default websocketSlice.reducer;
