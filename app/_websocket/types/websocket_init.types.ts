import { ChannelType } from "@/app/_components/server/channel/enums/channel.enum";
import {
  Music,
  PlaylistState,
} from "@/app/_components/server/musicPlayer/music.type";

export interface WebsocketInitChannels {
  channelId: string;
  name: string;
  type: ChannelType;
  connectedMemberIds: string[]; //ids only
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

export interface WebsocketVoiceUpdateResponse {
  serverId: string;
  memberId: string;
  beforeChannel?: string;
  afterChannel?: string;
  epoch: number;
}

export interface WebsocketPlaylist {
  serverId: string;
  playlistState: PlaylistState;
}

export interface WebsocketPlaylistStateUpdate {
  serverId: string;
  selectedSong: Music;
  selectedModifiedAt: number;
  isPlaying: boolean;
}

export type WebsocketChatMessage = Omit<
  WebsocketIncomingMessageResponse,
  "serverId"
>;
