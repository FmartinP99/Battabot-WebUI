import { WebsocketInitChannels } from "@/app/_websocket/types/websocket_init.types";
import { getPrefix } from "./helpers/channel_helpers";
import { selectMembersByActiveServer } from "@/app/store/selectors";
import { useAppSelector } from "@/app/hooks/storeHooks";
import Member from "../member/Member";
import { MemberSize } from "../member/enums/memberSize.enum";
import { BotId } from "@/app/consts/botId";
import { Button } from "../../ui/button";
import { HiXMark } from "react-icons/hi2";

interface ChannelProps {
  channel: WebsocketInitChannels;
  isActive: boolean;
  onChannelClick: (
    channel: WebsocketInitChannels,
    voiceDisconnect?: boolean
  ) => void;
}

export default function Channel({
  channel,
  isActive,
  onChannelClick,
}: ChannelProps) {
  const members = useAppSelector(selectMembersByActiveServer);

  return (
    <>
      <div
        key={channel.channelId}
        className={`
              group relative truncate cursor-pointer flex items-center gap-2 px-2 py-1.5 rounded-md
              transition-all duration-200 ease-in-out
              ${
                isActive
                  ? "bg-accent-x1/15 text-white font-medium shadow-sm"
                  : "text-accent-x3 hover:bg-primary-x3/50 hover:text-accent-x2"
              }
            `}
        onClick={() => onChannelClick(channel)}
      >
        <span
          className={`
              text-lg leading-none transition-colors duration-200
              ${
                isActive
                  ? "text-accent-x1"
                  : "text-accent-x4 group-hover:text-accent-x3"
              }
            `}
        >
          {getPrefix(channel.type)}
        </span>
        <span className="truncate text-sm">{channel.name}</span>

        {isActive && (
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-accent-x1 rounded-r-full" />
        )}
      </div>

      {channel.connectedMemberIds.map((cmId) => {
        const member = members?.find((mem) => mem.memberId === cmId);
        if (!member) {
          return null;
        }
        // to-do: restyle this button better in the future
        return (
          <div className="flex flex-row mb-2">
            <span className="ml-10" />
            <Member member={member} memberSize={MemberSize.SMALL} />
            {cmId === BotId ? (
              <button
                className="bg-red-600 bg-opacity-70 hover:bg-opacity-90 rounded flex items-center justify-center p-0.5 mr-2"
                onClick={() => onChannelClick(channel, true)}
              >
                <HiXMark className=" text-white-200" />
              </button>
            ) : null}
          </div>
        );
      })}
    </>
  );
}
