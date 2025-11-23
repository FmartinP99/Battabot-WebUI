import { WebSocketMessage } from "../_websocket/types/websocket.types";

export const connectWebSocket = () => ({ type: "websocket/connect" });
export const sendMessageThroughWebsocket = (payload: WebSocketMessage) => ({ type: "websocket/sendMessage", payload: payload });