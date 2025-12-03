import { useEffect, useState } from "react";
import {
  selectPlaylistState,
  selectSelectedServerId,
} from "../store/selectors";
import { useAppSelector } from "./storeHooks";
import { secondsToHHMMSS } from "../helpers/utils";

export function useProgressBarPercentage() {
  const selectedServerId = useAppSelector(selectSelectedServerId);
  const playlistState = useAppSelector((state) =>
    selectedServerId ? selectPlaylistState(state, selectedServerId) : undefined
  );

  const [playedDuration, setPlayedDuration] = useState(
    playlistState?.playedDuration ?? 0
  );

  useEffect(() => {
    setPlayedDuration(playlistState?.playedDuration ?? 0);
  }, [playlistState?.playedDuration, playlistState?.selectedSong?.length]);

  useEffect(() => {
    if (!playlistState?.isPlaying) return;

    const fps = 24;
    const intervalMs = 1000 / fps;
    const increment = intervalMs / 1000;

    const interval = setInterval(() => {
      setPlayedDuration((prev) => {
        const maxLength = playlistState?.selectedSong?.length ?? 1;
        const newVal = Math.min(prev + increment, maxLength);
        return newVal;
      });
    }, intervalMs);

    return () => clearInterval(interval);
  }, [playlistState?.isPlaying, playlistState?.selectedSong?.length]);

  const progressBarPercentage = playlistState
    ? playedDuration / Math.max(playlistState.selectedSong?.length ?? 1, 1)
    : 0;

  const maxDurationStr = playlistState?.selectedSong.lengthStr;
  const playedDurationStr = secondsToHHMMSS(playedDuration, true);

  return { progressBarPercentage, playedDurationStr, maxDurationStr };
}
