import { useMemo } from "react";
import { selectMemberByActiveServer } from "../store/selectors";
import { useAppSelector } from "./storeHooks";

export function useChatMemberMention(mention: string) {
  const memberId = useMemo(() => {
    const match = mention.match(/<@(\d+)>/);
    return match?.[1] ?? null;
  }, [mention]);

  const member = useAppSelector((state) =>
    memberId ? selectMemberByActiveServer(state, memberId) : null
  );

  return {
    member,
  };
}
