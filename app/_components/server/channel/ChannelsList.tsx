import { WebsocketInitChannels } from "../../../_websocket/types/websocket_init.types";
import { ChannelType } from "./enums/channel.enum";
import Channel from "./Channel";
import { useMemo } from "react";
import ChannelAccordion from "./ChannelAccordion";

interface ChannelListProps {
  channels: WebsocketInitChannels[];
  activeChannelId: string | null;
  onChannelClick: (channel: WebsocketInitChannels) => void;
  onVoiceDisconnect: (channel: WebsocketInitChannels) => void;
}

export default function ChannelsList({
  channels,
  onChannelClick,
  activeChannelId,
  onVoiceDisconnect,
}: ChannelListProps) {
  if (!channels) {
    return null;
  }

  const channelListClasses =
    "flex flex-col justify-start w-[240px] px-2 py-3 border-l border-r border-primary-x3 bg-primary-x1/30 backdrop-blur-sm  overflow-y-scroll scrollbar-hide";

  const groupedChannels = useMemo(
    () => ({
      text: channels.filter((c) => c.type === ChannelType.Text),
      voice: channels.filter((c) => c.type === ChannelType.Voice),
    }),
    [channels]
  );

  return (
    <div className={channelListClasses}>
      <ChannelAccordion
        title="Text Channels"
        channels={groupedChannels.text}
        activeChannelId={activeChannelId}
        onChannelClick={onChannelClick}
        onVoiceDisconnect={onVoiceDisconnect}
      />

      <ChannelAccordion
        title="Voice Channels"
        channels={groupedChannels.voice}
        activeChannelId={activeChannelId}
        onChannelClick={onChannelClick}
        onVoiceDisconnect={onVoiceDisconnect}
      />
    </div>
  );
}
