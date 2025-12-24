import React from "react";
import { WebsocketInitMembers } from "../../../_websocket/types/websocket_init.types";
import Member from "./Member";
import MemberPopup from "./MemberPopup";
import Modal from "../../shared/Modal";

interface MemberListMemberProps {
  member: WebsocketInitMembers;
}

function MemberListMember({ member }: MemberListMemberProps) {
  if (!member) {
    return null;
  }

  return (
    <Modal>
      <Modal.Open opens={member.memberId?.toString()}>
        <div className="cursor-pointer hover:bg-primary-x4 active:bg-primary-x5 p-2.5 rounded-md transition-all duration-200 group h-[50px]">
          <Member member={member} showActivity={true} />
        </div>
      </Modal.Open>

      <Modal.Window name={member.memberId?.toString()} position="top">
        <MemberPopup member={member} />
      </Modal.Window>
    </Modal>
  );
}

export default React.memo(MemberListMember);
