import { WebsocketInitMembers } from "@/app/_websocket/types/websocket_init.types";
import clsx from "clsx";
import React from "react";
import Member from "../member/Member";
import { MemberSize } from "../member/enums/memberSize.enum";
import { isValidWebsocketInitMembers } from "@/app/_websocket/helpers/guards";

interface ChatMemberSelectListItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  member: WebsocketInitMembers;
  isActive: boolean;
  showImage?: boolean;
  onItemClick: (rawStr: string) => void;
}

const ChatMemberSelectListItem = React.forwardRef<
  HTMLDivElement,
  ChatMemberSelectListItemProps
>(({ member, isActive, showImage = true, onItemClick, ...props }, ref) => {
  if (!isValidWebsocketInitMembers(member)) return null;

  const selectListItemClasses = clsx(
    "flex items-center gap-3 p-2 rounded cursor-pointer mx-1 bg-primary-x2",
    !isActive && "bg-opacity-30"
  );

  return (
    <div ref={ref} onClick={() => onItemClick(member.rawStr)} {...props}>
      <div className={selectListItemClasses}>
        <Member
          member={member}
          memberSize={MemberSize.SMALL}
          showActivity={true}
          noMaxWidth={true}
          showImage={showImage}
        />
      </div>
    </div>
  );
});

export default React.memo(ChatMemberSelectListItem);
