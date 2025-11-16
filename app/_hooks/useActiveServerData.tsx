import { useState, useMemo, useCallback, useEffect } from "react";
import { WebsocketInitChannels } from "../_websocket/types/websocket_init.types";
import { useWebSocket } from "../_websocket/websocket";

export function useActiveServerData() {
  const { servers, selectedServerId, members, channels, messages } =
    useWebSocket();

  const [activeChannelId, setActiveChannelId] = useState("0");

  const selectedServer = useMemo(() => {
    return servers.find((server) => server.guildId === selectedServerId);
  }, [servers, selectedServerId]);

  const selectedMembers = useMemo(() => {
    const guildId = selectedServer?.guildId ?? "0";
    return members.get(guildId) ?? [];
  }, [members, selectedServer]);

  const selectedChannels = useMemo(() => {
    const guildId = selectedServer?.guildId ?? "0";
    return channels.get(guildId)?.filter((ch) => ch.type === "text") ?? [];
  }, [channels, selectedServer]);

  const handleSetActiveChannel = useCallback(
    (channel: WebsocketInitChannels) => {
      if (channel.channelId !== activeChannelId) {
        setActiveChannelId(channel.channelId);
      }
    },
    [activeChannelId]
  );

  useEffect(() => {
    if (selectedChannels.length === 0) return;
    const firstChannelId = selectedChannels[0].channelId;
    if (selectedServerId || activeChannelId === "0") {
      setActiveChannelId(firstChannelId);
    }
  }, [selectedServerId, selectedChannels]);

  return {
    servers,
    selectedServerId,
    members,
    channels,
    messages,

    selectedServer,
    selectedMembers,
    selectedChannels,

    activeChannelId,
    setActiveChannelId,
    handleSetActiveChannel,
  };
}
