import { ReactNode } from "react";

type ButtonProps = {
  children: React.ReactNode;
  onClick?: (...args: any[]) => any;
  className?: string;
  appendClassName?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
};

export default function Button({
  children,
  onClick,
  className,
  appendClassName,
  type = "button",
}: ButtonProps) {
  return (
    <button
      className={
        className && !appendClassName
          ? className
          : `flex items-center justify-center gap-6 text-lg border border-primary-300 px-1 py-1 font-medium bg-accent-600 ${
              appendClassName ? className : ""
            }`
      }
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
}
