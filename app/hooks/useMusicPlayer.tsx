import { useEffect } from "react";
import { WebSocketMessage } from "../_websocket/types/websocket.types";
import { sendMessageThroughWebsocket } from "../store/actions";
import {
  selectPlaylistState,
  selectSelectedServerId,
} from "../store/selectors";
import { useAppSelector, useAppDispatch } from "./storeHooks";
import {
  WebsocketMessageType,
  WebsocketPlaylistStateUpdateQuery,
} from "../_websocket/types/websocket_init.types";

export default function useMusicPlayer() {
  const selectedServerId = useAppSelector(selectSelectedServerId);
  const playlistState = useAppSelector((state) =>
    selectedServerId ? selectPlaylistState(state, selectedServerId) : undefined
  );
  const selectedSongArtist = playlistState?.selectedSong.artist ?? "";
  const selectedSongTitle = playlistState?.selectedSong?.title ?? "";

  const selectedSongName = selectedSongArtist
    ? `${selectedSongArtist} - ${selectedSongTitle}`
    : selectedSongTitle;

  const dispatch = useAppDispatch();
  useEffect(() => {
    // request for the updated playlist state
    const payload: WebSocketMessage = {
      type: WebsocketMessageType.PLAYLIST_STATE_UPDATE,
      message: {
        serverId: selectedServerId,
      } as WebsocketPlaylistStateUpdateQuery,
    };

    dispatch(sendMessageThroughWebsocket(payload));
  }, []);

  return { selectedSongName };
}
