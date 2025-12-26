import { useMemo } from "react";
import { selectChannelByActiveServer } from "../store/selectors";
import { useAppSelector } from "./storeHooks";
import { useActiveServerData } from "./useActiveServerData";

export function useChatChannelMention(mention: string) {
  const channelId = useMemo(() => {
    const match = mention.match(/<#(\d+)>/);
    return match?.[1] ?? null;
  }, [mention]);

  const channel = useAppSelector((state) =>
    channelId ? selectChannelByActiveServer(state, channelId) : null
  );

  const { handleOnChannelClick } = useActiveServerData();

  return {
    channel,
    handleOnChannelClick,
  };
}
