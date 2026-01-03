import { useEffect, useState } from "react";

function Spinner() {
  // to prevent quick flashing
  const [show, setShow] = useState(false);
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShow(true);
    }, 100); //

    return () => clearTimeout(timeout);
  }, []);

  if (!show) return null;

  return (
    <div
      className="
    mx-auto
    w-[60px]
    aspect-square
    rounded-full
    border-[8px]
    border-primary-900
    border-r-primary-200
    animate-spin
  "
    />
  );
}

export default Spinner;
