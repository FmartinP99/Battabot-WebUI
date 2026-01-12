import {
  MemberStatus,
  WebsocketInitEmotes,
  WebsocketInitMembers,
} from "@/app/_websocket/types/websocket_init.types";

export const DUMMY_EMOTE: WebsocketInitEmotes = {
  id: "-1",
  name: `No emote found`,
  rawStr: "",
  animated: false,
  available: true,
  url: "",
};

export const DUMMY_MEMBER: WebsocketInitMembers = {
  memberId: "-1",
  avatarUrl: "",
  name: "No member found.",
  displayName: "No member found",
  bot: false,
  roleIds: [],
  activityName: "",
  status: MemberStatus.OFFLINE,
  rawStr: "",
};
