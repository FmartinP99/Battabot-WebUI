import { WebsocketInitEmotes } from "@/app/_websocket/types/websocket_init.types";
import React from "react";
import { EmoteExtension, EmoteSize } from "../../emote/interfaces/DiscordEmote";
import { isValidWebsocketInitEmote } from "../../emote/helpers/guards";
import clsx from "clsx";

interface ChatEmoteSelectListItemProps
  extends React.HTMLAttributes<HTMLDivElement> {
  emote: WebsocketInitEmotes;
  isActive: boolean;
  onItemClick: (rawStr: string) => void;
}

const ChatEmoteSelectListItem = React.forwardRef<
  HTMLDivElement,
  ChatEmoteSelectListItemProps
>(({ emote, isActive, onItemClick, ...props }, ref) => {
  if (!isValidWebsocketInitEmote(emote)) return null;

  const selectListItemClasses = clsx(
    "flex items-center gap-3 p-2 rounded cursor-pointer mx-1 bg-primary-x2",
    !isActive && "bg-opacity-30"
  );

  return (
    <div ref={ref} onClick={() => onItemClick(emote.rawStr)} {...props}>
      <div className={selectListItemClasses}>
        <img
          src={`https://cdn.discordapp.com/emojis/${emote.id}.${
            emote.animated ? EmoteExtension.GIF : EmoteExtension.PNG
          }`}
          alt={emote.rawStr}
          style={{ width: EmoteSize.SMALL, height: EmoteSize.SMALL }}
          className="align-middle"
          draggable={false}
        />
        <div>
          <span>:{emote.name}:</span>
        </div>
      </div>
    </div>
  );
});

export default React.memo(ChatEmoteSelectListItem);
