import { WebsocketChatMessage } from "@/app/_websocket/types/websocket_init_reduced.types";
import {
  getMediaPreviewsFromMessage,
  formatMessageToRichText,
} from "@/app/helpers/chatMessageHelpers";

interface ChatMessageFormattedProps {
  message: WebsocketChatMessage;
}

export default function ChatMessageFormatted({
  message,
}: ChatMessageFormattedProps) {
  return (
    <div className="break-all whitespace-pre-wrap max-w-full text-slate-200 leading-relaxed text-left">
      <div>{formatMessageToRichText(message.text)}</div>
      <div className="">{getMediaPreviewsFromMessage(message.text)}</div>
    </div>
  );
}
