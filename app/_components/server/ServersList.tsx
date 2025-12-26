"use client";

import { ServerPreview } from "./ServerPreview";
import { selectServers } from "../../store/selectors";
import { useAppSelector } from "@/app/hooks/storeHooks";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export default function ServersList() {
  const servers = useAppSelector(selectServers);

  return (
    <TooltipProvider delayDuration={0}>
      <div className="h-full overflow-y-auto  overflow-x-hidden pt-2 pb-2 scrollbar-hide-nonhover">
        {servers.map((server) => (
          <ServerPreview server={server} key={server.guildId} />
        ))}
      </div>
    </TooltipProvider>
  );
}
