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
} from "../store/selectors";
import { setSelectedChannelId } from "../_websocket/websocketSlice";
import { useAppDispatch } from "./storeHooks";
import { ChannelType } from "../_components/server/channel/enums/channel.enum";
import {
  isGuildText,
  isVoiceLike,
} from "../_components/server/channel/helpers/channel_helpers";

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
    const guildId = selectedServer?.guildId ?? null;
    return guildId ? members[guildId] : [];
  }, [members, selectedServer]);

  const selectedChannels = useMemo(() => {
    const guildId = selectedServer?.guildId ?? null;
    return guildId ? channels[guildId] : [];
  }, [channels, selectedServer]);

  const handleOnChannelClick = useCallback(
    (channel: WebsocketInitChannels) => {
      if (channel.channelId === selectedChannelId) return;

      // if guildText then we set the active channel as the channel
      if (isGuildText(channel.type)) {
        dispatch(setSelectedChannelId(channel.channelId));
      }

      // if voiceLike then we connect to that channel
      else if (isVoiceLike(channel.type)) {
        // to-do: connection
      }
    },
    [selectedChannelId]
  );

  useEffect(() => {
    if (selectedChannels.length === 0) return;
    const firstChannelId = selectedChannels[0].channelId;
    if (!selectedServerId && selectedChannelId) return;
    dispatch(setSelectedChannelId(firstChannelId));
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
    handleOnChannelClick,
  };
}
