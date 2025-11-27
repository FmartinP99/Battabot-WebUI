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
  selectSocketReady,
  selectSongs,
} from "../store/selectors";
import { setSelectedChannelId } from "../_websocket/websocketSlice";
import { useAppDispatch } from "./storeHooks";
import {
  isGuildText,
  isVoiceLike,
} from "../_components/server/channel/helpers/channel_helpers";
import { sendMessageThroughWebsocket } from "../store/actions";
import { WebSocketMessage } from "../_websocket/types/websocket.types";
import { WebsocketMessageType } from "../_websocket/enums/websocket_message_type.enum";

export function useActiveServerData() {
  const servers = useSelector(selectServers);
  const selectedServerId = useSelector(selectSelectedServerId);
  const members = useSelector(selectMembers);
  const channels = useSelector(selectChannels);
  const messages = useSelector(selectMessages);
  const selectedChannelId = useSelector(selectSelectedChannelId);
  const dispatch = useAppDispatch();
  const socketReady = useSelector(selectSocketReady);
  const songs = useSelector(selectSongs);

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
    (channel: WebsocketInitChannels, voiceDisconnect: boolean = false) => {
      if (channel.channelId === selectedChannelId) return;

      // if guildText then we set the active channel as the channel
      if (isGuildText(channel.type)) {
        dispatch(setSelectedChannelId(channel.channelId));
      }

      // if voiceLike then we connect/disconnect to/from that channel
      else if (isVoiceLike(channel.type)) {
        const payload: WebSocketMessage = {
          type: WebsocketMessageType.VOICE_STATE_UPDATE,
          message: {
            serverId: selectedServerId,
            channelId: channel.channelId,
            isDisconnect: voiceDisconnect,
          },
        };

        //  if there are no songs, it is pointless to select to that channel.
        if (songs) {
          dispatch(setSelectedChannelId(channel.channelId));
        }

        dispatch(sendMessageThroughWebsocket(payload));
      }
    },
    [selectedChannelId]
  );

  useEffect(() => {
    if (!selectedServerId) return;
    if (selectedChannels.length === 0) return;

    const firstChannelId = selectedChannels.filter((ch) =>
      isGuildText(ch.type)
    )?.[0].channelId;
    dispatch(setSelectedChannelId(firstChannelId));
  }, [selectedServerId]);

  // teszt to-do: delete
  useEffect(() => {
    if (!socketReady) return;
    if (!selectedServerId) return;
    if (songs) return;

    const payload: WebSocketMessage = {
      type: WebsocketMessageType.GET_MUSIC_PLAYLIST,
      message: {
        serverId: selectedServerId,
      },
    };

    dispatch(sendMessageThroughWebsocket(payload));
  }, [socketReady, selectedServerId, songs]);

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
