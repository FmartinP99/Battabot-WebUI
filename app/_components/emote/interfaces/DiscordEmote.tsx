export enum EmoteExtension {
  GIF = "gif",
  PNG = "png",
}

export enum EmoteSize {
  JUMBO = "3rem",
  SMALL = "1.25rem",
  TOOLTIP = "1.8rem",
}

export interface DiscordEmote {
  id: string;
  name: string;
  rawStr: string;
  ext: EmoteExtension;
}
