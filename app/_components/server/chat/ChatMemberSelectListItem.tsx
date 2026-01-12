import { WebsocketInitMembers } from "@/app/_websocket/types/websocket_init.types";
import clsx from "clsx";
import React from "react";
import Member from "../member/Member";
import { MemberSize } from "../member/enums/memberSize.enum";

interface ChatEmoteSelectListItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  member: WebsocketInitMembers;
  isActive: boolean;
  showImage?: boolean;
  onItemClick: (rawStr: string) => void;
}

const ChatEmoteSelectListItem = React.forwardRef<
  HTMLDivElement,
  ChatEmoteSelectListItemProps
>(({ member, isActive, showImage = true, onItemClick, ...props }, ref) => {
  // if (!isValidWebsocketInitEmote(emote)) return null;

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

export default React.memo(ChatEmoteSelectListItem);
