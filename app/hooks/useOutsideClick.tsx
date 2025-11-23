import { RefObject, useEffect, useRef } from "react";

type UseOutsideClickReturn<T extends HTMLElement> = RefObject<T>;

export function useOutsideClick<T extends HTMLElement>(
  handler?: VoidFunction,
  listenCapturing: boolean = true
): UseOutsideClickReturn<T> {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      const el = ref.current;
      if (!el || el.contains(event.target as Node)) return;
      handler?.();
    };
    document.addEventListener("pointerdown", handlePointerDown);
    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, [handler, listenCapturing]);

  return ref;
}
