import { WebsocketInitChannels } from "@/app/_websocket/types/websocket_init.types";
import clsx from "clsx";
import React from "react";
import { getPrefix } from "../channel/helpers/channel_helpers";

interface ChatChannelSelectListItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  channel: WebsocketInitChannels;
  isActive: boolean;
  onItemClick: (rawStr: string) => void;
}

const ChatChannelSelectListItem = React.forwardRef<
  HTMLDivElement,
  ChatChannelSelectListItemProps
>(({ channel, isActive, onItemClick, ...props }, ref) => {
  // if (!isValidWebsocketInitEmote(emote)) return null;

  const selectListItemClasses = clsx(
    "flex items-center gap-3 p-2 rounded cursor-pointer mx-1 bg-primary-x2",
    !isActive && "bg-opacity-30"
  );

  return (
    <div ref={ref} onClick={() => onItemClick(channel.rawStr)} {...props}>
      <div className={selectListItemClasses}>
        <span>{getPrefix(channel.type)}</span>
        <span className="truncate text-sm">{channel.name}</span>
      </div>
    </div>
  );
});

export default React.memo(ChatChannelSelectListItem);
