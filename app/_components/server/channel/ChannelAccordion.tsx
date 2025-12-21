import { WebsocketInitChannels } from "@/app/_websocket/types/websocket_init.types";
import Channel from "./Channel";
import { useMemo, useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import { MdKeyboardArrowDown } from "react-icons/md";

interface ChannelAccordionProps {
  title: string;
  channels: WebsocketInitChannels[];
  activeChannelId: string | null;
  onChannelClick: (channel: WebsocketInitChannels) => void;
  onVoiceDisconnect: (channel: WebsocketInitChannels) => void;
}

export default function ChannelAccordion({
  title,
  channels,
  activeChannelId,
  onChannelClick,
  onVoiceDisconnect,
}: ChannelAccordionProps) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const channelsToShow = useMemo(() => {
    if (isOpen) return channels;

    return channels.filter(
      (channel) =>
        channel.channelId === activeChannelId ||
        channel.connectedMemberIds?.length
    );
  }, [channels, isOpen, activeChannelId]);
  const Icon = isOpen ? MdKeyboardArrowDown : MdKeyboardArrowRight;

  return (
    <>
      <div
        className="mt-4 mb-3 px-2 flex  hover:cursor-pointer"
        onClick={() => setIsOpen((open) => !open)}
      >
        <h3 className="text-xs font-semibold text-accent-x3 uppercase tracking-wide leading-normal">
          {title}
        </h3>
        <span>
          <Icon />
        </span>
      </div>

      <div className="flex flex-col gap-0.5">
        {channelsToShow.map((channel) => (
          <Channel
            channel={channel}
            isActive={activeChannelId === channel.channelId}
            onChannelClick={onChannelClick}
            key={channel.channelId}
            onVoiceDisconnect={onVoiceDisconnect}
          />
        ))}
      </div>
    </>
  );
}
