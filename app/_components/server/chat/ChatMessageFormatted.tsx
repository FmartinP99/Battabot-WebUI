import { WebsocketChatMessage } from "@/app/_websocket/types/websocket_init.types";
import { getImagesFromMessage, renderMessageWithImageNames } from "@/app/helpers/chatMessageHelpers";

interface ChatMessageFormattedProps {
  message: WebsocketChatMessage;
}

export default function ChatMessageFormatted({
  message,
}: ChatMessageFormattedProps) {
  return (
    <div className="break-all whitespace-pre-wrap max-w-full text-slate-200 leading-relaxed text-left">
      <div>{renderMessageWithImageNames(message.text)}</div>
      <div className="">{getImagesFromMessage(message.text)}</div>
    </div>
  );
}
