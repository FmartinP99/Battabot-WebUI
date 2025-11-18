import { WebsocketInitMembers } from "../_websocket/types/websocket_init.types";
import Member from "./Member";
import MemberPopup from "./MemberPopup";
import Modal from "./Modal";

export default function MemberModalItem({
  member,
}: {
  member: WebsocketInitMembers;
}) {
  if (!member) {
    return null;
  }

  return (
    <Modal>
      <Modal.Open opens={member.memberId?.toString()}>
        <div className="cursor-pointer hover:bg-accent-500 p-2 rounded">
          <Member member={member} />
        </div>
      </Modal.Open>

      <Modal.Window name={member.memberId?.toString()} position="top">
        <MemberPopup member={member} />
      </Modal.Window>
    </Modal>
  );
}
