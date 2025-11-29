export interface Music {
  index: number;
  title: string;
  artist: string;
  lengthStr: string;
  length: number;
  filename: string;
}

export interface PlaylistState {
  serverId: string,
  selectedSong: Music;
  selectedModifiedAt: number;
  isPlaying: boolean;
  songs: Music[];
  playedDuration: number;
}


