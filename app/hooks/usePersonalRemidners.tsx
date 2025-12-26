import { useEffect, useState } from "react";
import { WebSocketMessage } from "../_websocket/types/websocket.types";
import {
  WebsocketMessageType,
  WebsocketGetRemindersQuery,
  WebsocketReminder,
  WebsocketGetRemindersResponse,
} from "../_websocket/types/websocket_init.types";
import { setLoaderValue, sendMessageThroughWebsocket } from "../store/actions";
import {
  selectSelectedServerId,
  selectRemindersByServerIdAndMemberId,
  selectLoader,
} from "../store/selectors";
import { useAppDispatch, useAppSelector } from "./storeHooks";
import {
  createColumnHelper,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { formatEpoch } from "../helpers/utils";
import { setReminders } from "../_websocket/websocketSlice";

export function usePersonalReminders(memberId: string) {
  const dispatch = useAppDispatch();
  const selectedServerId = useAppSelector(selectSelectedServerId);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  const handleSetSelectedIndex = (index: number) => {
    setSelectedIndex((ix) => index);
  };

  const reminders = useAppSelector((state) =>
    selectedServerId && memberId
      ? selectRemindersByServerIdAndMemberId(state, selectedServerId, memberId)
      : []
  );

  const isLoading = useAppSelector((state) =>
    selectLoader(state, WebsocketMessageType.GET_REMINDERS)
  );

  useEffect(() => {
    if (!selectedServerId || !memberId) return;

    dispatch(
      setLoaderValue({
        key: WebsocketMessageType.GET_REMINDERS,
        value: true,
      })
    );

    // clearing it out in case of an error
    dispatch(
      setReminders({
        serverId: selectedServerId,
        memberId,
        reminders: [] as WebsocketReminder[],
      } as WebsocketGetRemindersResponse)
    );

    const payload: WebSocketMessage = {
      type: WebsocketMessageType.GET_REMINDERS,
      message: {
        serverId: selectedServerId,
        memberId,
      } as WebsocketGetRemindersQuery,
    };

    dispatch(sendMessageThroughWebsocket(payload));
  }, [selectedServerId, memberId]);

  const columnHelper = createColumnHelper<WebsocketReminder>();
  const columns = [
    columnHelper.accessor("id", {
      header: "#",
      cell: (info) => info.getValue(),
    }),
    columnHelper.accessor("remind_time", {
      header: "Remind time",
      cell: (info) => {
        const epoch = info.getValue();
        const formattedDate = formatEpoch(epoch);

        return (
          <div
            style={{
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {formattedDate}
          </div>
        );
      },
    }),
    columnHelper.accessor("remind_text", {
      header: "Text",
      cell: (info) => (
        <div
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "200px",
          }}
        >
          {info.getValue()}
        </div>
      ),
    }),

    columnHelper.accessor("status", {
      header: "Status",
      cell: (info) => info.getValue(),
    }),
  ];

  const table = useReactTable({
    data: reminders ?? [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return {
    table,
    isLoading,
    selectedIndex,
    handleSetSelectedIndex,
  };
}
