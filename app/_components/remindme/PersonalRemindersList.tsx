import Spinner from "../shared/Spinner";
import { usePersonalReminders } from "@/app/hooks/usePersonalRemidners";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { flexRender } from "@tanstack/react-table";

interface PersonalRemindersListProps {
  memberId: string;
}

export default function PersonalRemindersList({
  memberId,
}: PersonalRemindersListProps) {
  const { table, isLoading, selectedIndex, handleSetSelectedIndex } =
    usePersonalReminders(memberId);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-5 h-full">
        <Spinner />
        <p className="font-bold text-xl text-primary-200">
          Loading reminders...
        </p>
      </div>
    );
  }

  if (!table.getRowCount()) {
    return <span>There are no remidners for this user!</span>;
  }

  return (
    <Table className="overflow-y-auto">
      <TableHeader>
        {table.getHeaderGroups()?.map((headerGroup) => (
          <TableRow key={headerGroup.id} className="uppercase">
            {headerGroup.headers?.map((header) => (
              <TableHead key={header.id} className="text-white">
                {header.isPlaceholder
                  ? null
                  : flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
              </TableHead>
            ))}
          </TableRow>
        ))}
      </TableHeader>
      <TableBody>
        {table.getRowModel()?.rows.map((row) => (
          <TableRow
            onClick={() => handleSetSelectedIndex(row.original.id)}
            key={row.id}
            className={`cursor-pointer hover:bg-white/5  border-b-white/20
                ${row.getValue("id") === selectedIndex ? "bg-white/10" : ""}
            `}
          >
            {row.getVisibleCells()?.map((cell) => (
              <TableCell key={cell.id} className="text-left ">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
