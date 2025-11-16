import {
  WebsocketChatMessage,
  WebsocketIncomingMessageResponse,
  WebsocketInitChannels,
  WebsocketInitMembers,
  WebsocketInitResponse,
  WebsocketInitServer,
} from "./types/websocket_init.types";

// to-do: parse guar, but im not sure what
export function loadInitResponseToObject(message: any): WebsocketInitResponse {
  const rawData = JSON.parse(message);

  const parsed: WebsocketInitResponse = {
    servers: rawData?.message?.map((guild: WebsocketInitServer) => ({
      guildId: guild.guildId,
      guildName: guild.guildName,
      iconUrl: guild.iconUrl,
      channels: guild.channels?.map((ch: WebsocketInitChannels) => ({
        channelId: ch.channelId,
        name: ch.name,
        type: ch.type,
      })),
      members: guild.members?.map((m: WebsocketInitMembers) => ({
        memberId: m.memberId,
        name: m.name,
        displayName: m.displayName,
        avatarUrl: m.avatarUrl,
        bot: m.bot,
      })),
    })),
  };

  return parsed;
}

export function loadIncomingMessageToObject(
  message: any
): WebsocketIncomingMessageResponse {
  const data = JSON.parse(message);

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

export const incomingMessageMockData: WebsocketChatMessage[] = Array.from(
  { length: 30 },
  (_, i) => i + 1
).map((v, i) => {
  return {
    channelId: "802245735994884154",
    messageId: "1439176029838114848",
    userId: "802239701738192977",
    text: "test" + i,
    epoch: 1763196703 + i * 300,
  } as WebsocketChatMessage;
});
