import { useCallback } from "react";
import {
  selectPlaylistState,
  selectSelectedServerId,
} from "../store/selectors";
import { useAppDispatch, useAppSelector } from "./storeHooks";
import { clamp } from "../helpers/utils";
import { WebSocketMessage } from "../_websocket/types/websocket.types";
import { sendMessageThroughWebsocket } from "../store/actions";
import {
  WebsocketMessageType,
  WebsocketPlaylistPauseQuery,
  WebsocketPlaylistResumeQuery,
  WebsocketPlaylistSongSkipQuery,
} from "../_websocket/types/websocket_init.types";

export default function useMusicPlayerControls() {
  const selectedServerId = useAppSelector(selectSelectedServerId);
  const playlistState = useAppSelector((state) =>
    selectedServerId ? selectPlaylistState(state, selectedServerId) : undefined
  );

  const isPaused = !playlistState?.isPlaying;

  const dispatch = useAppDispatch();

  const pause = useCallback(() => {
    const payload: WebSocketMessage = {
      type: WebsocketMessageType.PLAYLIST_PAUSE,
      message: {
        serverId: selectedServerId,
      } as WebsocketPlaylistPauseQuery,
    };

    dispatch(sendMessageThroughWebsocket(payload));
  }, [selectedServerId]);

  const resume = useCallback(() => {
    const payload: WebSocketMessage = {
      type: WebsocketMessageType.PLAYLIST_RESUME,
      message: {
        serverId: selectedServerId,
      } as WebsocketPlaylistResumeQuery,
    };

    dispatch(sendMessageThroughWebsocket(payload));
  }, [selectedServerId]);

  const togglePlay = useCallback(
    () => (isPaused ? resume() : pause()),
    [isPaused, pause, resume]
  );

  const skip = useCallback(
    (direction: 1 | -1) => {
      const musicIndex = playlistState?.selectedSong?.index;
      if (musicIndex === undefined) return;

      const songs = playlistState?.songs;
      if (!songs?.length) return;

      const maxIndex = Math.max(...songs.map((s) => s.index));
      const newIndex = clamp(musicIndex + direction, 0, maxIndex);

      const payload: WebSocketMessage = {
        type: WebsocketMessageType.PLAYLIST_SONG_SKIP,
        message: {
          serverId: selectedServerId,
          songIndex: newIndex,
        } as WebsocketPlaylistSongSkipQuery,
      };

      dispatch(sendMessageThroughWebsocket(payload));
    },
    [playlistState, selectedServerId]
  );

  const next = useCallback(() => skip(1), [skip]);
  const previous = useCallback(() => skip(-1), [skip]);

  return {
    next,
    previous,
    togglePlay,
    isPaused,
  };
}
