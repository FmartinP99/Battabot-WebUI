import React, { useMemo } from "react";
import Modal from "../../shared/Modal";
import MemberPopup from "../member/MemberPopup";
import ChatMentionedEntity from "./ChatMentionedEntity";
import { useChatMemberMention } from "@/app/hooks/useChatMemberMention";
import { useMemberRoleColor } from "@/app/hooks/useMemberRoleColor";
import { brightenHexColor, getTextColorBasedOnBg } from "@/app/helpers/utils";

interface ChatMemberMentionProps {
  mention: string;
}

function ChatMemberMention({ mention }: ChatMemberMentionProps) {
  const { member } = useChatMemberMention(mention);
  const { color } = useMemberRoleColor(member?.roleIds ?? []);
  const textColor = useMemo(() => getTextColorBasedOnBg(color), [color]);
  const hoverBgColor = useMemo(() => brightenHexColor(color), [color]);

  if (!member) {
    return <ChatMentionedEntity>User not found</ChatMentionedEntity>;
  }

  return (
    <Modal>
      <Modal.Open opens={member.memberId?.toString()}>
        {color.length ? (
          <ChatMentionedEntity
            backgroundColor={color}
            textColor={textColor}
            hoverBackgroundColor={hoverBgColor}
            hoverTextColor={textColor}
          >
            @{member.displayName}
          </ChatMentionedEntity>
        ) : (
          <ChatMentionedEntity>@{member.displayName}</ChatMentionedEntity>
        )}
      </Modal.Open>
      <Modal.Window name={member.memberId?.toString()} position="top">
        <MemberPopup member={member} />
      </Modal.Window>
    </Modal>
  );
}

export default React.memo(ChatMemberMention);
