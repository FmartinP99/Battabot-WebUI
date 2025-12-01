import { useProgressBarPercentage } from "@/app/hooks/useProgressBarPercentage";

export default function MusicPlayerProgressBar() {
  const { progressBarPercentage, playedDurationStr, maxDurationStr } =
    useProgressBarPercentage();

  return (
    <div className="flex flex-1 items-center justify-center h-full relative">
      <div className="bg-black w-full h-[4px] rounded-lg relative">
        <div
          className="bg-accent-x1 h-full ring-1 rounded-lg ring-black transition-all duration-100 ease-out"
          style={{ width: progressBarPercentage * 100 + "%" }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 bg-accent-x1 rounded-full ring-1 ring-black transition-all duration-100 ease-out"
          style={{
            left: `calc(${progressBarPercentage * 100}% - 8px)`,
            width: "16px",
            height: "16px",
          }}
        />
      </div>
      <div className="ml-2 w-[100px]">
        <span className="text-sm whitespace-nowrap">
          {playedDurationStr} / {maxDurationStr}
        </span>
      </div>
    </div>
  );
}
