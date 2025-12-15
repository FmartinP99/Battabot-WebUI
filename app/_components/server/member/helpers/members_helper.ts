import { MemberStatus } from "../enums/memberStatus.enum";
import { MemberRow } from "../MembersList";

const offlineLikeStatuses = new Set([
  MemberStatus.OFFLINE,
  MemberStatus.INVISIBLE,
]);

export const isOfflineLikeStatus = (s: MemberStatus) =>
  offlineLikeStatuses.has(s);

export function isRoleRow(
  row: MemberRow
): row is Extract<MemberRow, { type: "role" }> {
  return row.type === "role";
}