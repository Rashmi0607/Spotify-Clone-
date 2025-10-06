import { Play, Clock, MoreHorizontal } from 'lucide-react';
import { Playlist, Song } from '../types';

interface PlaylistViewProps {
  playlist: Playlist | null;
  onPlaySong: (song: Song, playlistSongs: Song[]) => void;
  isPlaying: boolean;
  currentSong: Song | null;
}

export function PlaylistView({ playlist, onPlaySong, isPlaying, currentSong }: PlaylistViewProps) {
  if (!playlist) {
    return (
      <div className="flex items-center justify-center h-full text-[#b3b3b3]">
        <p>Select a playlist to view</p>
      </div>
    );
  }

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="bg-gradient-to-b from-[#5038a0] to-[#2a2139] pt-20 pb-6 px-8">
        <div className="flex items-end gap-6">
          <img
            src={playlist.cover_url || 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300'}
            alt={playlist.name}
            className="w-56 h-56 rounded-md shadow-2xl object-cover"
          />
          <div className="flex-1 pb-4">
            <div className="text-xs font-bold mb-2">PLAYLIST</div>
            <h1 className="text-8xl font-black mb-6 leading-none">{playlist.name}</h1>
            <p className="text-[#b3b3b3] mb-4 text-sm">{playlist.description}</p>
            <div className="text-sm">
              <span className="font-semibold">Spotify</span>
              <span className="mx-1">•</span>
              <span>{playlist.songs.length} songs</span>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gradient-to-b from-[#12121280] to-[#121212] px-8 pt-6 pb-24">
        <div className="flex items-center gap-8 mb-8">
          <button
            onClick={() => playlist.songs.length > 0 && onPlaySong(playlist.songs[0], playlist.songs)}
            className="w-14 h-14 bg-[#1db954] rounded-full flex items-center justify-center hover:scale-110 hover:bg-[#1ed760] transition-all shadow-2xl"
          >
            <Play className="w-6 h-6 text-black fill-current ml-1" />
          </button>
        </div>

        <div className="mb-4">
          <div className="grid grid-cols-[16px_6fr_4fr_3fr_60px] gap-4 px-4 pb-2 border-b border-[#ffffff1a] text-xs text-[#b3b3b3] font-medium">
            <div>#</div>
            <div>TITLE</div>
            <div>ALBUM</div>
            <div>DATE ADDED</div>
            <div className="text-center">
              <Clock className="w-4 h-4 mx-auto" />
            </div>
          </div>
        </div>

        <div className="space-y-1">
          {playlist.songs.map((song, index) => (
            <div
              key={song.id}
              onClick={() => onPlaySong(song, playlist.songs)}
              className={`grid grid-cols-[16px_6fr_4fr_3fr_60px] gap-4 px-4 py-2 rounded-md group hover:bg-[#ffffff1a] cursor-pointer transition-colors ${
                currentSong?.id === song.id ? 'bg-[#ffffff1a]' : ''
              }`}
            >
              <div className="flex items-center justify-center text-[#b3b3b3] group-hover:hidden">
                {currentSong?.id === song.id && isPlaying ? (
                  <div className="flex gap-0.5 items-end h-4">
                    <div className="w-0.5 bg-[#1db954] animate-pulse" style={{ height: '60%' }} />
                    <div className="w-0.5 bg-[#1db954] animate-pulse" style={{ height: '100%', animationDelay: '0.2s' }} />
                    <div className="w-0.5 bg-[#1db954] animate-pulse" style={{ height: '80%', animationDelay: '0.4s' }} />
                  </div>
                ) : (
                  <span className="text-sm">{index + 1}</span>
                )}
              </div>
              <div className="hidden group-hover:flex items-center justify-center">
                <Play className="w-4 h-4 fill-current" />
              </div>

              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={song.cover_url || 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=100'}
                  alt={song.title}
                  className="w-10 h-10 rounded-sm object-cover"
                />
                <div className="min-w-0">
                  <div className={`truncate text-sm ${currentSong?.id === song.id ? 'text-[#1db954]' : 'text-white'}`}>
                    {song.title}
                  </div>
                  <div className="text-sm text-[#b3b3b3] truncate hover:text-white hover:underline cursor-pointer">{song.artist_name}</div>
                </div>
              </div>

              <div className="flex items-center text-sm text-[#b3b3b3]">
                <span className="truncate hover:text-white hover:underline cursor-pointer">{song.title}</span>
              </div>

              <div className="flex items-center text-sm text-[#b3b3b3]">
                <span>2 days ago</span>
              </div>

              <div className="flex items-center justify-center gap-4">
                <span className="text-sm text-[#b3b3b3]">{formatDuration(song.duration)}</span>
                <button className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreHorizontal className="w-4 h-4 text-[#b3b3b3] hover:text-white" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
