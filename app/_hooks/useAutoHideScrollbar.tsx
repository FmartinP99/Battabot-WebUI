import { useEffect, useState, RefObject } from "react";

export default function useAutoHideScrollbar(
  ref: RefObject<HTMLElement>,
  delay: number = 2000
) {
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let timer: ReturnType<typeof setTimeout>;

    const handleScroll = () => {
      setHidden(false);

      clearTimeout(timer);
      timer = setTimeout(() => {
        setHidden(true);
      }, delay);
    };

    el.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      el.removeEventListener("scroll", handleScroll);
    };
  }, [ref.current, delay]);

  return hidden;
}
