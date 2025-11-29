import { useMemo } from "react";
import { selectSelectedServerId, selectSongs } from "../store/selectors";
import { useAppSelector } from "./storeHooks";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Music } from "../_components/server/musicPlayer/music.type";

export function useMusicPlayerTable() {
  const selectedServerId = useAppSelector(selectSelectedServerId);
  const songs = useAppSelector((state) =>
    selectSongs(state, selectedServerId ?? "")
  );

  const songsArray = useMemo(() => {
    if (!songs) return [];
    return Object.entries(songs).map(([key, song]) => ({
      ...song,
    }));
  }, [songs]);

  const columns = useMemo(() => {
    if (!songsArray.length) return [];

    const columnHelper = createColumnHelper<Music>();

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
