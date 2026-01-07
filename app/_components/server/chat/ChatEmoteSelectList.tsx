import { useAppSelector } from "@/app/hooks/storeHooks";
import { selectEmotesByServerId } from "@/app/store/selectors";
import React from "react";
import ChatEmoteSelectListItem from "./ChatEmoteSelectListItem";
import { useSelectList } from "@/app/hooks/useSelectList";
import { handleKeyDownForEmoteSelectList } from "@/app/helpers/selectlistHelpers";

interface ChatEmoteSelectListProps {
  serverId: string;
  handleSelectListItemClick: (rawStr: string) => void;
  className?: string;
  filter: string | null;
}

export default function ChatEmoteSelectList({
  serverId,
  className,
  handleSelectListItemClick,
  filter,
}: ChatEmoteSelectListProps) {
  const emotes = useAppSelector((state) =>
    selectEmotesByServerId(state, serverId)
  );

  const filteredEmotes = filter
    ? emotes.filter((emote) =>
        emote.name.toLocaleLowerCase().startsWith(filter.toLocaleLowerCase())
      )
    : emotes;

  const { selectedIndex, setSelectedIndex, itemRefs } = useSelectList({
    items: filteredEmotes,
    onSelect: (emote) => handleSelectListItemClick(emote.rawStr),
    handleKeyDown: handleKeyDownForEmoteSelectList,
  });

  return (
    <div className={className}>
      {filteredEmotes.map((emote, idx) => (
        <ChatEmoteSelectListItem
          ref={(el) => {
            itemRefs.current[idx] = el;
          }}
          onMouseEnter={() => setSelectedIndex(idx)}
          key={emote.id}
          emote={emote}
          isActive={idx === selectedIndex}
          onItemClick={() => handleSelectListItemClick(emote.rawStr)}
        />
      ))}
    </div>
  );
}
