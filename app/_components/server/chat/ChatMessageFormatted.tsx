import { WebsocketChatMessage } from "@/app/_websocket/types/websocket_init.types";
import useChatMessageRender from "@/app/hooks/useChatMessageRender";

interface ChatMessageFormattedProps {
  message: WebsocketChatMessage;
}

export default function ChatMessageFormatted({
  message,
}: ChatMessageFormattedProps) {
  const { getImagesFromMessage, renderMessageWithImageNames } =
    useChatMessageRender();

  return (
    <div className="break-all whitespace-pre-wrap max-w-full text-slate-200 leading-relaxed text-left">
      {renderMessageWithImageNames(message.text)}
      {getImagesFromMessage(message.text)}
    </div>
  );
}
