import { WebsocketMessageType } from "../_websocket/enums/websocket_message_type.enum";
import { WebSocketMessage } from "../_websocket/interfaces/websocket.interface";
import { useWebSocket } from "../_websocket/websocket";
import Button from "./Button";

export default function ChatInput({
  activeChannelId,
}: {
  activeChannelId: string;
}) {
  if (activeChannelId === "0") {
    return null;
  }

  const { sendMessage, selectedServerId } = useWebSocket();

  function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const payload = {
      type: WebsocketMessageType.SEND_MESSAGE,
      message: {
        serverId: selectedServerId,
        channelId: activeChannelId,
        text: formData.get("message"),
      },
    } as WebSocketMessage;

    const response = sendMessage(payload);

    e.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSendMessage} className="flex gap-3">
      <textarea
        name="message"
        id="message"
        className="w-full border border-gray-600 rounded-sm bg-inherit p-3 min-h-2 focus:ring-0 focus:outline-none "
        maxLength={1000}
        minLength={0}
        rows={1}
      />
      <Button
        appendClassName={true}
        className="min-w-[100px] border rounded-md"
        type="submit"
      >
        <span>Send</span>
      </Button>
    </form>
  );
}
