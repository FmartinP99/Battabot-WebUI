interface ChatMentionedEntityProps
  extends React.HTMLAttributes<HTMLSpanElement> {
  backgroundColor?: string;
  textColor?: string;
  hoverBackgroundColor?: string;
  hoverTextColor?: string;
}

export default function ChatMentionedEntity({
  children,
  backgroundColor = "#1e40af",
  textColor = "#d1d5db",
  hoverBackgroundColor = "#2564eb",
  hoverTextColor = "#ffffff",
  ...props
}: ChatMentionedEntityProps &
  Readonly<{
    children: React.ReactNode;
  }>) {
  return (
    // +D3 -> Alpha setting
    <span
      className="mentioned-entity align-middle leading-normal p-0.5 rounded cursor-pointer"
      style={
        {
          "--bg": backgroundColor + "D3",
          "--text": textColor,
          "--bg-hover": hoverBackgroundColor,
          "--text-hover": hoverTextColor,
        } as React.CSSProperties
      }
      {...props}
    >
      {children}
    </span>
  );
}
