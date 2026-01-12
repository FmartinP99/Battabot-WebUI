import React from "react";
import ChatMentionedEntity from "./ChatMentionedEntity";
import { useChatChannelMention } from "@/app/hooks/useChatChannelMention";

interface ChatChannelMentionProps {
  mention: string;
}

function ChatChannelMention({ mention }: ChatChannelMentionProps) {
  const { channel, handleOnChannelClick } = useChatChannelMention(mention);

  if (!channel) return <span>Not available.</span>;

  return (
    <ChatMentionedEntity onClick={() => handleOnChannelClick(channel)}>
      #{channel.name}
    </ChatMentionedEntity>
  );
}

export default React.memo(ChatChannelMention);
