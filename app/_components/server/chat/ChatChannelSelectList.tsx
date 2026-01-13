import { selectMentionableChannelsByServerId } from "@/app/store/selectors";
import { useAppSelector } from "@/app/hooks/storeHooks";
import { useSelectList } from "@/app/hooks/useSelectList";
import {
  ChannelType,
  WebsocketInitChannels,
} from "@/app/_websocket/types/websocket_init.types";
import { handleKeyDownForSelectListBasic } from "./helpers/chatInputHelpers";
import { DUMMY_CHANNEL } from "@/app/helpers/consts";
import ChatChannelSelectListItem from "./ChatChannelSelectListItem";

interface ChatChannelSelectListProps {
  serverId: string;
  handleSelectListItemClick: (id: string) => void;
  className?: string;
  filter: string | null;
}

export default function ChatChannelSelectList({
  serverId,
  className,
  handleSelectListItemClick,
  filter,
}: ChatChannelSelectListProps) {
  const channels = useAppSelector((state) =>
    selectMentionableChannelsByServerId(state, serverId)
  );

  const filteredChannels = filter
    ? channels.filter(
        (ch) =>
          (ch.type === ChannelType.Text || ch.type === ChannelType.Voice) &&
          ch.name.toLocaleLowerCase().startsWith(filter.toLocaleLowerCase())
      )
    : channels;

  const { selectedIndex, setSelectedIndex, itemRefs } =
    useSelectList<WebsocketInitChannels>({
      items: filteredChannels,
      onSelect: (channel) => handleSelectListItemClick(channel.rawStr),
      handleKeyDown: handleKeyDownForSelectListBasic,
    });

  if (!filteredChannels?.length) {
    return (
      <ChatChannelSelectListItem
        key={"dummy"}
        channel={DUMMY_CHANNEL}
        isActive={false}
        onItemClick={() => {}}
      />
    );
  }

  return (
    <div className={className}>
      {filteredChannels.map((channel, idx) => (
        <ChatChannelSelectListItem
          ref={(el) => {
            itemRefs.current[idx] = el;
          }}
          onMouseEnter={() => setSelectedIndex(idx)}
          key={channel.channelId}
          channel={channel}
          isActive={idx === selectedIndex}
          onItemClick={() => handleSelectListItemClick(channel.rawStr)}
        />
      ))}
    </div>
  );
}
