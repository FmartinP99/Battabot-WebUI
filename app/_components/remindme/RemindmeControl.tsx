import { addMinutes } from "date-fns";
import { Button } from "../ui/button";

interface RemindmeControlParams {
  date: Date;
  handleSetDate: (date: Date | undefined) => void;
}

export default function RemindmeControl({
  date,
  handleSetDate,
}: RemindmeControlParams) {
  return (
    <div className="flex gap-2 w-full">
      <Button
        variant="outline"
        size="sm"
        className="flex-1 bg-primary-x2 border-primary-x3  hover:border-accent-x1 text-accent-x2 transition-all duration-200 hover:shadow-md hover:shadow-accent-x1/20"
        onClick={() => handleSetDate(addMinutes(date, -5))}
      >
        -5 min
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex-1 bg-primary-x2 border-primary-x3  hover:border-accent-x1 text-accent-x2 transition-all duration-200 hover:shadow-md hover:shadow-accent-x1/20"
        onClick={() => handleSetDate(addMinutes(date, -1))}
      >
        -1 min
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex-1 bg-primary-x2 border-primary-x3  hover:border-accent-x1 text-accent-x2 transition-all duration-200 hover:shadow-md hover:shadow-accent-x1/20"
        onClick={() => handleSetDate(new Date())}
      >
        Reset
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex-1 bg-primary-x2 border-primary-x3  hover:border-accent-x1 text-accent-x2 transition-all duration-200 hover:shadow-md hover:shadow-accent-x1/20"
        onClick={() => handleSetDate(addMinutes(date, 1))}
      >
        +1 min
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="flex-1 bg-primary-x2 border-primary-x3  hover:border-accent-x1 text-accent-x2 transition-all duration-200 hover:shadow-md hover:shadow-accent-x1/20"
        onClick={() => handleSetDate(addMinutes(date, 5))}
      >
        +5 min
      </Button>
    </div>
  );
}
