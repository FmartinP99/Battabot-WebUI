import { MemberStatus, WebsocketInitChannels, WebsocketInitMembers } from "@/app/_websocket/types/websocket_init.types";

export function isValidWebsocketInitChannels(
  value: unknown
): value is WebsocketInitChannels {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const v = value as Record<string, unknown>;

  return (
    typeof v.channelId === "string" &&
    typeof v.name === "string" &&
    typeof v.rawStr === "string" &&
    Array.isArray(v.connectedMemberIds) &&
    v.connectedMemberIds.every(id => typeof id === "string") &&
    "type" in v
  );
}


export function isValidWebsocketInitMembers(
  value: unknown
): value is WebsocketInitMembers {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const v = value as Record<string, unknown>;

  const isStatusValid = Object.values(MemberStatus).includes(v.status as MemberStatus);

  return (
    typeof v.memberId === "string" &&
    typeof v.avatarUrl === "string" &&
    typeof v.name === "string" &&
    typeof v.displayName === "string" &&
    typeof v.bot === "boolean" &&
    Array.isArray(v.roleIds) &&
    v.roleIds.every(id => typeof id === "string") &&
    (typeof v.activityName === "string" || v.activityName === null) &&
    isStatusValid &&
    typeof v.rawStr === "string"
  );
}