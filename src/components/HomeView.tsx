import { Play } from 'lucide-react';
import { Playlist, Song } from '../types';

interface HomeViewProps {
  playlists: Playlist[];
  onSelectPlaylist: (id: string) => void;
  onPlaySong: (song: Song, playlistSongs: Song[]) => void;
}

export function HomeView({ playlists, onSelectPlaylist, onPlaySong }: HomeViewProps) {
  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Good morning';
    if (hour < 18) return 'Good afternoon';
    return 'Good evening';
  };

  return (
    <div className="flex-1 overflow-y-auto bg-gradient-to-b from-[#1f1f1f] to-[#121212]">
      <div className="px-8 pt-20 pb-24">
        <h1 className="text-3xl font-bold mb-6">{getGreeting()}</h1>

        <div className="grid grid-cols-3 gap-4 mb-12">
          {playlists.slice(0, 6).map((playlist) => (
            <div
              key={playlist.id}
              onClick={() => onSelectPlaylist(playlist.id)}
              className="bg-[#ffffff1a] rounded flex items-center gap-4 overflow-hidden group cursor-pointer hover:bg-[#ffffff2a] transition-all"
            >
              <img
                src={playlist.cover_url || 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=100'}
                alt={playlist.name}
                className="w-20 h-20 object-cover"
              />
              <div className="flex-1 font-semibold pr-4 truncate text-base">{playlist.name}</div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  if (playlist.songs.length > 0) {
                    onPlaySong(playlist.songs[0], playlist.songs);
                  }
                }}
                className="w-12 h-12 bg-[#1db954] rounded-full flex items-center justify-center mr-4 opacity-0 group-hover:opacity-100 transition-all hover:scale-105 shadow-2xl"
              >
                <Play className="w-5 h-5 text-black fill-current ml-0.5" />
              </button>
            </div>
          ))}
        </div>

        <section className="mb-10">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold hover:underline cursor-pointer">Made for you</h2>
            <button className="text-xs font-bold text-[#b3b3b3] hover:underline">SEE ALL</button>
          </div>
          <div className="grid grid-cols-6 gap-5">
            {playlists.slice(0, 5).map((playlist) => (
              <div
                key={playlist.id}
                onClick={() => onSelectPlaylist(playlist.id)}
                className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-all group cursor-pointer"
              >
                <div className="relative mb-4">
                  <img
                    src={playlist.cover_url || 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300'}
                    alt={playlist.name}
                    className="w-full aspect-square object-cover rounded-md shadow-xl mb-4"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (playlist.songs.length > 0) {
                        onPlaySong(playlist.songs[0], playlist.songs);
                      }
                    }}
                    className="absolute bottom-2 right-2 w-12 h-12 bg-[#1db954] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-105 shadow-2xl translate-y-2 group-hover:translate-y-0"
                  >
                    <Play className="w-5 h-5 text-black fill-current ml-0.5" />
                  </button>
                </div>
                <h3 className="font-bold mb-1 truncate text-base">{playlist.name}</h3>
                <p className="text-sm text-[#b3b3b3] line-clamp-2">{playlist.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-2xl font-bold hover:underline cursor-pointer">Recently played</h2>
            <button className="text-xs font-bold text-[#b3b3b3] hover:underline">SEE ALL</button>
          </div>
          <div className="grid grid-cols-6 gap-5">
            {playlists.slice(1, 6).map((playlist) => (
              <div
                key={playlist.id}
                onClick={() => onSelectPlaylist(playlist.id)}
                className="bg-[#181818] p-4 rounded-md hover:bg-[#282828] transition-all group cursor-pointer"
              >
                <div className="relative mb-4">
                  <img
                    src={playlist.cover_url || 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300'}
                    alt={playlist.name}
                    className="w-full aspect-square object-cover rounded-md shadow-xl mb-4"
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (playlist.songs.length > 0) {
                        onPlaySong(playlist.songs[0], playlist.songs);
                      }
                    }}
                    className="absolute bottom-2 right-2 w-12 h-12 bg-[#1db954] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-105 shadow-2xl translate-y-2 group-hover:translate-y-0"
                  >
                    <Play className="w-5 h-5 text-black fill-current ml-0.5" />
                  </button>
                </div>
                <h3 className="font-bold mb-1 truncate text-base">{playlist.name}</h3>
                <p className="text-sm text-[#b3b3b3] line-clamp-2">{playlist.description}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
