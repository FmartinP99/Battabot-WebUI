import { WebSocketMessage } from "../_websocket/types/websocket.types";
import { WebsocketMessageType } from "../_websocket/types/websocket_init.types";

export const connectWebSocket = () => ({ type: "websocket/connectAction" });
export const sendMessageThroughWebsocket = (payload: WebSocketMessage) => ({
  type: "websocket/sendMessageAction",
  payload: payload,
});
export const setLoaderValue = (payload: {
  key: WebsocketMessageType;
  value: boolean;
}) => ({ type: "websocket/setLoaderValueAction", payload: payload });
