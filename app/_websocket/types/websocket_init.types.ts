// Generated using python-to-typescript-interfaces.
// See https://github.com/NalyzeSolutions/python_to_typescript_interfaces

export interface WebsocketBaseResponse {
    success: boolean;
    errorText: string | null;
}

export enum WebsocketMessageType {
    NULL = "",
    INIT = "init",
    SEND_MESSAGE = "sendMessage",
    INCOMING_MESSAGE = "incomingMessage",
    SET_REMINDER = "setReminder",
    VOICE_STATE_UPDATE = "voiceStateUpdate",
    GET_MUSIC_PLAYLIST = "getMusicPlaylist",
    PLAYLIST_STATE_UPDATE = "playlistStateUpdate",
    PLAYLIST_SONG_SKIP = "playlistSongSkip",
    PLAYLIST_PAUSE = "playlistPause",
    PLAYLIST_RESUME = "playlistResume",
    PRESENCE_UPDATE = "presenceUpdate",
    TOGGLE_ROLE = "toggleRole",
    GET_REMINDERS = "getReminders",
}

export enum MemberStatus {
    ONLINE = "online",
    OFFLINE = "offline",
    IDLE = "idle",
    DND = "dnd",
    INVISIBLE = "invisible",
}

export enum ChannelType {
    Text = "0",
    DM = "1",
    Voice = "2",
    GroupDM = "3",
    Category = "4",
    News = "5",
    Store = "6",
    NewsThread = "10",
    PublicThread = "11",
    PrivateThread = "12",
    StageVoice = "13",
    Directory = "14",
    Forum = "15",
    GuildDirectory = "16",
}

export interface WebsocketInitQuery {
    text: string;
}

export interface WebsocketInitChannels {
    channelId: string;
    name: string;
    connectedMemberIds: Array<string>;
    type: ChannelType;
}

export interface WebsocketInitMembers {
    memberId: string;
    avatarUrl: string;
    name: string;
    displayName: string;
    bot: boolean;
    roleIds: Array<string>;
    activityName: string | null;
    status: MemberStatus;
}

export interface WebsocketInitRoles {
    id: string;
    name: string;
    priority: number;
    color: string;
    displaySeparately: boolean;
}

export interface WebsocketInitEmotes {
    id: string;
    name: string;
    rawStr: string;
    animated: boolean;
    available: boolean;
    url: string;
}

export interface WebsocketInitServer {
    guildId: string;
    guildName: string;
    iconUrl: string | null;
    channels: Array<WebsocketInitChannels> | null;
    members: Array<WebsocketInitMembers> | null;
    roles: Array<WebsocketInitRoles> | null;
    emotes: Array<WebsocketInitEmotes> | null;
}

export interface WebsocketInitResponse {
    servers: Array<WebsocketInitServer> | null;
}

export interface WebsocketSendMessageQuery {
    serverId: string;
    channelId: string;
    text: string;
}

export interface WebsocketSetReminderQuery {
    serverId: string;
    channelId: string;
    memberId: string;
    text: string;
    date: Date;
}

export interface WebsocketIncomingMessageResponse {
    serverId: string;
    channelId: string;
    userId: string;
    messageId: string;
    text: string;
    epoch: number;
}

export interface WebsocketVoiceStateUpdateQuery {
    serverId: string;
    channelId: string;
    isDisconnect: boolean;
}

export interface WebsocketVoiceStateUpdateResponse {
    serverId: string;
    memberId: string;
    beforeChannel: string | null;
    afterChannel: string | null;
    epoch: number;
}

export interface WebsocketGetMusicPlaylistQuery {
    serverId: string;
}

export interface WebsocketMusic {
    index: number;
    title: string;
    artist: string;
    lengthStr: string;
    length: number;
    filename: string;
}

export interface WebsocketPlaylistState {
    serverId: string;
    selectedSong: WebsocketMusic;
    selectedModifiedAt: number;
    isPlaying: boolean;
    songs: Array<WebsocketMusic>;
    playedDuration: number;
}

export interface WebsocketGetMusicPlaylistResponse {
    serverId: string;
    playlistState: WebsocketPlaylistState;
}

export interface WebsocketPlaylistStateUpdateQuery {
    serverId: string;
}

export interface WebsocketPlaylistStateUpdateResponse {
    serverId: string;
    selectedSong: WebsocketMusic;
    selectedModifiedAt: number;
    isPlaying: boolean;
    playedDuration: number;
}

export interface WebsocketPlaylistSongSkipQuery {
    serverId: string;
    songIndex: number;
}

export interface WebsocketPlaylistPauseQuery {
    serverId: string;
}

export interface WebsocketPlaylistResumeQuery {
    serverId: string;
}

export interface WebsocketPresenceUpdateResponse {
    serverId: string;
    memberId: string;
    newStatus: MemberStatus;
    newDisplayName: string;
    newActivityName: string | null;
}

export interface WebsocketToggleRoleQuery {
    serverId: string;
    roleId: string;
    memberId: string;
}

export interface WebsocketToggleRoleResponse {
    serverId: string;
    roleId: string;
    memberId: string;
    roleIsAdded: boolean;
}

export interface WebsocketGetRemindersQuery {
    serverId: string;
    memberId: string;
}

export enum WebsocketReminderStatus {
    HAPPENED = "Happened",
    DUE = "Due",
    PENDING = "Pending",
}

export interface WebsocketReminder {
    id: number;
    channel_id: string;
    created_at: number;
    remind_time: number;
    remind_text: string;
    status: WebsocketReminderStatus;
}

export interface WebsocketGetRemindersResponse extends WebsocketBaseResponse {
    serverId: string;
    memberId: string;
    reminders: Array<WebsocketReminder>;
}
