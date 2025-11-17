import { useState, useMemo, useCallback, useEffect } from "react";
import { WebsocketInitChannels } from "../_websocket/types/websocket_init.types";
import { useSelector } from "react-redux";
import {
  selectChannels,
  selectMembers,
  selectMessages,
  selectSelectedServerId,
  selectServers,
} from "../_store/selectors";

export function useActiveServerData() {
  const servers = useSelector(selectServers);
  const selectedServerId = useSelector(selectSelectedServerId);
  const members = useSelector(selectMembers);
  const channels = useSelector(selectChannels);
  const messages = useSelector(selectMessages);

  const [activeChannelId, setActiveChannelId] = useState("0");

  const selectedServer = useMemo(() => {
    return servers.find((server) => server.guildId === selectedServerId);
  }, [servers, selectedServerId]);

  const selectedMembers = useMemo(() => {
    const guildId = selectedServer?.guildId ?? "0";
    return members[guildId] ?? [];
  }, [members, selectedServer]);

  const selectedChannels = useMemo(() => {
    const guildId = selectedServer?.guildId ?? "0";
    return channels[guildId]?.filter((ch) => ch.type === "text") ?? [];
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
