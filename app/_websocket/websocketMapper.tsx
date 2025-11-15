import {
  WebsocketChatMessage,
  WebsocketIncomingMessageResponse,
  WebsocketInitResponse,
} from "./interfaces/websocket_init.interface";

export function loadInitResponseToObject(message: any): WebsocketInitResponse {
  const rawData = JSON.parse(message);

  const parsed: WebsocketInitResponse = {
    servers: rawData.message.map((guild: any) => ({
      guildId: guild.guild_id,
      guildName: guild.guild_name,
      iconUrl: guild.icon_url,
      channels: guild.channels?.map((ch: any) => ({
        channelId: ch.channel_id,
        name: ch.name,
        type: ch.type,
      })),
      members: guild.members.map((m: any) => ({
        memberId: m.member_id,
        name: m.name,
        displayName: m.display_name,
        avatarUrl: m.avatar_url,
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
    channelId: data.message.channelId,
    serverId: data.message.serverId,
    messageId: data.message.messageId,
    userId: data.message.userId,
    text: data.message.text,
    epoch: data.message.epoch,
  };

  return parsed;
}

// teszt  762674310187843607

export const incomingMessageMockData: WebsocketChatMessage[] = Array.from(
  { length: 30 },
  (_, i) => i + 1
).map((v, i) => {
  return {
    channelId: "802245735994884154",
    messageId: "1439176029838114848",
    userId: "215108241481269248",
    text: "test" + i,
    epoch: 1763196703 + i * 300,
  } as WebsocketChatMessage;
});

// teszt vége
