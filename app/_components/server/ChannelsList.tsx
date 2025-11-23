import { WebsocketInitChannels } from "../../_websocket/types/websocket_init.types";

export default function ChannelsList({
  channels,
  setActiveChannel,
  activeChannelId,
}: {
  channels: WebsocketInitChannels[];
  setActiveChannel: (channel: WebsocketInitChannels) => void;
  activeChannelId: string | null;
}) {
  if (!activeChannelId) {
    return null;
  }

  return (
    <div className="flex flex-col justify-start w-[240px] px-2 py-3 border-l border-r border-primary-x3 bg-primary-x1/30 backdrop-blur-sm">
      <div className="mb-3 px-2">
        <h3 className="text-xs font-semibold text-accent-x3 uppercase tracking-wide">
          Text Channels
        </h3>
      </div>

      <div className="flex flex-col gap-0.5">
        {channels.map((channel) => (
          <div
            key={channel.channelId}
            className={`
              group relative truncate cursor-pointer flex items-center gap-2 px-2 py-1.5 rounded-md
              transition-all duration-200 ease-in-out
              ${
                activeChannelId === channel.channelId
                  ? "bg-accent-x1/15 text-white font-medium shadow-sm"
                  : "text-accent-x3 hover:bg-primary-x3/50 hover:text-accent-x2"
              }
            `}
            onClick={() => setActiveChannel(channel)}
          >
            <span
              className={`
              text-lg leading-none transition-colors duration-200
              ${
                activeChannelId === channel.channelId
                  ? "text-accent-x1"
                  : "text-accent-x4 group-hover:text-accent-x3"
              }
            `}
            >
              #
            </span>
            <span className="truncate text-sm">{channel.name}</span>

            {activeChannelId === channel.channelId && (
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-accent-x1 rounded-r-full" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
