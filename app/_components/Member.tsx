import Image from "next/image";
import { WebsocketInitMembers } from "../_websocket/types/websocket_init.types";
import defaultBg from "@/app/_files/profpic.png";

export default function Member({
  member,
  noMaxWidth,
  isLarge,
}: {
  member: WebsocketInitMembers;
  noMaxWidth?: boolean;
  isLarge?: boolean;
}) {
  const pxHeight = isLarge ? "45" : "30";

  return (
    <div
      className={`flex gap-2 cursor-pointer align-center ${
        noMaxWidth ? "" : "w-[180px]}"
      }`}
    >
      <Image
        className={`rounded-full object-cover max-h-[${pxHeight}px]`}
        src={member.avatarUrl || defaultBg}
        alt="Not available"
        width={pxHeight}
        height={pxHeight}
      />
      <span
        className={`truncate self-center text-left ${
          isLarge ? "text-2xl font-bold" : ""
        }`}
      >
        {member.displayName}
      </span>
    </div>
  );
}
