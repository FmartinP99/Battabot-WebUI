import Modal from "../../shared/Modal";
import MemberPopup from "../member/MemberPopup";
import ChatMentionedEntity from "./ChatMentionedEntity";
import { useChatMemberMention } from "@/app/hooks/useChatMemberMention";

interface ChatMemberMentionProps {
  mention: string;
}

export default function ChatMemberMention({ mention }: ChatMemberMentionProps) {
  const { member } = useChatMemberMention(mention);
  if (!member) return <ChatMentionedEntity>User not found</ChatMentionedEntity>;

  return (
    <Modal>
      <Modal.Open opens={member.memberId?.toString()}>
        <ChatMentionedEntity>{member.displayName}</ChatMentionedEntity>
      </Modal.Open>
      <Modal.Window name={member.memberId?.toString()} position="top">
        <MemberPopup member={member} />
      </Modal.Window>
    </Modal>
  );
}
