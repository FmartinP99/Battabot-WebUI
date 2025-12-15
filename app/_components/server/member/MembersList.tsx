import {
  WebsocketInitMembers,
  WebsocketInitRoles,
} from "../../../_websocket/types/websocket_init.types";
import MemberModalItem from "./MemberModalItem";
import { List } from "react-window";
import { type RowComponentProps } from "react-window";
import { useMemberListRows } from "@/app/hooks/useMemberListRows";
import { isOfflineLikeStatus } from "./helpers/members_helper";

export type MemberRow = Member | Role;

interface Member {
  type: "member";
  member: WebsocketInitMembers;
}

interface Role {
  type: "role";
  role: WebsocketInitRoles;
  count: number;
}

export interface MemberListRowProps {
  rows: MemberRow[];
}

export function MemberListRow({
  index,
  style,
  rows,
}: RowComponentProps<MemberListRowProps>) {
  const row = rows[index];
  if (row.type === "member") {
    const isOfflineLike = isOfflineLikeStatus(row.member?.status);
    return (
      <div
        style={style}
        className={` ${isOfflineLike ? "opacity-30" : ""} hover:opacity-100`}
      >
        <MemberModalItem member={row.member} key={row.member?.memberId ?? ""} />
      </div>
    );
  }

  const hasRoleName = !!row?.role?.name;
  return (
    <div
      style={style}
      className="w-full h-[24px] px-2 text-xs font-semibold text-gray-400 text-left mt-[8px]"
    >
      {hasRoleName
        ? `${row.role.name} - ${row.count}`
        : `"Undefined - ${row.count}"`}
    </div>
  );
}

interface MemberListProps {
  members: WebsocketInitMembers[];
}

export default function MembersList({ members }: MemberListProps) {
  const rows = useMemberListRows(members);
  return (
    <div className="flex flex-col gap-1 overflow-hidden pl-3 pr-2 border-l border-primary-x1 pt-3 pb-2 w-[240px] bg-primary-x2">
      <div className="px-2 mb-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-accent-x3 uppercase tracking-wide">
            Members — {members.length}
          </h3>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-primary-x2 to-transparent z-10 pointer-events-none"></div>

        <List
          className="scrollbar-hide-nonhover pr-1"
          rowComponent={MemberListRow}
          rowCount={rows.length}
          rowHeight={(index) => (rows[index].type === "role" ? 24 : 48)}
          rowProps={{ rows }}
        />

        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-primary-x2 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
