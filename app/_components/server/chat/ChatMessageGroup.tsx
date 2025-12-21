import Image from "next/image";
import defaultBg from "@/app/files/profpic.png";
import { formatEpoch } from "@/app/helpers/utils";
import { selectSelectedServerId, selectMembers } from "@/app/store/selectors";
import ChatMessageFormatted from "./ChatMessageFormatted";
import Modal from "../../shared/Modal";
import MemberPopup from "../member/MemberPopup";
import { useMemberRoleColor } from "@/app/hooks/useMemberRoleColor";
import { useAppSelector } from "@/app/hooks/storeHooks";
import { WebsocketChatMessage } from "@/app/_websocket/types/websocket_init_reduced.types";

interface ChatMessageGroupProps {
  messages: WebsocketChatMessage[];
}

export default function ChatMessageGroup({ messages }: ChatMessageGroupProps) {
  const members = useAppSelector(selectMembers);
  const selectedServerId = useAppSelector(selectSelectedServerId);

  const sender = members[selectedServerId ?? ""]?.find(
    (x) => x.memberId === messages?.[0]?.userId
  );

  const { color } = useMemberRoleColor(sender?.roleIds ?? []);
  if (!sender) return;

  return (
    <div className="flex gap-4 min-w-0 text-left py-3 px-2 rounded-lg hover:bg-white/5 -mx-2 transition-colors duration-200 group">
      <Modal>
        <Modal.Open opens={sender.memberId.toString()}>
          <div className="flex-shrink-0 relative  hover:cursor-pointer">
            <Image
              className="rounded-full object-cover shadow-lg ring-2 ring-white/5 group-hover:ring-white/10 transition-all duration-200"
              src={sender?.avatarUrl || defaultBg}
              alt="Not available"
              width="48"
              height="48"
            />
          </div>
        </Modal.Open>

        <div className="min-w-0 flex-1">
          <div className="flex items-baseline gap-3 mb-1">
            <Modal.Open opens={sender.memberId.toString()}>
              <span
                style={{ color: color }}
                className="font-bold text-base text-white hover:cursor-pointer hover:underline"
              >
                {sender?.displayName ?? "Unknown"}
              </span>
            </Modal.Open>
            <span className="text-xs text-slate-400 font-medium hover:cursor-default">
              {formatEpoch(messages?.[0]?.epoch)}
            </span>
          </div>

          <div className="space-y-1">
            {messages?.map((msg) => (
              <ChatMessageFormatted message={msg} key={msg.messageId} />
            ))}
          </div>
        </div>

        <Modal.Window name={sender.memberId.toString()} position="top">
          <MemberPopup member={sender} />
        </Modal.Window>
      </Modal>
    </div>
  );
}
