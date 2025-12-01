import MusicPlayerControls from "./MusicPlayerControls";
import MusicPlayerProgressBar from "./MusicPlayerProgressBar";
import Playlist from "./Playlist";
import useMusicPlayer from "@/app/hooks/useMusicPlayer";

export default function MusicPlayer() {
  const { selectedSongName } = useMusicPlayer();

  // to-do: progress bar component
  // to-do: controls component.
  return (
    <div className="flex flex-col h-full gap-2 relative">
      <div className="flex gap-3 p-3">
        <MusicPlayerControls />
        <MusicPlayerProgressBar />
      </div>
      {selectedSongName && (
        <div className="absolute top-[2px] left-0 w-full text-center">
          <span className="text-[1rem]">{selectedSongName}</span>
        </div>
      )}
      <Playlist />
    </div>
  );
}
