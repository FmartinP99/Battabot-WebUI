"use client";

import { useSelector } from "react-redux";
import { ServerPreview } from "./ServerPreview";
import { selectServers } from "../../store/selectors";

export default function ServersList() {
  const servers = useSelector(selectServers);

  return (
    <div className="h-full overflow-y-auto  overflow-x-hidden pt-2 pb-2 scrollbar-hide">
      {servers.map((server) => (
        <ServerPreview server={server} key={server.guildId} />
      ))}
    </div>
  );
}
