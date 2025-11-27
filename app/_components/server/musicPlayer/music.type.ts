export interface Music {
index: number;
  title: string;
  artist: string;
  lengthStr: string;
  length: number;
  filename: string;
}

export interface PlaylistState {
  selectedSong: Music;
  isPlaying: boolean;
  playedDuration: number;
}
