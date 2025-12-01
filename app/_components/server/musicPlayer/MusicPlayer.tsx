import { WebsocketMessageType } from "@/app/_websocket/enums/websocket_message_type.enum";
import { WebSocketMessage } from "@/app/_websocket/types/websocket.types";
import { sendMessageThroughWebsocket } from "@/app/store/actions";
import { useEffect } from "react";
import MusicPlayerControls from "./MusicPlayerControls";
import MusicPlayerProgressBar from "./MusicPlayerProgressBar";
import Playlist from "./Playlist";
import { useAppDispatch, useAppSelector } from "@/app/hooks/storeHooks";
import { selectSelectedServerId } from "@/app/store/selectors";

export default function MusicPlayer() {
  const selectedServerId = useAppSelector(selectSelectedServerId);
  const dispatch = useAppDispatch();
  useEffect(() => {
    // request for the updated playlist state
    const payload: WebSocketMessage = {
      type: WebsocketMessageType.PLAYLIST_STATE_UPDATE,
      message: {
        serverId: selectedServerId,
      },
    };

    dispatch(sendMessageThroughWebsocket(payload));
  }, []);

  // to-do: progress bar component
  // to-do: controls component.
  return (
    <div className="flex flex-col h-full gap-2">
      <div className="flex gap-3 p-3">
        <MusicPlayerControls />
        <MusicPlayerProgressBar />
      </div>
      <Playlist />
    </div>
  );
}
