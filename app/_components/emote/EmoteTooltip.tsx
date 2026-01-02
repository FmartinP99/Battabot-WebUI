import React from "react";
import { DiscordEmote, EmoteSize } from "./interfaces/DiscordEmote";

interface EmoteTooltipProps {
  emote: DiscordEmote;
}

function EmoteTooltip({ emote }: EmoteTooltipProps) {
  return (
    <div className="flex min-w-0 gap-3 justify-center items-center bg-primary-x1  p-2 rounded border-[1px] border-primary-x2">
      <img
        src={`https://cdn.discordapp.com/emojis/${emote.id}.${emote.ext}`}
        alt={emote.rawStr}
        style={{ width: EmoteSize.TOOLTIP, height: EmoteSize.TOOLTIP }}
        className="align-middle"
        draggable={false}
      />
      <div>
        <span>:{emote.name}:</span>
      </div>
    </div>
  );
}

export default React.memo(EmoteTooltip);
