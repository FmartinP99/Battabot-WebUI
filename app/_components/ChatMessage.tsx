import Image from "next/image";
import {
  WebsocketChatMessage,
  WebsocketInitMembers,
} from "../_websocket/interfaces/websocket_init.types";
import { useWebSocket } from "../_websocket/websocket";
import defaultBg from "@/app/_files/profpic.png";
import { formatEpoch } from "../_helpers/utils";

export default function ChatMessage({
  messages,
}: {
  messages: WebsocketChatMessage[];
}) {
  const { members, selectedServerId } = useWebSocket();
  const sender = members
    .get(selectedServerId ?? "0")
    ?.find((x) => x.memberId === messages?.[0].userId);

  return (
    <div className="flex gap-2 min-w-0 text-left mt-2 mb-2">
      <div className="flex-shrink-0">
        <Image
          className="rounded-full object-cover "
          src={sender?.avatarUrl || defaultBg}
          alt="Not available"
          width="45"
          height="45"
        />
      </div>

      <div className="min-w-0 mr-1">
        <span className="align-center font-bold text-lg">
          {sender?.displayName ?? "Unknown"} -{" "}
          <span className="text-base font-normal">
            {formatEpoch(messages?.[0].epoch)}
          </span>
        </span>

        {messages?.map((msg) => (
          <div
            className="break-all whitespace-pre-wrap max-w-full"
            key={msg.messageId}
          >
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
}
