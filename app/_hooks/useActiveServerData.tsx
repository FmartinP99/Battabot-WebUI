import { useState, useMemo, useCallback, useEffect } from "react";
import { WebsocketInitChannels } from "../_websocket/types/websocket_init.types";
import { useDispatch, useSelector } from "react-redux";
import {
  selectChannels,
  selectMembers,
  selectMessages,
  selectSelectedChannelId,
  selectSelectedServerId,
  selectServers,
} from "../_store/selectors";
import { setSelectedChannelId } from "../_websocket/websocketSlice";
import { useAppDispatch } from "./storeHooks";

export function useActiveServerData() {
  const servers = useSelector(selectServers);
  const selectedServerId = useSelector(selectSelectedServerId);
  const members = useSelector(selectMembers);
  const channels = useSelector(selectChannels);
  const messages = useSelector(selectMessages);
  const selectedChannelId = useSelector(selectSelectedChannelId);
  const dispatch = useAppDispatch();

  const selectedServer = useMemo(() => {
    return servers.find((server) => server.guildId === selectedServerId);
  }, [servers, selectedServerId]);

  const selectedMembers = useMemo(() => {
    const guildId = selectedServer?.guildId ?? "";
    return members[guildId] ?? [];
  }, [members, selectedServer]);

  const selectedChannels = useMemo(() => {
    const guildId = selectedServer?.guildId ?? "";
    return channels[guildId]?.filter((ch) => ch.type === "text") ?? [];
  }, [channels, selectedServer]);

  const handleSetActiveChannel = useCallback(
    (channel: WebsocketInitChannels) => {
      if (channel.channelId !== selectedChannelId) {
        dispatch(setSelectedChannelId(channel.channelId));
      }
    },
    [selectedChannelId]
  );

  useEffect(() => {
    if (selectedChannels.length === 0) return;
    const firstChannelId = selectedChannels[0].channelId;
    if (selectedServerId || selectedChannelId === "") {
      dispatch(setSelectedChannelId(firstChannelId));
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

    selectedChannelId,
    handleSetActiveChannel,
  };
}
