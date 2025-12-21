import { useCallback } from "react";
import { WebSocketMessage } from "../_websocket/types/websocket.types";
import { sendMessageThroughWebsocket } from "../store/actions";
import {
  selectSelectedServerId,
  selectRolesByServerId,
} from "../store/selectors";
import { useAppDispatch, useAppSelector } from "./storeHooks";
import {
  WebsocketMessageType,
  WebsocketToggleRoleQuery,
} from "../_websocket/types/websocket_init.types";

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
        } as WebsocketToggleRoleQuery,
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
