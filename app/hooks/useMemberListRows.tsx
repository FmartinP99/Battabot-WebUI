import { useMemo } from "react";
import {
  WebsocketInitMembers,
  WebsocketInitRoles,
} from "../_websocket/types/websocket_init.types";
import { MemberRow } from "../_components/server/member/MembersList";
import {
  selectSelectedServerId,
  selectRolesByServerId,
} from "../store/selectors";
import { useAppSelector } from "./storeHooks";
import {
  isOfflineLikeStatus,
  isRoleRow,
} from "../_components/server/member/helpers/members_helper";

export function useMemberListRows(
  members: WebsocketInitMembers[]
): MemberRow[] {
  const selectedServerId = useAppSelector(selectSelectedServerId);

  const serverRoles = useAppSelector((state) =>
    selectedServerId
      ? selectRolesByServerId(state, selectedServerId)
      : undefined
  );

  return useMemo(() => {
    if (!members?.length) return [];

    const listRows: MemberRow[] = [];

    let lastSeparatorIndex: number | null = null;
    members.forEach((member, index) => {
      const prevMember = members[index - 1];

      const currentMemberIsOffline = isOfflineLikeStatus(member.status);
      const previousMemberIsOffline = isOfflineLikeStatus(prevMember?.status);

      const currentDistinctRole = currentMemberIsOffline
        ? null
        : serverRoles?.find(
            (role) =>
              role.displaySeparately && member.roleIds?.includes(role.id)
          );

      const prevDistinctRole = previousMemberIsOffline
        ? null
        : serverRoles?.find(
            (role) =>
              role.displaySeparately && prevMember?.roleIds?.includes(role.id)
          );

      const shouldInsertSeparator =
        index === 0 || currentDistinctRole !== prevDistinctRole;

      if (shouldInsertSeparator) {
        const roleToInsert =
          currentDistinctRole && !currentMemberIsOffline
            ? currentDistinctRole
            : !currentDistinctRole && !currentMemberIsOffline
            ? ({ name: "Online" } as WebsocketInitRoles)
            : ({ name: "Offline" } as WebsocketInitRoles);

        listRows.push({
          type: "role",
          role: roleToInsert,
          count: 0,
        });

        lastSeparatorIndex = listRows.length - 1;
      }

      if (lastSeparatorIndex !== null) {
        const lastSeparatorRow = listRows[lastSeparatorIndex];
        if (isRoleRow(lastSeparatorRow)) {
          lastSeparatorRow.count += 1;
        }
      }

      listRows.push({
        type: "member",
        member,
      });
    });

    return listRows;
  }, [members, serverRoles]);
}
