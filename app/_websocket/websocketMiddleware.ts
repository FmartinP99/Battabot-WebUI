import { Middleware } from "@reduxjs/toolkit";
import { WebSocketMessage } from "./types/websocket.types";
import { WebsocketMessageType } from "./enums/websocket_message_type.enum";
import {
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
} from "./websocketSlice";
import {
  loadIncomingMessageToObject,
  loadInitResponseToObject,
  incomingMessageMockData,
  loadIncomingVoiceUpdateToObject,
  loadIncomingPlaylistToObject,
  loadIncomingPlaylistStateUpdateToObject,
} from "./websocketMapper";
import {
  WebsocketChatMessage,
  WebsocketInitChannels,
  WebsocketInitMembers,
} from "./types/websocket_init.types";

export const websocketMiddleware: Middleware =
  (store: any) => (next: any) => (action: any) => {
    if (action.type === "websocket/connect") {
      const socket = new WebSocket("ws://localhost:8001/ws");

      socket.onopen = () => {
        console.log("✅ Connected to backend!");
        store.dispatch(setSocketReady(true));
        store.dispatch(setWebSocket(socket));

        const payload: WebSocketMessage = {
          type: WebsocketMessageType.INIT,
          message: { text: "Hello from the frontend!" },
        };
        socket.send(JSON.stringify(payload));
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        console.dir(message);

        switch (message.msgtype) {
          case "init":
            const initParsed = loadInitResponseToObject(event.data);
            if (!initParsed?.servers) return;

            const _servers = initParsed.servers;
            const _channels: Record<string, WebsocketInitChannels[]> = {};

            const _members: Record<string, WebsocketInitMembers[]> = {};

            const _messages: Record<string, WebsocketChatMessage[]> = {};

            initParsed.servers.forEach((server) => {
              _channels[server.guildId] =
                server.channels.filter((chn) => chn.channelId) ?? [];
              _members[server.guildId] =
                server.members?.filter((mem) => mem.memberId) ?? [];
              _messages[server.guildId] = [];
            });

            _messages["762674310187843607"] = incomingMessageMockData;

            store.dispatch(setServers(_servers ?? []));
            store.dispatch(setChannels(_channels));
            store.dispatch(setMembers(_members));
            store.dispatch(setMessages(_messages));
            store.dispatch(setSelectedServerId(_servers[0]?.guildId ?? null));
            store.dispatch(
              setSelectedChannelId(
                _channels[_servers[0].guildId ?? null]?.[0].channelId ?? null
              )
            );
            break;

          case "incomingMessage":
            const incoming = loadIncomingMessageToObject(event.data);
            store.dispatch(
              addMessage({
                serverId: incoming.serverId,
                message: {
                  userId: incoming.userId,
                  channelId: incoming.channelId,
                  text: incoming.text,
                  epoch: incoming.epoch,
                  messageId: incoming.messageId,
                },
              })
            );
            break;
          case "voiceStateUpdate":
            const voiceUpdate = loadIncomingVoiceUpdateToObject(event.data);
            store.dispatch(setVoiceEvent(voiceUpdate));
            break;

          case WebsocketMessageType.GET_MUSIC_PLAYLIST:
            const playlist = loadIncomingPlaylistToObject(event.data);
            store.dispatch(setPlaylistState(playlist));
            break;

          case WebsocketMessageType.PLAYLIST_STATE_UPDATE:
            const playlistStateUpdate = loadIncomingPlaylistStateUpdateToObject(
              event.data
            );
            store.dispatch(updatePlaylistState(playlistStateUpdate));

            break;
        }
      };

      socket.onclose = () => {
        console.log("❌ WebSocket closed");
        store.dispatch(setSocketReady(false));
      };

      socket.onerror = (err) => {
        console.error("⚠️ WebSocket error", err);
      };
    }

    if (action.type === "websocket/sendMessage") {
      const state = store.getState() as any;
      const socket: WebSocket | null = state.websocket.websocket;
      const socketReady: boolean = state.websocket.socketReady;

      if (socket && socketReady) {
        socket.send(JSON.stringify(action.payload));
      } else {
        console.warn("Socket not ready yet");
      }
    }

    return next(action);
  };
