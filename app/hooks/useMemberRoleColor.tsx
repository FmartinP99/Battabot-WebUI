import {
  selectSelectedServerId,
  selectRolesByServerId,
} from "../store/selectors";
import { useAppSelector } from "./storeHooks";

export function useMemberRoleColor(memberRoleIds: string[]) {
  if (!memberRoleIds?.length) {
    return { role: undefined, color: "" };
  }

  const selectedServerId = useAppSelector(selectSelectedServerId);
  const serverRoles = useAppSelector((state) =>
    selectedServerId
      ? selectRolesByServerId(state, selectedServerId)
      : undefined
  );

  const selectedRole = serverRoles?.find(
    (role) => role.id === memberRoleIds[0]
  );

  const color =
    !selectedRole || selectedRole.color === "#000000" ? "" : selectedRole.color;

  return {
    role: selectedRole,
    color,
  };
}
