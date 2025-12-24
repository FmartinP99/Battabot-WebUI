import { useMemo } from "react";
import { selectSongsForSelectedServer } from "../store/selectors";
import { useAppSelector } from "./storeHooks";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { WebsocketMusic } from "../_websocket/types/websocket_init.types";

export function useMusicPlayerTable() {
  const songs = useAppSelector(selectSongsForSelectedServer);

  const songsArray = useMemo(() => {
    if (!songs) return [];
    return songs ? Object.values(songs) : [];
  }, [songs]);

  const columns = useMemo(() => {
    if (!songsArray.length) return [];

    const columnHelper = createColumnHelper<WebsocketMusic>();

    return [
      columnHelper.accessor("index", {
        header: "#",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("artist", {
        header: "Artist",
        cell: (info) => info.getValue(),
      }),
      columnHelper.accessor("title", {
        header: "Title",
        cell: (info) => info.getValue(),
      }),

      columnHelper.accessor("lengthStr", {
        header: "Length",
        cell: (info) => info.getValue(),
      }),
    ];
  }, [songsArray]);

  const table = useReactTable({
    data: songsArray,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return { table };
}
