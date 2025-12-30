import Image from "next/image";
import ChatMemberMention from "../_components/server/chat/ChatMemberMention";
import ChatChannelMention from "../_components/server/chat/ChatChannelMention";

const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/gi;

const timestampRegex = /<t:(\d{1,}):?([tTdDfFR])?>/g;

const imageUrlRegex =
  /(https?:\/\/(?:cdn\.discordapp\.com|media\.discordapp\.net)\/[^\s]+)|(https?:\/\/[^\s]+?\.(?:png|jpe?g|gif|webp|svg))/gi;

const youtubeRegex =
  /https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/gi;

const mentionRegex = /<([@#])(\d+)>/g;

type UrlToken = {
  kind: "url";
  start: number;
  end: number;
  value: string;
};

type MentionToken = {
  kind: "mention";
  start: number;
  end: number;
  value: string;
  mentionType: string;
};

type TimestampToken = {
  kind: "timestamp";
  start: number;
  end: number;
  unix: number;
  format?: string;
};

type Token = UrlToken | MentionToken | TimestampToken;

function formatMessageToRichText(text?: string) {
  if (!text) return null;

  const tokens: Token[] = [];
  const elements: JSX.Element[] = [];
  let cursor = 0;

  const urls = Array.from(text.matchAll(new RegExp(urlRegex, "g")));
  const mentions = Array.from(text.matchAll(new RegExp(mentionRegex, "g")));
  const timestamps = Array.from(text.matchAll(timestampRegex));
  urls.forEach((match, i) => {
    const start = match.index!;
    tokens.push({
      kind: "url",
      start,
      end: start + match[0].length,
      value: match[0],
    });
  });

  mentions.forEach((match, i) => {
    const start = match.index!;
    tokens.push({
      kind: "mention",
      start,
      end: start + match[0].length,
      value: match[0],
      mentionType: match[1],
    });
  });

  timestamps.forEach((match, i) => {
    const start = match.index!;
    tokens.push({
      kind: "timestamp",
      start,
      end: start + match[0].length,
      unix: Number(match[1]),
      format: match[2],
    });
  });

  // longer token wins
  tokens.sort((a, b) => {
    if (a.start !== b.start) return a.start - b.start;
    return b.end - a.end;
  });

  tokens.forEach((token, i) => {
    if (token.start > cursor) {
      elements.push(
        <span key={`text-${cursor}`}>{text.slice(cursor, token.start)}</span>
      );
    }

    switch (token.kind) {
      case "url": {
        const isImage = imageUrlRegex.test(token.value);
        const filename = isImage
          ? decodeURIComponent(
              token.value.split("?")[0].split("/").pop() ?? "image"
            )
          : token.value;

        elements.push(
          <a
            key={`url-${i}`}
            href={token.value}
            target="_blank"
            rel="noopener noreferrer"
            className={
              isImage
                ? "text-blue-500 hover:bg-blue-800 hover:text-white p-1 rounded"
                : "text-blue-500 hover:underline p-1"
            }
          >
            {filename}
          </a>
        );
        break;
      }
      case "mention":
        elements.push(
          token.mentionType === "@" ? (
            <ChatMemberMention key={`mention-${i}`} mention={token.value} />
          ) : (
            <ChatChannelMention key={`mention-${i}`} mention={token.value} />
          )
        );
        break;

      case "timestamp":
        elements.push(
          <span
            key={`timestamp-${i}`}
            className="bg-gray-700 p-1 rounded"
            title={new Date(token.unix * 1000).toISOString()}
          >
            {formatDiscordTimestamp(token.unix, token.format)}
          </span>
        );
        break;
    }
    cursor = token.end;
  });

  if (cursor < text.length) {
    elements.push(<span key="text-end">{text.slice(cursor)}</span>);
  }

  return <>{elements}</>;
}

function formatDiscordTimestamp(unix: number, format?: string) {
  const date = new Date(unix * 1000);

  switch (format) {
    case "t":
      return date.toLocaleTimeString();
    case "T":
      return date.toLocaleTimeString(undefined, {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
      });
    case "d":
      return date.toLocaleDateString();
    case "D":
      return date.toLocaleDateString(undefined, { dateStyle: "long" });
    case "f":
    case undefined:
      return `${date.toLocaleDateString(undefined, {
        dateStyle: "long",
      })} ${date.toLocaleTimeString()}`;
    case "F":
      return date.toLocaleString(undefined, {
        dateStyle: "full",
        timeStyle: "short",
        hourCycle: "h24",
      });
    case "R": {
      const diff = date.getTime() - Date.now();
      const rtf = new Intl.RelativeTimeFormat(undefined, { numeric: "auto" });

      const seconds = Math.round(diff / 1000);
      const minutes = Math.round(seconds / 60);
      const hours = Math.round(minutes / 60);
      const days = Math.round(hours / 24);

      if (Math.abs(days) >= 1) return rtf.format(days, "day");
      if (Math.abs(hours) >= 1) return rtf.format(hours, "hour");
      if (Math.abs(minutes) >= 1) return rtf.format(minutes, "minute");
      return rtf.format(seconds, "second");
    }
    default:
      return date.toString();
  }
}

function getMediaPreviewsFromMessage(text?: string) {
  if (!text) return [];

  const elements: JSX.Element[] = [];

  imageUrlRegex.lastIndex = 0;
  const imageMatches = text.matchAll(imageUrlRegex);

  imageMatches.forEach((match) => {
    const url = match[0];

    elements.push(
      <a
        key={`img-${url}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full mt-1"
      >
        <div className="relative  max-h-[350px] aspect-video ">
          <Image
            src={url}
            alt="image preview"
            fill
            sizes="(max-width: 768px)  600px"
            className="rounded-lg object-contain object-left"
          />
        </div>
      </a>
    );
  });

  youtubeRegex.lastIndex = 0;
  const youtubeMatches = text.matchAll(youtubeRegex);
  youtubeMatches.forEach((match) => {
    const videoId = match[1];

    elements.push(
      <div
        key={`yt-${videoId}`}
        className="relative max-w-[600px] aspect-video mt-2 rounded-lg overflow-hidden"
      >
        <iframe
          src={`https://www.youtube.com/embed/${videoId}`}
          title="YouTube video preview"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
        />
      </div>
    );
  });

  return elements;
}

export { formatMessageToRichText, getMediaPreviewsFromMessage };
