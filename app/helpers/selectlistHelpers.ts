import { WebsocketInitEmotes } from "../_websocket/types/websocket_init.types";

export interface HandleKeyDownContext<T> {
  e: KeyboardEvent;
  items: T[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  onSelect: (item: T) => void;
}

export const handleKeyDownForEmoteSelectList = ({
  e,
  items,
  selectedIndex,
  setSelectedIndex,
  onSelect,
}: HandleKeyDownContext<WebsocketInitEmotes>) => {
  if (!items.length) return;

  if (e.key === "ArrowDown") {
    e.preventDefault();
    setSelectedIndex((prev) => (prev + 1) % items.length);
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    setSelectedIndex((prev) => (prev === 0 ? items.length - 1 : prev - 1));
  } else if (e.key === "Enter") {
    e.preventDefault();
    onSelect(items[selectedIndex]);
  }
};
