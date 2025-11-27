import { useMusicPlayerTable } from "@/app/hooks/useMusicPlayerTable";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../../ui/table";
import { flexRender } from "@tanstack/react-table";
import { useAppDispatch, useAppSelector } from "@/app/hooks/storeHooks";
import {
  selectPlaylistState,
  selectSelectedServerId,
} from "@/app/store/selectors";
import { Music, PlaylistState } from "./music.type";
import { updatePlaylistState } from "@/app/_websocket/websocketSlice";

export default function Playlist() {
  const { table } = useMusicPlayerTable();
  const selectedServerId = useAppSelector(selectSelectedServerId);
  const playlistState = useAppSelector((state) =>
    selectedServerId ? selectPlaylistState(state, selectedServerId) : undefined
  );
  const dispatch = useAppDispatch();

  function handleSelectNewSong(music: Music) {
    const playlistId = playlistState?.selectedSong.index;
    const musicId = music.index;
    if (playlistId === musicId) return;

    const newState: PlaylistState = {
      selectedSong: music,
      isPlaying: false,
      playedDuration: 0,
    };
    dispatch(updatePlaylistState(newState));
  }

  return (
    <Table>
      <TableHeader>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id} className="uppercase">
            {headerGroup.headers.map((header) => (
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
        {table.getRowModel().rows.map((row) => (
          <TableRow
            onClick={() => handleSelectNewSong(row.original)}
            key={row.id}
            className={`cursor-pointer hover:bg-white/5  border-b-white/20
                ${
                  row.getValue("index") == playlistState?.selectedSong.index
                    ? "bg-white/10"
                    : ""
                }
            `}
          >
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id} className="text-left">
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
