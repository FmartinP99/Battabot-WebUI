export const imageUrlRegex =
  /(https?:\/\/(?:cdn\.discordapp\.com|media\.discordapp\.net)\/[^\s]+)|(https?:\/\/[^\s]+?\.(?:png|jpe?g|gif|webp|svg))/gi;
export const youtubeRegex =
  /https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/gi;

export const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/gi;
export const timestampRegex = /<t:(\d{1,}):?([tTdDfFR])?>/g;
export const mentionRegex = /<([@#])(\d+)>/g;
export const emojiRegex = /<(a?):([a-zA-Z0-9_]+):(\d+)>/g;
export const unicodeEmojiRegex = /\p{Extended_Pictographic}/gu;

export const specialWordRegex = /<[^<>]+>$/;

export const previousSpecialWordRegex = /<[^<>]*>$/;
export const nextSpecialWordRegex = /^<[^<>]*>/;
