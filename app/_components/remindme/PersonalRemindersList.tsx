import { useAppSelector } from "@/app/hooks/storeHooks";
import {
  selectRemindersByServerIdAndMemberId,
  selectSelectedServerId,
} from "@/app/store/selectors";

interface PersonalRemindersListProps {
  memberId: string;
}

export default function PersonalRemindersList({
  memberId,
}: PersonalRemindersListProps) {
  const selectedServerId = useAppSelector(selectSelectedServerId);
  const reminders = useAppSelector((state) =>
    selectedServerId && memberId
      ? selectRemindersByServerIdAndMemberId(state, selectedServerId, memberId)
      : undefined
  );

  if (!reminders) return null;
  if (!reminders.length) {
    return <span>There are no remidners for this user!</span>;
  }

  return reminders.map((reminder) => (
    <div key={reminder.id}>{reminder.id}</div>
  ));
}
