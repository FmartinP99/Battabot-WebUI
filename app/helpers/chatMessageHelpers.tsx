import Image from "next/image";

const urlRegex = /https?:\/\/[^\s/$.?#].[^\s]*/gi;

const imageUrlRegex =
  /(https?:\/\/(?:cdn\.discordapp\.com|media\.discordapp\.net)\/[^\s]+)|(https?:\/\/[^\s]+?\.(?:png|jpe?g|gif|webp|svg))/gi;

const youtubeRegex =
  /https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([A-Za-z0-9_-]{11})/gi;

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
        <div className="relative  max-h-[350px] aspect-video">
          <Image
            src={url}
            alt="image preview"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className="rounded-lg object-cover"
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

function renderMessageWithImageNames(text?: string) {
  if (!text) return null;

  const elements: JSX.Element[] = [];
  let cursor = 0;

  const urls = Array.from(text.matchAll(new RegExp(urlRegex, "g")));

  urls.forEach((match, i) => {
    const url = match[0];
    const start = match.index ?? 0;
    const end = start + url.length;

    if (start > cursor) {
      elements.push(
        <span key={`text-${i}-${cursor}`}>{text.slice(cursor, start)}</span>
      );
    }

    const isImage = imageUrlRegex.test(url);
    const filename = isImage
      ? decodeURIComponent(url.split("?")[0].split("/").pop() ?? "image")
      : url;

    elements.push(
      <a
        key={`url-${i}-${start}`}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className={
          isImage
            ? "text-blue-500 hover:bg-blue-800 hover:text-white px-1 rounded"
            : "text-blue-500 hover:underline px-1"
        }
        title={url}
      >
        {filename}
      </a>
    );

    cursor = end;
  });

  if (cursor < text.length) {
    elements.push(<span key={`text-end-${cursor}`}>{text.slice(cursor)}</span>);
  }

  return <>{elements}</>;
}

export { renderMessageWithImageNames, getMediaPreviewsFromMessage };
