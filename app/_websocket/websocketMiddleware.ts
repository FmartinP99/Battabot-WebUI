import { Middleware } from "@reduxjs/toolkit";
import { WebSocketMessage } from "./types/websocket.types";
import {
  setSocketReady,
  setWebSocket,
  setServers,
  setChannels,
  setMembers,
  setMessages,
  addMessage,
  setSelectedServerId,
  setVoiceEvent,
  setPlaylistState,
  updatePlaylistState,
  updatePresenceStates,
  setRoles,
  setRoleForMember,
  setReminders,
  setLoader,
  setGmtOffset,
} from "./websocketSlice";
import {
  loadIncomingMessageToObject,
  loadInitResponseToObject,
  incomingMessageMockData,
  loadIncomingVoiceUpdateToObject,
  loadIncomingPlaylistToObject,
  loadIncomingPlaylistStateUpdateToObject,
  loadIncomingPresenceUpdateToObject,
  loadIncomingToggleRoleResponseToObject,
  loadIncomingGetRemindersResponseToObject,
} from "./websocketMapper";
import {
  WebsocketInitChannels,
  WebsocketInitMembers,
  WebsocketInitQuery,
  WebsocketInitRoles,
  WebsocketMessageType,
} from "./types/websocket_init.types";
import { WebsocketChatMessage } from "./types/websocket_init_reduced.types";

export const websocketMiddleware: Middleware =
  (store: any) => (next: any) => (action: any) => {
    if (action.type === "websocket/connectAction") {
      const socket = new WebSocket("ws://localhost:8000/ws");

      socket.onopen = () => {
        console.log("✅ Connected to backend!");
        store.dispatch(setSocketReady(true));
        store.dispatch(setWebSocket(socket));

        const payload: WebSocketMessage = {
          type: WebsocketMessageType.INIT,
          message: { text: "Hello from the frontend!" } as WebsocketInitQuery,
        };
        socket.send(JSON.stringify(payload));
      };

      socket.onmessage = (event) => {
        const message = JSON.parse(event.data);

        console.dir(message);

        switch (message.msgtype) {
          case WebsocketMessageType.INIT:
            const initParsed = loadInitResponseToObject(event.data);
            if (!initParsed?.servers) return;

            const _servers = initParsed.servers;
            const _channels: Record<string, WebsocketInitChannels[]> = {};

            const _members: Record<string, WebsocketInitMembers[]> = {};

            const _messages: Record<string, WebsocketChatMessage[]> = {};

            const _roles: Record<string, WebsocketInitRoles[]> = {};

            initParsed.servers.forEach((server) => {
              _channels[server.guildId] =
                server.channels?.filter((chn) => chn.channelId) ?? [];
              _members[server.guildId] =
                server.members?.filter((mem) => mem.memberId) ?? [];
              _roles[server.guildId] =
                server.roles?.filter((role) => role.id) ?? [];
              _messages[server.guildId] = [];
            });

            _messages["762674310187843607"] = incomingMessageMockData;

            store.dispatch(setServers(_servers ?? []));
            store.dispatch(setChannels(_channels));
            store.dispatch(setMembers(_members));
            store.dispatch(setRoles(_roles));
            store.dispatch(setMessages(_messages));
            store.dispatch(setSelectedServerId(_servers[0]?.guildId ?? null));
            break;

          case WebsocketMessageType.INCOMING_MESSAGE:
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
          case WebsocketMessageType.VOICE_STATE_UPDATE:
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

          case WebsocketMessageType.PRESENCE_UPDATE:
            const presenceUpdate = loadIncomingPresenceUpdateToObject(
              event.data
            );
            store.dispatch(updatePresenceStates(presenceUpdate));
            break;

          case WebsocketMessageType.TOGGLE_ROLE:
            const toggleRole = loadIncomingToggleRoleResponseToObject(
              event.data
            );
            store.dispatch(setRoleForMember(toggleRole));
            break;

          case WebsocketMessageType.GET_REMINDERS:
            const reminders = loadIncomingGetRemindersResponseToObject(
              event.data
            );
            store.dispatch(setReminders(reminders));
            store.dispatch(
              setLoader({
                key: WebsocketMessageType.GET_REMINDERS,
                value: false,
              })
            );
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

    if (action.type === "websocket/sendMessageAction") {
      const state = store.getState() as any;
      const socket: WebSocket | null = state.websocket.websocket;
      const socketReady: boolean = state.websocket.socketReady;

      if (socket && socketReady) {
        socket.send(JSON.stringify(action.payload));
      } else {
        console.warn("Socket not ready yet");
      }
    }

    if (action.type === "websocket/setLoaderValueAction") {
      store.dispatch(
        setLoader({
          key: action.payload.key,
          value: action.payload.value,
        })
      );
    }

    return next(action);
  };
