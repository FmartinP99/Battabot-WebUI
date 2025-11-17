import { useWebSocket } from "../_websocket/websocket";
import { Button } from "./ui/button";

export default function ReconnectButton({ className }: { className?: string }) {
  const { createWebSocket } = useWebSocket();

  return (
    <Button
      variant="outline"
      className={className ? className : ""}
      onClick={createWebSocket}
    >
      <span>Reconnect...</span>
    </Button>
  );
}
