import { ChannelType } from "@/app/_components/server/channel/enums/channel.enum";
import { MemberStatus } from "@/app/_components/server/member/enums/memberStatus.enum";
import {
  Music,
  PlaylistState,
} from "@/app/_components/server/musicPlayer/types/music.type";

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
  status: MemberStatus;
  roleIds: string[];
  activityName?: string;
}

export interface WebsocketInitRoles {
  id: string;
  name: string;
  priority: number;
  color: string;
  displaySeparately: boolean;
}

export interface WebsocketInitServer {
  guildId: string;
  guildName: string;
  iconUrl?: string;
  channels: WebsocketInitChannels[];
  members: WebsocketInitMembers[];
  roles: WebsocketInitRoles[];
}

export type WebsocketInitServerReduced = Omit<
  WebsocketInitServer,
  "channels" | "members" | "roles"
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
  playedDuration: number;
}

export type WebsocketChatMessage = Omit<
  WebsocketIncomingMessageResponse,
  "serverId"
>;

export interface WebsocketPresenceUpdate {
  serverId: string;
  memberId: string;
  newStatus: MemberStatus;
  newDisplayName: string;
  newActivityName?: string;
}

export interface WebsocketToggleRoleResponse {
  serverId: string;
  roleId: string;
  memberId: string;
  roleIsAdded: boolean;
}
