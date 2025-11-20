import { WebsocketInitMembers } from "../_websocket/types/websocket_init.types";
import Member from "./Member";
import { useState } from "react";
import Remindme from "./Remindme";
import MemberPopupItemSelect from "./MemberPopupSelectItem";

export type MembersPopupType = "remindme" | "teszt";

interface MemberPopupParams {
  member: WebsocketInitMembers;
  onCloseModal?: VoidFunction;
}

export default function MemberPopup({
  member,
  onCloseModal,
}: MemberPopupParams) {
  const [action, setAction] = useState<MembersPopupType>("remindme");

  let renderedComponent: JSX.Element | null = null;

  const handleClick = (actionName: MembersPopupType) => {
    if (actionName === action) return;
    setAction(actionName);
  };

  return (
    <div className="flex flex-col w-[30vw]">
      <div className="flex width-full justify-center border-b pb-2">
        <Member member={member} noMaxWidth={true} isLarge={true} />
      </div>

      <div className="mt-3 flex gap-5">
        <div className="pr-3 flex flex-col gap-2 border-r border-slate-500">
          <MemberPopupItemSelect
            text="Remindme"
            isSelected={action == "remindme"}
            handleClick={() => handleClick("remindme")}
          />

          <MemberPopupItemSelect
            text="Teszt"
            isSelected={action == "teszt"}
            handleClick={() => handleClick("teszt")}
          />
        </div>

        <div>
          {action === "remindme" && (
            <Remindme memberId={member.memberId ?? null} />
          )}
        </div>
      </div>
    </div>
  );
}
