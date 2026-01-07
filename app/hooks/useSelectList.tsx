import { useEffect, useRef, useState } from "react";
import { HandleKeyDownContext } from "../helpers/selectlistHelpers";

interface UseSelectableListProps<T> {
  items: T[];
  handleKeyDown: (ctx: HandleKeyDownContext<T>) => void;
  onSelect: (item: T) => void;
}

export function useSelectList<T>({
  items,
  handleKeyDown,
  onSelect,
}: UseSelectableListProps<T>) {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      handleKeyDown({
        e,
        items,
        selectedIndex,
        setSelectedIndex,
        onSelect,
      });
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [items, selectedIndex, onSelect]);

  useEffect(() => {
    const activeEl = itemRefs.current[selectedIndex];
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest", behavior: "instant" });
    }
  }, [selectedIndex]);

  return { selectedIndex, setSelectedIndex, itemRefs };
}
