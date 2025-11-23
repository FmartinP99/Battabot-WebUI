import Image from "next/image";
import defaultBg from "@/app/files/profpic.png";
import { useSelector } from "react-redux";
import { formatEpoch } from "@/app/helpers/utils";
import { selectSelectedServerId, selectMembers } from "@/app/store/selectors";
import { WebsocketChatMessage } from "@/app/_websocket/types/websocket_init.types";

export default function ChatMessage({
  messages,
}: {
  messages: WebsocketChatMessage[];
}) {
  const members = useSelector(selectMembers);
  const selectedServerId = useSelector(selectSelectedServerId);

  const sender = members[selectedServerId ?? ""]?.find(
    (x) => x.memberId === messages?.[0]?.userId
  );

  return (
    <div className="flex gap-4 min-w-0 text-left py-3 px-2 rounded-lg hover:bg-white/5 -mx-2 transition-colors duration-200 group">
      <div className="flex-shrink-0 relative">
        <Image
          className="rounded-full object-cover shadow-lg ring-2 ring-white/5 group-hover:ring-white/10 transition-all duration-200"
          src={sender?.avatarUrl || defaultBg}
          alt="Not available"
          width="48"
          height="48"
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-baseline gap-3 mb-1">
          <span className="font-bold text-base text-white">
            {sender?.displayName ?? "Unknown"}
          </span>
          <span className="text-xs text-slate-400 font-medium">
            {formatEpoch(messages?.[0]?.epoch)}
          </span>
        </div>

        <div className="space-y-1">
          {messages?.map((msg) => (
            <div
              className="break-all whitespace-pre-wrap max-w-full text-slate-200 leading-relaxed"
              key={msg.messageId}
            >
              {msg.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
