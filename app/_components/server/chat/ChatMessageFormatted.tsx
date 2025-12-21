import { WebsocketChatMessage } from "@/app/_websocket/types/websocket_init_reduced.types";
import {
  getMediaPreviewsFromMessage,
  renderMessageWithImageNames,
} from "@/app/helpers/chatMessageHelpers";

interface ChatMessageFormattedProps {
  message: WebsocketChatMessage;
}

const imageUrlRegex =
  /(https?:\/\/(?:cdn\.discordapp\.com|media\.discordapp\.net)\/[^\s]+)|(https?:\/\/[^\s]+?\.(?:png|jpe?g|gif|webp|svg))/gi;

const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/gi;

const urlRege2x = /(https?:\/\/[^\s]+)/g;

export default function ChatMessageFormatted({
  message,
}: ChatMessageFormattedProps) {
  return (
    <div className="break-all whitespace-pre-wrap max-w-full text-slate-200 leading-relaxed text-left">
      <div>{renderMessageWithImageNames(message.text)}</div>
      <div className="">{getMediaPreviewsFromMessage(message.text)}</div>
    </div>
  );
}
