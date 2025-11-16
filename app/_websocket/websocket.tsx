"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { ReactNode } from "react";
import {
  WebSocketMessage,
  WebsocketProviderValue,
} from "./types/websocket.types";
import { WebsocketMessageType } from "./enums/websocket_message_type.enum";
import {
  WebsocketChatMessage,
  WebsocketInitChannels,
  WebsocketInitMembers,
  WebsocketInitResponse,
  WebsocketInitServer,
  WebsocketInitServerReduced,
} from "./types/websocket_init.types";
import {
  incomingMessageMockData,
  loadIncomingMessageToObject,
  loadInitResponseToObject,
} from "./websocketMapper";

const WebSocketContext = createContext({} as WebsocketProviderValue);

function WebSocketProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [socketReady, setSocketReady] = useState(false);
  const [websocket, setWebsocket] = useState<WebSocket | null>(null);
  const [servers, setServers] = useState<WebsocketInitServerReduced[]>([]);
  const [channels, setChannels] = useState<
    Map<string, WebsocketInitChannels[]>
  >(new Map<string, WebsocketInitChannels[]>());
  const [members, setMembers] = useState<Map<string, WebsocketInitMembers[]>>(
    new Map<string, WebsocketInitMembers[]>()
  );
  const [messages, setMessages] = useState<Map<string, WebsocketChatMessage[]>>(
    new Map<string, WebsocketChatMessage[]>()
  );
  const [selectedServerId, setSelectedServerId] = useState<string>();

  function handleSendMessage(_message: WebSocketMessage) {
    if (websocket && socketReady) {
      websocket.send(JSON.stringify(_message));
      return true;
    } else {
      console.warn("Socket not ready yet");
      return false;
    }
  }

  function handleSelectServerId(id: string) {
    if (servers.map((server) => server.guildId).includes(id)) {
      setSelectedServerId(id);
    }
  }

  const createWebSocket = () => {
    if (websocket && websocket.readyState === WebSocket.OPEN) return;

    const newSocket = new WebSocket("ws://localhost:8001/ws");

    newSocket.onopen = () => {
      console.log("✅ Connected to backend!");
      setSocketReady(true);

      const messagePayload = {
        type: WebsocketMessageType.INIT,
        message: { text: "Hello from the frontend!" },
      };
      newSocket.send(JSON.stringify(messagePayload));
    };

    newSocket.onmessage = (event: MessageEvent) => {
      console.log("📩 Message from backend:", event.data);
      const message = JSON.parse(event.data);

      switch (message["msgtype"]) {
        case "init":
          const initParsed = loadInitResponseToObject(event.data);

          const _servers = initParsed.servers as WebsocketInitServerReduced[];
          const _channels = new Map<string, WebsocketInitChannels[]>();
          const _members = new Map<string, WebsocketInitMembers[]>();
          const _messages = new Map<string, WebsocketChatMessage[]>();

          initParsed.servers?.forEach((server) => {
            const key = server.guildId;
            _channels.set(key, server.channels ?? []);
            _members.set(key, server.members ?? []);
            _messages.set(key, []);
          });

          // teszt
          _messages.set("762674310187843607", incomingMessageMockData);

          setMembers(_members);
          setChannels(_channels);
          setServers(_servers);
          setMessages(_messages);
          setSelectedServerId(_servers[0].guildId);
          break;
        case "incomingMessage":
          const incMessageParsed = loadIncomingMessageToObject(event.data);

          setMessages((m) => {
            const newMap = new Map(m);
            const messages = newMap.get(incMessageParsed.serverId) ?? [];
            if (
              !messages
                ?.map((msg) => msg.messageId)
                .includes(incMessageParsed.messageId)
            ) {
              const newMessage = {
                userId: incMessageParsed.userId,
                channelId: incMessageParsed.channelId,
                text: incMessageParsed.text,
                epoch: incMessageParsed.epoch,
                messageId: incMessageParsed.messageId,
              } as WebsocketChatMessage;

              newMap.set(incMessageParsed.serverId, [...messages, newMessage]);
            }

            return newMap;
          });
          break;
      }
    };

    newSocket.onclose = () => {
      console.log("❌ WebSocket closed");
      setSocketReady(false);
    };

    newSocket.onerror = (err) => {
      console.error("⚠️ WebSocket error", err);
    };

    setWebsocket(newSocket);
  };

  useEffect(() => {
    createWebSocket();
    return () => {
      websocket?.close();
    };
  }, []);

  const providerValues = {
    socketReady: socketReady,
    websocket: websocket,
    sendMessage: handleSendMessage,
    createWebSocket: createWebSocket,
    servers: servers,
    channels: channels,
    members: members,
    selectedServerId: selectedServerId,
    setSelectedServerId: handleSelectServerId,
    messages: messages,
  } as WebsocketProviderValue;

  return (
    <WebSocketContext.Provider value={providerValues}>
      {children}
    </WebSocketContext.Provider>
  );
}

function useWebSocket() {
  const context = useContext(WebSocketContext);
  if (context == undefined) {
    throw new Error("Context was used outside provider.");
  }
  return context;
}

export { WebSocketProvider, useWebSocket };
