import { useDispatch } from "react-redux";
import { Button } from "./ui/button";
import { connectWebSocket } from "../_store/actions";

export default function ReconnectButton({ className }: { className?: string }) {
  const dispatch = useDispatch();

  return (
    <Button
      variant="outline"
      className={className ? className : ""}
      onClick={() => dispatch(connectWebSocket())}
    >
      <span>Reconnect...</span>
    </Button>
  );
}
