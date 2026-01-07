import { WebsocketInitEmotes } from "@/app/_websocket/types/websocket_init.types";
import { DiscordEmote, EmoteExtension } from "../interfaces/DiscordEmote";

export function isValidDiscordEmote(emote: unknown): emote is DiscordEmote {
  if (!emote || typeof emote !== "object") return false;

  const { id, name, rawStr, ext } = emote as DiscordEmote;

  return (
    typeof id === "string" &&
    typeof name === "string" &&
    typeof rawStr === "string" &&
    Object.values(EmoteExtension).includes(ext)
  );
}

export function isValidWebsocketInitEmote(
  emote: unknown
): emote is WebsocketInitEmotes {
  if (!emote || typeof emote !== "object") return false;

  const {
    id,
    name,
    rawStr,
    animated,
    available,
    url,
  } = emote as WebsocketInitEmotes;

  return (
    typeof id === "string" &&
    typeof name === "string" &&
    typeof rawStr === "string" &&
    typeof animated === "boolean" &&
    typeof available === "boolean" &&
    typeof url === "string"
  );
}

