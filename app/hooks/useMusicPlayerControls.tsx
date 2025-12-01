import { useCallback } from "react";
import {
  selectPlaylistState,
  selectSelectedServerId,
} from "../store/selectors";
import { useAppDispatch, useAppSelector } from "./storeHooks";
import { clamp } from "../helpers/utils";
import { WebSocketMessage } from "../_websocket/types/websocket.types";
import { WebsocketMessageType } from "../_websocket/enums/websocket_message_type.enum";
import { sendMessageThroughWebsocket } from "../store/actions";

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
      },
    };

    dispatch(sendMessageThroughWebsocket(payload));
  }, [selectedServerId]);

  const resume = useCallback(() => {
    const payload: WebSocketMessage = {
      type: WebsocketMessageType.PLAYLIST_RESUME,
      message: {
        serverId: selectedServerId,
      },
    };

    dispatch(sendMessageThroughWebsocket(payload));
  }, [selectedServerId]);

  const togglePlay = useCallback(() => {
    if (isPaused) {
      resume();
    } else {
      pause();
    }
  }, [isPaused, pause, resume]);

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
        },
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
