import { WebsocketInitMembers } from "../../../_websocket/types/websocket_init.types";
import Member from "./Member";
import { ReactNode, useState } from "react";
import Remindme from "../../remindme/Remindme";
import MemberPopupItemSelect from "./MemberPopupSelectItem";
import { MemberSize } from "./enums/memberSize.enum";
import { RolesList } from "../../roles/RolesList";

export type MembersPopupType = "remindme" | "roles" | "teszt";

interface MemberPopupProps {
  member: WebsocketInitMembers;
  onCloseModal?: VoidFunction;
}

/** onCloseModal will be overWritten by Modal.Window */
export default function MemberPopup({
  member,
  onCloseModal,
}: MemberPopupProps) {
  const [action, setAction] = useState<MembersPopupType>("remindme");

  const handleClick = (actionName: MembersPopupType) => {
    if (actionName === action) return;
    setAction(actionName);
  };

  let renderedComponent: ReactNode = null;
  switch (action) {
    case "remindme":
      renderedComponent = (
        <Remindme
          onCloseModal={onCloseModal}
          memberId={member.memberId ?? null}
        />
      );
      break;
    case "roles":
      renderedComponent = (
        <RolesList memberId={member.memberId} memberRoleIds={member.roleIds} />
      );
      break;
  }

  return (
    <div className="flex h-[60vh] flex-col w-[35vw]  bg-primary-x1 rounded-lg shadow-2xl overflow-y-hidden">
      <div className="flex min-h-0 w-full justify-center border-b border-primary-x3 pb-4 pt-5 px-6 bg-gradient-to-b from-primary-x4 to-primary-x1">
        <Member
          member={member}
          noMaxWidth={true}
          memberSize={MemberSize.LARGE}
        />
      </div>

      <div className="min-h-0 mt-4 flex gap-6 p-6 h-full ">
        <div className="pr-4 flex flex-col min-h-0  gap-2 border-r border-primary-x3 w-[120px] text-ellipsis overflow-y-auto">
          <MemberPopupItemSelect
            text="Remindme"
            isSelected={action == "remindme"}
            handleClick={() => handleClick("remindme")}
          />
          <MemberPopupItemSelect
            text="Roles"
            isSelected={action == "roles"}
            handleClick={() => handleClick("roles")}
          />
        </div>

        <div className="flex-1 min-w-0 overflow-y-auto overflow-x-hidden px-1">
          {renderedComponent}
        </div>
      </div>
    </div>
  );
}
