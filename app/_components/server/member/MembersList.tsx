import { WebsocketInitMembers } from "../../../_websocket/types/websocket_init.types";
import MemberModalItem from "./MemberModalItem";
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

//TO-DO: SZíNEKET CSINÁLD MEG GLBOALBA

export default function MembersList({
  members,
}: {
  members: WebsocketInitMembers[];
}) {
  return (
    <div className="flex flex-col gap-1 overflow-hidden pl-3 pr-2 border-l border-primary-x1 pt-3 pb-2 w-[240px] bg-primary-x2">
      {/* Header section */}
      <div className="px-2 mb-2">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-xs font-semibold text-accent-x3 uppercase tracking-wide">
            Members — {members.length}
          </h3>
        </div>
      </div>

      {/* Members list with custom scrollbar */}
      <div className="relative flex-1 overflow-hidden">
        {/* Gradient fade at top */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-primary-x2 to-transparent z-10 pointer-events-none"></div>

        <List
          className="scrollbar-thin scrollbar-thumb-primary-x1 scrollbar-track-transparent hover:scrollbar-thumb-primary-x3 pr-1"
          rowComponent={MemberRow}
          rowCount={members.length}
          rowHeight={48}
          rowProps={{ members }}
        />

        {/* Gradient fade at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-4 bg-gradient-to-t from-primary-x2 to-transparent pointer-events-none"></div>
      </div>
    </div>
  );
}
