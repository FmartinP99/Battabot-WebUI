import { WebsocketInitChannels } from "../../../_websocket/types/websocket_init.types";
import { ChannelType } from "./enums/channel.enum";
import Channel from "./Channel";

export default function ChannelsList({
  channels,
  onChannelClick,
  activeChannelId,
}: {
  channels: WebsocketInitChannels[];
  onChannelClick: (
    channel: WebsocketInitChannels,
    voiceDisconnect?: boolean
  ) => void;
  activeChannelId: string | null;
}) {
  if (!activeChannelId) {
    return null;
  }

  return (
    <div
      className={`flex flex-col justify-start w-[240px] px-2 py-3 border-l border-r border-primary-x3 bg-primary-x1/30 backdrop-blur-sm 
        overflow-y-scroll   scrollbar-hide`}
    >
      <div className="mb-3 px-2">
        <span className="text-xs font-semibold text-accent-x3 uppercase tracking-wide ">
          Text Channels
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        {channels
          .filter((channel) => channel.type === ChannelType.Text)
          .map((channel) => (
            <Channel
              channel={channel}
              isActive={activeChannelId === channel.channelId}
              onChannelClick={onChannelClick}
              key={channel.channelId + "_t"}
            />
          ))}
      </div>

      <div className="mt-4 mb-3 px-2">
        <h3 className="text-xs font-semibold text-accent-x3 uppercase tracking-wide">
          VOICE Channels
        </h3>
      </div>

      <div className="flex flex-col gap-0.5">
        {channels
          .filter((channel) => channel.type === ChannelType.Voice)
          .map((channel) => (
            <Channel
              channel={channel}
              isActive={activeChannelId === channel.channelId}
              onChannelClick={onChannelClick}
              key={channel.channelId + "_v"}
            />
          ))}
      </div>
    </div>
  );
}
