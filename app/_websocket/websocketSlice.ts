import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  WebsocketInitServerReduced,
  WebsocketInitChannels,
  WebsocketInitMembers,
  WebsocketChatMessage,
} from "./types/websocket_init.types";

interface WebSocketState {
  socketReady: boolean;
  websocket: WebSocket | null;
  servers: WebsocketInitServerReduced[];
  channels: Record<string, WebsocketInitChannels[]>;
  members: Record<string, WebsocketInitMembers[]>;
  messages: Record<string, WebsocketChatMessage[]>;
  selectedServerId?: string;
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
} = websocketSlice.actions;

export default websocketSlice.reducer;
