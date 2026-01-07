import { useEffect, useLayoutEffect, useMemo, useRef } from "react";
import { groupMessages } from "../helpers/utils";
import { useVirtualizer } from "@tanstack/react-virtual";

const BOTTOM_THRESHOLD = 150;

export function useMessageContainer(
  activeChannelId: string | null,
  messages?: any[]
) {
  const containerRef = useRef<HTMLDivElement>(null);
  const isNearBottomRef = useRef(true);
  const lastTotalSizeRef = useRef(0);

  const isChannelInactive = !activeChannelId;

  const groups = useMemo(() => {
    if (isChannelInactive) return [];
    return groupMessages(messages ?? []);
  }, [messages, isChannelInactive]);

  const rowVirtualizer = useVirtualizer({
    count: groups?.length ?? 0,
    getScrollElement: () => containerRef.current,
    estimateSize: () => 100,
    overscan: 10,
  });

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const onScroll = () => {
      const { scrollTop, clientHeight } = el;
      const totalSize = rowVirtualizer.getTotalSize();

      isNearBottomRef.current =
        totalSize - (scrollTop + clientHeight) < BOTTOM_THRESHOLD;
    };

    el.addEventListener("scroll", onScroll);
    return () => el.removeEventListener("scroll", onScroll);
  }, [rowVirtualizer]);

  useLayoutEffect(() => {
    const totalSize = rowVirtualizer.getTotalSize();
    const sizeIncreased = totalSize > lastTotalSizeRef.current;

    if (sizeIncreased && isNearBottomRef.current) {
      rowVirtualizer.scrollToIndex(groups.length - 1, {
        align: "end",
      });
    }

    lastTotalSizeRef.current = totalSize;
  }, [messages, groups.length, rowVirtualizer]);

  return {
    containerRef,
    isChannelInactive,
    groups,
    rowVirtualizer,
  };
}
