import { WebsocketInitMembers } from "../_websocket/types/websocket_init.types";
import Member from "./Member";

export default function MembersList({
  members,
}: {
  members: WebsocketInitMembers[];
}) {
  return (
    <div className="flex flex-col gap-2 overflow-ellipsis pl-3 pr-3 border-l-2 border-gray-500 pt-2 pb-2 ml-2">
      {members?.map((member) => (
        <Member member={member} key={member.memberId} />
      ))}
    </div>
  );
}
