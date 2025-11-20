import { DateTimePicker } from "./DateTimePicker";
import RemindmeControl from "./RemindmeControl";
import { Button } from "./ui/button";
import { isPast } from "../_helpers/utils";
import { useReminder } from "../_hooks/useReminder";
import { Textarea } from "./ui/textarea";

export default function Remindme({ memberId }: { memberId: string }) {
  const { date, setValidDate, sendReminder, text, handleSetText } =
    useReminder(memberId);

  if (!memberId) {
    return null;
  }

  return (
    <div className="mt-3 pb-3 pl-3 flex flex-col gap-2">
      <DateTimePicker
        disabledMatcher={isPast}
        handleSetDate={setValidDate}
        date={date}
        disablePortal={true}
      >
        <div className="flex flex-col-reverse gap-3 pl-3 ">
          <Button
            onClick={sendReminder}
            variant="outline"
            className="w-full  font-bold"
          >
            Remind me
          </Button>
        </div>
      </DateTimePicker>
      <RemindmeControl handleSetDate={setValidDate} date={date} />
      <Textarea
        value={text}
        onChange={(e) => handleSetText(e.target.value)}
        placeholder="Type your message here."
        name="message"
        rows={1}
      />
    </div>
  );
}
