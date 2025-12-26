import ChatMentionedEntity from "./ChatMentionedEntity";
import { useChatChannelMention } from "@/app/hooks/useChatChannelMention";

interface ChatChannelMentionProps {
  mention: string;
}

export default function ChatChannelMention({
  mention,
}: ChatChannelMentionProps) {
  const { channel, handleOnChannelClick } = useChatChannelMention(mention);

  if (!channel) return <span>Not available.</span>;

  return (
    <span onClick={() => handleOnChannelClick(channel)}>
      <ChatMentionedEntity>{channel.name}</ChatMentionedEntity>
    </span>
  );
}
