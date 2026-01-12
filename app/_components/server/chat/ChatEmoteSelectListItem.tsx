import { WebsocketInitEmotes } from "@/app/_websocket/types/websocket_init.types";
import React from "react";
import { EmoteExtension, EmoteSize } from "../../emote/interfaces/DiscordEmote";
import { isValidWebsocketInitEmote } from "../../emote/helpers/guards";
import clsx from "clsx";
import { DUMMY_EMOTE } from "@/app/helpers/consts";

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

  const renderedComponent =
    emote === DUMMY_EMOTE ? (
      <span>{emote.name}</span>
    ) : (
      <span>:{emote.name}:</span>
    );

  return (
    <div ref={ref} onClick={() => onItemClick(emote.rawStr)} {...props}>
      <div className={selectListItemClasses}>
        {emote.url && (
          <img
            src={`https://cdn.discordapp.com/emojis/${emote.id}.${
              emote.animated ? EmoteExtension.GIF : EmoteExtension.PNG
            }`}
            alt={emote.rawStr}
            style={{ width: EmoteSize.SMALL, height: EmoteSize.SMALL }}
            className="align-middle"
            draggable={false}
          />
        )}
        <div>{renderedComponent}</div>
      </div>
    </div>
  );
});

export default React.memo(ChatEmoteSelectListItem);
