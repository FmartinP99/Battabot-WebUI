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
import { useAppDispatch, useAppSelector } from "./storeHooks";
import {
  isGuildText,
  isVoiceLike,
} from "../_components/server/channel/helpers/channel_helpers";
import { sendMessageThroughWebsocket } from "../store/actions";
import { WebSocketMessage } from "../_websocket/types/websocket.types";
import { WebsocketMessageType } from "../_websocket/enums/websocket_message_type.enum";
import { ChannelType } from "../_components/server/channel/enums/channel.enum";
import { BotId } from "../consts/botId";

export function useActiveServerData() {
  const servers = useAppSelector(selectServers);
  const selectedServerId = useAppSelector(selectSelectedServerId);
  const members = useAppSelector(selectMembers);
  const channels = useAppSelector(selectChannels);
  const messages = useAppSelector(selectMessages);
  const selectedChannelId = useAppSelector(selectSelectedChannelId);
  const dispatch = useAppDispatch();
  const socketReady = useSelector(selectSocketReady);
  const songs = useAppSelector((state) =>
    selectSongs(state, selectedServerId ?? "")
  );

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
      const { channelId, type } = channel;

      if (channelId === selectedChannelId) return;

      const guildText = isGuildText(type);
      const voiceText = isVoiceLike(type);

      // if guildText then we set the active channel as the channel
      if (guildText) {
        dispatch(setSelectedChannelId(channel.channelId));
        return;
      }

      // if voiceLike then we connect to that channel
      else if (voiceText) {
        //  if there are no songs, it is pointless to select that channel.
        if (songs) {
          dispatch(setSelectedChannelId(channel.channelId));
        }

        if (!BotId || (BotId && channel.connectedMemberIds.includes(BotId)))
          return;

        // request that bot wants to join

        const payload: WebSocketMessage = {
          type: WebsocketMessageType.VOICE_STATE_UPDATE,
          message: {
            serverId: selectedServerId,
            channelId: channel.channelId,
            isDisconnect: false,
          },
        };
        dispatch(sendMessageThroughWebsocket(payload));
      }
    },
    [selectedChannelId]
  );

  function handleOnVoiceDisconnect(channel: WebsocketInitChannels) {
    if (!isVoiceLike(channel.type)) return;
    const payload: WebSocketMessage = {
      type: WebsocketMessageType.VOICE_STATE_UPDATE,
      message: {
        serverId: selectedServerId,
        channelId: channel.channelId,
        isDisconnect: true,
      },
    };

    dispatch(sendMessageThroughWebsocket(payload));

    // to-do: maybe on disconect set a text channel as active channel?
  }

  useEffect(() => {
    if (!selectedServerId) return;
    if (selectedChannels.length === 0) return;

    const firstChannelId = selectedChannels.filter((ch) =>
      isGuildText(ch.type)
    )?.[0].channelId;

    if (!firstChannelId) return;

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

  const activeChannelType =
    selectedChannels.find((ch) => ch.channelId === selectedChannelId)?.type ??
    ChannelType.Text;

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
    handleOnVoiceDisconnect,
    activeChannelType,
  };
}
