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
import { WebSocketMessage } from "@/app/_websocket/types/websocket.types";
import { sendMessageThroughWebsocket } from "@/app/store/actions";
import { WebsocketMessageType, WebsocketMusic, WebsocketPlaylistSongSkipQuery } from "@/app/_websocket/types/websocket_init.types";

export default function Playlist() {
  const { table } = useMusicPlayerTable();

  const selectedServerId = useAppSelector(selectSelectedServerId);
  const playlistState = useAppSelector((state) =>
    selectedServerId ? selectPlaylistState(state, selectedServerId) : undefined
  );
  const dispatch = useAppDispatch();

  function handleSelectNewSong(music: WebsocketMusic) {
    if(!selectedServerId) return

    const payload: WebSocketMessage = {
      type: WebsocketMessageType.PLAYLIST_SONG_SKIP,
      message: {
        serverId: selectedServerId,
        songIndex: music.index,
      } as WebsocketPlaylistSongSkipQuery,
    };
    dispatch(sendMessageThroughWebsocket(payload));
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
            {row.getVisibleCells()?.map((cell) => (
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
