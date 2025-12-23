import { useState, useMemo, useCallback, useEffect } from "react";
import {
  ChannelType,
  WebsocketGetMusicPlaylistQuery,
  WebsocketGetRemindersQuery,
  WebsocketInitChannels,
  WebsocketMessageType,
  WebsocketVoiceStateUpdateQuery,
} from "../_websocket/types/websocket_init.types";
import { useSelector } from "react-redux";
import {
  selectChannels,
  selectMembers,
  selectMessages,
  selectSelectedChannelId,
  selectSelectedServerId,
  selectServers,
  selectSocketReady,
  selectSongsForSelectedServer,
} from "../store/selectors";
import { setSelectedChannelId } from "../_websocket/websocketSlice";
import { useAppDispatch, useAppSelector } from "./storeHooks";
import {
  isGuildText,
  isVoiceLike,
} from "../_components/server/channel/helpers/channel_helpers";
import { sendMessageThroughWebsocket } from "../store/actions";
import { WebSocketMessage } from "../_websocket/types/websocket.types";
import { BotId } from "../consts/botId";
import { MemberStatus } from "../_components/server/member/enums/memberStatus.enum";

export function useActiveServerData() {
  const servers = useAppSelector(selectServers);
  const selectedServerId = useAppSelector(selectSelectedServerId);
  const members = useAppSelector(selectMembers);
  const channels = useAppSelector(selectChannels);
  const messages = useAppSelector(selectMessages);
  const selectedChannelId = useAppSelector((state) =>
    selectedServerId ? selectSelectedChannelId(state, selectedServerId) : null
  );
  const dispatch = useAppDispatch();
  const socketReady = useSelector(selectSocketReady);
  const songs = useAppSelector(selectSongsForSelectedServer);

  const selectedServer = useMemo(() => {
    return servers.find((server) => server.guildId === selectedServerId);
  }, [servers, selectedServerId]);

  const selectedMembers = useMemo(() => {
    const guildId = selectedServer?.guildId ?? null;
    const unOrderedmembers = guildId ? members[guildId] : [];

    const sortedMembers = [
      ...unOrderedmembers.filter(
        (m) =>
          m.status !== MemberStatus.OFFLINE &&
          m.status !== MemberStatus.INVISIBLE
      ),
      ...unOrderedmembers.filter(
        (m) =>
          m.status === MemberStatus.OFFLINE ||
          m.status === MemberStatus.INVISIBLE
      ),
    ];
    return sortedMembers;
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
          } as WebsocketVoiceStateUpdateQuery,
        };
        dispatch(sendMessageThroughWebsocket(payload));
      }
    },
    [selectedChannelId, songs]
  );

  function handleOnVoiceDisconnect(channel: WebsocketInitChannels) {
    if (!isVoiceLike(channel.type)) return;
    const payload: WebSocketMessage = {
      type: WebsocketMessageType.VOICE_STATE_UPDATE,
      message: {
        serverId: selectedServerId,
        channelId: channel.channelId,
        isDisconnect: true,
      } as WebsocketVoiceStateUpdateQuery,
    };

    dispatch(sendMessageThroughWebsocket(payload));

    // to-do: maybe on disconect set a text channel as active channel?
  }

  // to-do: just test delete later
  useEffect(() => {
    const payload: WebSocketMessage = {
      type: WebsocketMessageType.GET_REMINDERS,
      message: {
        serverId: selectedServerId,
        memberId: "215108241481269248",
      } as WebsocketGetRemindersQuery,
    };
    dispatch(sendMessageThroughWebsocket(payload));
  }, [selectedServerId]);

  useEffect(() => {
    if (!socketReady) return;
    if (!selectedServerId) return;

    const payload: WebSocketMessage = {
      type: WebsocketMessageType.GET_MUSIC_PLAYLIST,
      message: {
        serverId: selectedServerId,
      } as WebsocketGetMusicPlaylistQuery,
    };

    dispatch(sendMessageThroughWebsocket(payload));
  }, [socketReady, selectedServerId]);

  const activeChannelType =
    selectedChannels.find((ch) => ch.channelId === selectedChannelId)?.type ??
    ChannelType.Text;

  const isBotConnected: boolean = !!selectedChannels.find((ch) =>
    ch.connectedMemberIds.includes(BotId!)
  );

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
    isBotConnected,
  };
}
