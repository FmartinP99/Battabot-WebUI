import { useDispatch } from "react-redux";
import { Button } from "../ui/button";
import { connectWebSocket } from "../../store/actions";

export default function ReconnectButton({ className }: { className?: string }) {
  const dispatch = useDispatch();

  return (
    <Button
      variant="chatMessageSend"
      className={className ? className : ""}
      onClick={() => dispatch(connectWebSocket())}
    >
      <span>Reconnect...</span>
    </Button>
  );
}
