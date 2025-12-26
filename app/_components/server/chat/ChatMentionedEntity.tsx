export default function ChatMentionedEntity({
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <span
      className="bg-blue-800 text-gray-300 hover:bg-blue-600 hover:text-white  px-1 rounded cursor-pointer"
      {...props}
    >
      {children}
    </span>
  );
}
