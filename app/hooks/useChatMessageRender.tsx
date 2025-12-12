"use client";

import Image from "next/image";

export default function useChatMessageRender() {
  const imageUrlRegex =
    /(https?:\/\/(?:cdn\.discordapp\.com|media\.discordapp\.net)\/[^\s]+)|(https?:\/\/[^\s]+?\.(?:png|jpe?g|gif|webp|svg))/gi;

  function getImagesFromMessage(text: string) {
    if (!text) return [];

    const matches = text.match(imageUrlRegex);
    if (!matches) return [];

    return matches.map((url, index) => (
      <a
        key={index}
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <img
          src={url}
          className="block max-h-[350px] rounded-lg object-contain mt-1 "
        />
      </a>
    ));
  }

  function renderMessageWithImageNames(text: string) {
    if (!text) return null;

    const parts: JSX.Element[] = [];
    let lastIndex = 0;

    const matches = Array.from(text.matchAll(imageUrlRegex));

    matches.forEach((match) => {
      const url = match[0];
      const index = match.index || 0;

      if (index > lastIndex) {
        parts.push(<span key={lastIndex}>{text.slice(lastIndex, index)}</span>);
      }

      const filename = url.split("?")[0].split("/").pop() || "image";

      parts.push(
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 cursor-pointer hover:bg-blue-800 hover:text-white px-1"
        >
          {filename}
        </a>
      );

      lastIndex = index + url.length;
    });

    if (lastIndex < text.length) {
      parts.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
    }

    return <>{parts}</>;
  }

  return { getImagesFromMessage, renderMessageWithImageNames };
}
