import { WebsocketInitChannels } from "../../../_websocket/types/websocket_init.types";
import { ChannelType } from "./enums/channel.enum";
import Channel from "./Channel";
import { useMemo } from "react";

interface ChannelListProps {
  channels: WebsocketInitChannels[];
  onChannelClick: (channel: WebsocketInitChannels) => void;
  activeChannelId: string | null;
  onVoiceDisconnect: (channel: WebsocketInitChannels) => void;
}

export default function ChannelsList({
  channels,
  onChannelClick,
  activeChannelId,
  onVoiceDisconnect,
}: ChannelListProps) {
  if (!activeChannelId) {
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
      <div className="mb-3 px-2">
        <span className="text-xs font-semibold text-accent-x3 uppercase tracking-wide ">
          Text Channels
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        {groupedChannels.text.map((channel) => (
          <Channel
            channel={channel}
            isActive={activeChannelId === channel.channelId}
            onChannelClick={onChannelClick}
            key={channel.channelId + "_t"}
            onVoiceDisconnect={onVoiceDisconnect}
          />
        ))}
      </div>

      <div className="mt-4 mb-3 px-2">
        <h3 className="text-xs font-semibold text-accent-x3 uppercase tracking-wide">
          VOICE Channels
        </h3>
      </div>

      <div className="flex flex-col gap-0.5">
        {groupedChannels.voice.map((channel) => (
          <Channel
            channel={channel}
            isActive={activeChannelId === channel.channelId}
            onChannelClick={onChannelClick}
            key={channel.channelId + "_v"}
            onVoiceDisconnect={onVoiceDisconnect}
          />
        ))}
      </div>
    </div>
  );
}
