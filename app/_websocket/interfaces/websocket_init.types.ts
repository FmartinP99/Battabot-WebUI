export interface WebsocketInitChannels {
  channelId: string;
  name: string;
  type: string; // majd megnézni milyen typeok lehetnek
}

export interface WebsocketInitMembers {
  avatarUrl: string;
  bot: boolean;
  displayName: string;
  memberId: string;
  name: string;
}

export interface WebsocketInitServer {
  guildId: string;
  guildName: string;
  iconUrl?: string;
  channels: WebsocketInitChannels[];
  members: WebsocketInitMembers[];
}

export type WebsocketInitServerReduced = Omit<
  WebsocketInitServer,
  "channels" | "members"
>;

export interface WebsocketInitResponse {
  servers?: WebsocketInitServer[];
}

export interface WebsocketIncomingMessageResponse {
  serverId: string;
  channelId: string;
  userId: string;
  messageId: string;
  text: string;
  epoch: number;
}

export type WebsocketChatMessage = Omit<
  WebsocketIncomingMessageResponse,
  "serverId"
>;
