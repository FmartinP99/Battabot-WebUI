import { HiPlayPause } from "react-icons/hi2";
import { Button } from "../../ui/button";
import useMusicPlayerControls from "@/app/hooks/useMusicPlayerControls";
import {
  TbPlayerSkipForward,
  TbPlayerSkipBack,
  TbPlayerPlay,
  TbPlayerPause,
} from "react-icons/tb";

export default function MusicPlayerControls() {
  const { next, previous, togglePlay, isPaused } = useMusicPlayerControls();

  return (
    <div className="flex gap-2">
      <Button variant="outlineClickable" onClick={previous}>
        <TbPlayerSkipBack />
      </Button>

      <Button
        variant="outline"
        onClick={togglePlay}
        className={`${!isPaused ? "scale-95 opacity-80 shadow-inner" : ""}`}
      >
        {isPaused ? <TbPlayerPlay /> : <TbPlayerPause />}
      </Button>

      <Button variant="outlineClickable" onClick={next}>
        <TbPlayerSkipForward />
      </Button>
    </div>
  );
}
