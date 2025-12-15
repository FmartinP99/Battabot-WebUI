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
}

export default function MemberPopup({ member }: MemberPopupProps) {
  const [action, setAction] = useState<MembersPopupType>("remindme");

  const handleClick = (actionName: MembersPopupType) => {
    if (actionName === action) return;
    setAction(actionName);
  };

  let renderedComponent: ReactNode = null;
  switch (action) {
    case "remindme":
      renderedComponent = <Remindme memberId={member.memberId ?? null} />;
      break;
    case "roles":
      renderedComponent = (
        <RolesList memberId={member.memberId} memberRoleIds={member.roleIds} />
      );
      break;
  }

  return (
    <div className="flex flex-col w-[30vw] bg-primary-x1 rounded-lg shadow-2xl overflow-hidden">
      <div className="flex w-full justify-center border-b border-primary-x3 pb-4 pt-5 px-6 bg-gradient-to-b from-primary-x4 to-primary-x1">
        <Member
          member={member}
          noMaxWidth={true}
          memberSize={MemberSize.LARGE}
        />
      </div>

      <div className="mt-4 flex gap-6 p-6">
        <div className="pr-4 flex flex-col gap-2 border-r border-primary-x3 min-w-[120px]">
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

        <div className="flex-1 min-w-0">{renderedComponent}</div>
      </div>
    </div>
  );
}
