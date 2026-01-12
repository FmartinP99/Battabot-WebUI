import { selectMembersByServerId } from "@/app/store/selectors";
import { useAppSelector } from "@/app/hooks/storeHooks";
import { useSelectList } from "@/app/hooks/useSelectList";
import { WebsocketInitMembers } from "@/app/_websocket/types/websocket_init.types";
import ChatMemberSelectListItem from "./ChatMemberSelectListItem";
import { handleKeyDownForSelectListBasic } from "./helpers/chatInputHelpers";
import { DUMMY_MEMBER } from "@/app/helpers/consts";

interface ChatMemberSelectListProps {
  serverId: string;
  handleSelectListItemClick: (id: string) => void;
  className?: string;
  filter: string | null;
}

export default function ChatMemberSelectList({
  serverId,
  className,
  handleSelectListItemClick,
  filter,
}: ChatMemberSelectListProps) {
  const members = useAppSelector((state) =>
    selectMembersByServerId(state, serverId)
  );

  const filteredMembers = filter
    ? members.filter(
        (members) =>
          members.name
            .toLocaleLowerCase()
            .startsWith(filter.toLocaleLowerCase()) ||
          members.displayName
            .toLocaleLowerCase()
            .startsWith(filter.toLocaleLowerCase())
      )
    : members;

  const { selectedIndex, setSelectedIndex, itemRefs } =
    useSelectList<WebsocketInitMembers>({
      items: filteredMembers,
      onSelect: (member) => handleSelectListItemClick(member.rawStr),
      handleKeyDown: handleKeyDownForSelectListBasic,
    });

  if (!filteredMembers?.length) {
    return (
      <ChatMemberSelectListItem
        key={"dummy"}
        member={DUMMY_MEMBER}
        isActive={false}
        onItemClick={() => {}}
        showImage={false}
      />
    );
  }

  return (
    <div className={className}>
      {filteredMembers.map((member, idx) => (
        <ChatMemberSelectListItem
          ref={(el) => {
            itemRefs.current[idx] = el;
          }}
          onMouseEnter={() => setSelectedIndex(idx)}
          key={member.memberId}
          member={member}
          isActive={idx === selectedIndex}
          onItemClick={() => handleSelectListItemClick(member.rawStr)}
        />
      ))}
    </div>
  );
}
