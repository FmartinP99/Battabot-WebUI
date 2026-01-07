import React from "react";
import { DiscordEmote, EmoteSize } from "./interfaces/DiscordEmote";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipArrow,
} from "../ui/tooltip";
import EmoteTooltip from "./EmoteTooltip";
import { isValidDiscordEmote } from "./helpers/guards";

interface EmoteProps {
  emote: DiscordEmote;
  size: EmoteSize;
}

function Emote({ emote, size = EmoteSize.SMALL }: EmoteProps) {
  if (!isValidDiscordEmote(emote)) return null;

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span className="inline-flex items-center justify-center leading-none align-middle cursor-pointer">
          <img
            src={`https://cdn.discordapp.com/emojis/${emote.id}.${emote.ext}`}
            alt={emote.rawStr}
            style={{ width: size, height: size }}
            className="align-middle"
            draggable={false}
          />
        </span>
      </TooltipTrigger>
      <TooltipContent sideOffset={10}>
        <EmoteTooltip emote={emote} />

        <TooltipArrow
          className="fill-x2"
          width={14}
          height={7}
          style={{ transform: "translateY(-2px) translateX(-2px)" }}
        />

        <TooltipArrow
          className="fill-x1"
          width={10}
          height={5}
          style={{ transform: "translateY(-2px)" }}
        />
      </TooltipContent>
    </Tooltip>
  );
}

export default React.memo(Emote);
