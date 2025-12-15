import { useCallback } from "react";
import { WebsocketMessageType } from "../_websocket/enums/websocket_message_type.enum";
import { WebSocketMessage } from "../_websocket/types/websocket.types";
import { sendMessageThroughWebsocket } from "../store/actions";
import {
  selectSelectedServerId,
  selectRolesByServerId,
} from "../store/selectors";
import { useAppDispatch, useAppSelector } from "./storeHooks";

export function useServerRoles(memberId?: string) {
  const dispatch = useAppDispatch();
  const selectedServerId = useAppSelector(selectSelectedServerId);
  const serverRoles = useAppSelector((state) =>
    selectedServerId
      ? selectRolesByServerId(state, selectedServerId)
      : undefined
  );

  const handleRoleClick = useCallback(
    (roleId: string) => {
      if (!roleId || !memberId || !selectedServerId) return;

      const payload: WebSocketMessage = {
        type: WebsocketMessageType.TOGGLE_ROLE,
        message: {
          serverId: selectedServerId,
          roleId,
          memberId,
        },
      };

      dispatch(sendMessageThroughWebsocket(payload));
    },
    [dispatch, memberId, selectedServerId]
  );

  return {
    serverRoles,
    handleRoleClick,
  };
}
