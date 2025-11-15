import Image from "next/image";
import { WebsocketInitMembers } from "../_websocket/interfaces/websocket_init.interface";
import defaultBg from "@/app/_files/profpic.png";

export default function Member({ member }: { member: WebsocketInitMembers }) {
  return (
    <div className="flex gap-2 cursor-pointer align-center">
      <Image
        className="rounded-full object-cover max-h-[30px]"
        src={member.avatarUrl || defaultBg}
        alt="Not available"
        width="30"
        height="30"
      />
      <span className="truncate w-[180px] self-center text-left">
        {member.displayName}
      </span>
    </div>
  );
}
