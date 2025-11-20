import { addMinutes } from "date-fns";
import { Button } from "./ui/button";

interface RemindmeControlParams {
  date: Date;
  handleSetDate: (date: Date | undefined) => void;
}

export default function RemindmeControl({
  date,
  handleSetDate,
}: RemindmeControlParams) {
  return (
    <div className="flex gap-1 w-full flex-1">
      <Button
        variant="outline"
        className="flex-1"
        onClick={() => handleSetDate(addMinutes(date, -5))}
      >
        -5 min
      </Button>
      <Button
        variant="outline"
        className="flex-1"
        onClick={() => handleSetDate(addMinutes(date, -1))}
      >
        -1 min
      </Button>
      <Button
        variant="outline"
        className="flex-1"
        onClick={() => handleSetDate(new Date())}
      >
        <span>Reset</span>
      </Button>
      <Button
        variant="outline"
        className="flex-1"
        onClick={() => handleSetDate(addMinutes(date, 1))}
      >
        +1 min
      </Button>
      <Button
        variant="outline"
        className="flex-1"
        onClick={() => handleSetDate(addMinutes(date, 5))}
      >
        +5 min
      </Button>
    </div>
  );
}
