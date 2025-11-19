import { useRef } from "react";
import { WebsocketInitMembers } from "../_websocket/types/websocket_init.types";
import MemberModalItem from "./MemberModalItem";
import useAutoHideScrollbar from "../_hooks/useAutoHideScrollbar";
import { List } from "react-window";
import { type RowComponentProps } from "react-window";

interface MemberRowProps {
  members: WebsocketInitMembers[];
}

export function MemberRow({
  index,
  style,
  members,
}: RowComponentProps<MemberRowProps>) {
  const member = members[index];

  return (
    <div style={style}>
      <MemberModalItem
        member={member}
        key={(member.memberId ?? "") + "_" + index}
      />
    </div>
  );
}

export default function MembersList({
  members,
}: {
  members: WebsocketInitMembers[];
}) {
  return (
    <div
      className={`flex flex-col gap-2 overflow-ellipsis pl-3 pr-3 border-l-2 border-gray-500 pt-2 pb-2 ml-2 w-[210px] `}
    >
      <List
        className="scrollbar-hide "
        rowComponent={MemberRow}
        rowCount={members.length}
        rowHeight={56}
        rowProps={{ members }}
      />
    </div>
  );
}
