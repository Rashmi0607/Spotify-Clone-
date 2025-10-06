import { Play, Music } from 'lucide-react';
import { Playlist, Song } from '../types';

interface LibraryViewProps {
  playlists: Playlist[];
  onSelectPlaylist: (id: string) => void;
  onPlaySong: (song: Song, playlistSongs: Song[]) => void;
}

export function LibraryView({ playlists, onSelectPlaylist, onPlaySong }: LibraryViewProps) {
  return (
    <div className="flex-1 overflow-y-auto bg-[#121212]">
      <div className="px-8 pt-20 pb-24">
        <h1 className="text-3xl font-bold mb-6">Your Library</h1>

        <div className="flex gap-3 mb-8">
          <button className="px-4 py-2 bg-[#232323] rounded-full text-sm font-medium hover:bg-[#2a2a2a] transition-colors">
            Playlists
          </button>
          <button className="px-4 py-2 bg-[#232323] rounded-full text-sm font-medium hover:bg-[#2a2a2a] transition-colors">
            Artists
          </button>
          <button className="px-4 py-2 bg-[#232323] rounded-full text-sm font-medium hover:bg-[#2a2a2a] transition-colors">
            Albums
          </button>
        </div>

        <div className="space-y-2">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => onSelectPlaylist(playlist.id)}
              className="flex items-center gap-4 p-2 rounded-md hover:bg-[#ffffff1a] cursor-pointer group transition-colors"
            >
              <div className="relative">
                {playlist.cover_url ? (
                  <img
                    src={playlist.cover_url}
                    alt={playlist.name}
                    className="w-16 h-16 rounded-md object-cover shadow-lg"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-md bg-[#282828] flex items-center justify-center">
                    <Music className="w-6 h-6 text-[#b3b3b3]" />
                  </div>
                )}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    if (playlist.songs.length > 0) {
                      onPlaySong(playlist.songs[0], playlist.songs);
                    }
                  }}
                  className="absolute inset-0 bg-[#00000099] rounded-md flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Play className="w-6 h-6 text-white fill-current ml-0.5" />
                </button>
              </div>

              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{playlist.name}</div>
                <div className="text-sm text-[#b3b3b3]">
                  <span>Playlist</span>
                  <span className="mx-1">•</span>
                  <span>{playlist.songs.length} songs</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {playlists.length === 0 && (
          <div className="text-center py-20">
            <div className="w-20 h-20 bg-[#282828] rounded-full flex items-center justify-center mx-auto mb-6">
              <Music className="w-10 h-10 text-[#b3b3b3]" />
            </div>
            <h2 className="text-2xl font-bold mb-2">Your library is empty</h2>
            <p className="text-[#b3b3b3] mb-6">Start by creating a playlist</p>
            <button className="px-8 py-3 bg-white text-black rounded-full font-semibold hover:scale-105 transition-transform">
              Create playlist
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
