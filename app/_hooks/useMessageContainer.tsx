import { useEffect, useMemo, useRef } from "react";
import { groupMessages } from "../_helpers/utils";

export function useMessageContainer(activeChannelId: string, messages: any[]) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [activeChannelId, messages]);

  const isChannelInactive = activeChannelId === "0";

  const groups = useMemo(() => {
    if (isChannelInactive) return [];
    return groupMessages(messages);
  }, [messages, isChannelInactive]);

  return {
    containerRef,
    isChannelInactive,
    groups,
  };
}