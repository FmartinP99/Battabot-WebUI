import { useEffect, useMemo, useRef } from "react";
import { groupMessages } from "../helpers/utils";
import { useVirtualizer } from "@tanstack/react-virtual";

export function useMessageContainer(
  activeChannelId: string | null,
  messages?: any[]
) {
  const containerRef = useRef<HTMLDivElement>(null);

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

    const scrollToBottom = () => {
      el.scrollTop = rowVirtualizer.getTotalSize();
    };

    const id = requestAnimationFrame(() => {
      scrollToBottom();

      setTimeout(scrollToBottom, 1);
    });

    return () => cancelAnimationFrame(id);
  }, [groups?.length, rowVirtualizer]);

  return {
    containerRef,
    isChannelInactive,
    groups,
    rowVirtualizer,
  };
}
