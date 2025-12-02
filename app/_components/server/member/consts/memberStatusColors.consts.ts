import { MemberStatus } from "../enums/memberStatus.enum";

export const MemberStatusColors: Record<MemberStatus, string> = {
  [MemberStatus.ONLINE]: "#43b581",
  [MemberStatus.OFFLINE]: "#747f8d",
  [MemberStatus.IDLE]: "#faa61a",
  [MemberStatus.DND]: "#f04747",
  [MemberStatus.INVISIBLE]: "#747f8d",
};
