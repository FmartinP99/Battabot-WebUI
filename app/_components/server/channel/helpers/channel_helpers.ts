import { ChannelType } from "@/app/_websocket/types/websocket_init.types";

const voiceLike = new Set([ChannelType.Voice, ChannelType.StageVoice]);

const textLike = new Set([
  ChannelType.Text,
  ChannelType.DM,
  ChannelType.GroupDM,
  ChannelType.News,
  ChannelType.Forum,
]);

const threadLike = new Set([
  ChannelType.NewsThread,
  ChannelType.PublicThread,
  ChannelType.PrivateThread,
]);

const dmLike = new Set([ChannelType.DM, ChannelType.GroupDM]);

const directoryLike = new Set([
  ChannelType.Directory,
  ChannelType.GuildDirectory,
]);

export const isVoiceLike = (t: ChannelType) => voiceLike.has(t);
export const isTextLike = (t: ChannelType) => textLike.has(t);
export const isThread = (t: ChannelType) => threadLike.has(t);
export const isDMLike = (t: ChannelType) => dmLike.has(t);
export const isDirectoryLike = (t: ChannelType) => directoryLike.has(t);
export const isCategory = (t: ChannelType) => t === ChannelType.Category;
export const isGuildText = (t: ChannelType) =>
  textLike.has(t) && !dmLike.has(t);

// to-do: change this into icons in the future
const channelPrefixMap: Record<ChannelType, string> = {
  [ChannelType.Text]: "#",
  [ChannelType.DM]: "@",
  [ChannelType.Voice]: "V:",
  [ChannelType.GroupDM]: "@",
  [ChannelType.Category]: "C:",
  [ChannelType.News]: "#",
  [ChannelType.Store]: "#",
  [ChannelType.NewsThread]: "#",
  [ChannelType.PublicThread]: "#",
  [ChannelType.PrivateThread]: "#",
  [ChannelType.StageVoice]: "V:",
  [ChannelType.Directory]: "D:",
  [ChannelType.Forum]: "#",
  [ChannelType.GuildDirectory]: "D:",
};

export type ChannelPrefix =
  (typeof channelPrefixMap)[keyof typeof channelPrefixMap];

export const getPrefix = (channelType: ChannelType): ChannelPrefix => {
  return channelPrefixMap[channelType];
};
