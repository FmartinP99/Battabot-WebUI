import { DateTimePicker } from "../shared/DateTimePicker";
import { Button } from "../ui/button";
import { isPast } from "../../helpers/utils";
import { useReminder } from "../../hooks/useReminder";
import { Textarea } from "../ui/textarea";
import RemindmeControl from "./RemindmeControl";

export default function Remindme({ memberId }: { memberId: string }) {
  const { date, setValidDate, sendReminder, text, handleSetText } =
    useReminder(memberId);

  if (!memberId) {
    return null;
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Date picker section */}
      <div className="space-y-3">
        <div className="flex flex-col items-center gap-2">
          <DateTimePicker
            disabledMatcher={isPast}
            handleSetDate={setValidDate}
            date={date}
            disablePortal={true}
            extraClassName={"w-full"}
          />

          <RemindmeControl handleSetDate={setValidDate} date={date} />
        </div>
      </div>

      {/* Message input */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-accent-x3 uppercase tracking-wide">
          Message (Optional)
        </label>
        <Textarea
          value={text}
          onChange={(e) => handleSetText(e.target.value)}
          placeholder="Type your message here."
          name="message"
          rows={5}
          className="w-full bg-primary-x2 border border-primary-x3 rounded-md text-accent-x2 placeholder:text-accent-x4 focus:border-accent-x1 focus:ring-1 focus:ring-accent-x1 transition-colors resize-none p-3 text-sm"
        />
      </div>
      <Button
        onClick={sendReminder}
        variant="outline"
        className="w-full font-semibold bg-gradient-to-br from-accent-x1 to-primary-action-hover hover:from-primary-action-hover hover:to-accent-x7 text-white border-none shadow-lg hover:shadow-accent-x1/30 transition-all duration-300 hover:scale-[1.02] active:scale-95"
      >
        Remind me
      </Button>
    </div>
  );
}
