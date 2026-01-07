export interface HandleKeyDownContext<T> {
  e: KeyboardEvent;
  items: T[];
  selectedIndex: number;
  setSelectedIndex: React.Dispatch<React.SetStateAction<number>>;
  onSelect: (item: T) => void;
}
