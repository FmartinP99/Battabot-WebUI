import { useWebSocket } from "../_websocket/websocket";
import Button from "./Button";

export default function ReconnectButton({ className }: { className: string }) {
  const { createWebSocket } = useWebSocket();

  return (
    <Button className={className ? className : ""} onClick={createWebSocket}>
      <span>Reconnect...</span>
    </Button>
  );
}
