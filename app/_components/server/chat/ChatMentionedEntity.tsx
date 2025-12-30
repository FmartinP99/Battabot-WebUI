export default function ChatMentionedEntity({
  children,
  ...props
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <span
      className=" align-middle leading-normal p-0.5 bg-blue-800 text-gray-300 hover:bg-blue-600 hover:text-white rounded cursor-pointer "
      {...props}
    >
      {children}
    </span>
  );
}
