import Image from "next/image";
import { WebsocketInitMembers } from "../../../_websocket/types/websocket_init.types";
import defaultBg from "@/app/files/profpic.png";
import React from "react";

function Member({
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
      className={`flex gap-3 items-center cursor-pointer transition-all duration-200 ${
        noMaxWidth ? "" : "w-[180px]"
      }`}
    >
      <div className="relative flex-shrink-0 group">
        <div className="absolute -inset-0.5 bg-gradient-to-br from-accent-x1 to-accent-x5 rounded-full opacity-0 group-hover:opacity-60 blur-sm transition-opacity duration-300"></div>

        <Image
          className={`relative rounded-full object-cover ring-2 ring-transparent group-hover:ring-accent-x1/30 transition-all duration-300 max-h-[${pxHeight}px]`}
          src={member.avatarUrl || defaultBg}
          alt="Not available"
          width={pxHeight}
          height={pxHeight}
        />

        <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-accent-x6 rounded-full border-2 border-primary-x2"></div>
      </div>

      <span
        className={`truncate self-center text-left text-[#e4e4e7] font-medium transition-colors duration-200 hover:text-white ${
          isLarge ? "text-2xl font-bold" : "text-sm"
        }`}
      >
        {member.displayName}
      </span>
    </div>
  );
}

export default React.memo(Member);
