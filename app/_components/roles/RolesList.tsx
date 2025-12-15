import { getTextColorBasedOnBg } from "@/app/helpers/utils";
import { useServerRoles } from "@/app/hooks/useServerRoles";

interface RolesListProps {
  memberId: string;
  memberRoleIds: string[];
}

export function RolesList({ memberId, memberRoleIds }: RolesListProps) {
  const { serverRoles, handleRoleClick } = useServerRoles(memberId);

  return (
    <div className="flex flex-wrap gap-2">
      {serverRoles?.map((role) => (
        <div
          onClick={() => handleRoleClick(role.id)}
          key={role.id}
          style={{
            backgroundColor: role.color,
            color: getTextColorBasedOnBg(role.color),
          }}
          className={`
            text-xs
            rounded-lg
            p-1
            hover:cursor-pointer
            ${
              memberRoleIds.includes(role.id) ? "" : "opacity-30"
            } hover:opacity-100`}
        >
          <span>{role.name}</span>
        </div>
      ))}
    </div>
  );
}
