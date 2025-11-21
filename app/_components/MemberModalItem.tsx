import React from "react";
import { WebsocketInitMembers } from "../_websocket/types/websocket_init.types";
import Member from "./Member";
import MemberPopup from "./MemberPopup";
import Modal from "./Modal";

function MemberModalItem({ member }: { member: WebsocketInitMembers }) {
  if (!member) {
    return null;
  }

  return (
    <Modal>
      <Modal.Open opens={member.memberId?.toString()}>
        <div className="cursor-pointer hover:bg-primary-x4 active:bg-primary-x5 p-2.5 rounded-md transition-all duration-200 group">
          <Member member={member} />
        </div>
      </Modal.Open>

      <Modal.Window name={member.memberId?.toString()} position="top">
        <MemberPopup member={member} />
      </Modal.Window>
    </Modal>
  );
}

export default React.memo(MemberModalItem);
