import { Search, Play } from 'lucide-react';
import { useState } from 'react';
import { Song, Playlist } from '../types';
import { songs as allSongs } from '../data/mockData';

interface SearchViewProps {
  playlists: Playlist[];
  onSelectPlaylist: (id: string) => void;
  onPlaySong: (song: Song, playlistSongs: Song[]) => void;
}

export function SearchView({ playlists, onSelectPlaylist, onPlaySong }: SearchViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSongs = searchQuery
    ? allSongs.filter(
        (song) =>
          song.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          song.artist_name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const filteredPlaylists = searchQuery
    ? playlists.filter((playlist) =>
        playlist.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  const categories = [
    { name: 'Pop', color: 'from-pink-500 to-pink-700', image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Rock', color: 'from-red-600 to-orange-700', image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Hip-Hop', color: 'from-green-500 to-emerald-700', image: 'https://images.pexels.com/photos/167636/pexels-photo-167636.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Electronic', color: 'from-blue-500 to-blue-700', image: 'https://images.pexels.com/photos/1699161/pexels-photo-1699161.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'R&B', color: 'from-purple-500 to-purple-700', image: 'https://images.pexels.com/photos/1708528/pexels-photo-1708528.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Jazz', color: 'from-yellow-600 to-orange-600', image: 'https://images.pexels.com/photos/1111318/pexels-photo-1111318.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Classical', color: 'from-gray-600 to-gray-800', image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=300' },
    { name: 'Country', color: 'from-amber-600 to-amber-800', image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=300' },
  ];

  return (
    <div className="flex-1 overflow-y-auto bg-[#121212]">
      <div className="px-8 pt-20 pb-24">
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-6 h-6 text-[#121212]" />
            <input
              type="text"
              placeholder="What do you want to listen to?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white text-[#121212] rounded-full py-3 pl-14 pr-4 text-sm font-medium focus:outline-none placeholder:text-[#6a6a6a]"
            />
          </div>
        </div>

        {!searchQuery ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Browse all</h2>
            <div className="grid grid-cols-5 gap-6">
              {categories.map((category) => (
                <div
                  key={category.name}
                  className={`relative h-52 rounded-lg bg-gradient-to-br ${category.color} overflow-hidden cursor-pointer hover:scale-[1.02] transition-transform`}
                >
                  <div className="p-5">
                    <h3 className="text-2xl font-bold">{category.name}</h3>
                  </div>
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute bottom-0 right-0 w-28 h-28 object-cover transform rotate-[25deg] translate-x-6 translate-y-2 shadow-2xl rounded"
                  />
                </div>
              ))}
            </div>
          </>
        ) : (
          <div className="space-y-8">
            {filteredSongs.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Songs</h2>
                <div className="space-y-2">
                  {filteredSongs.map((song) => (
                    <div
                      key={song.id}
                      onClick={() => onPlaySong(song, filteredSongs)}
                      className="flex items-center gap-4 p-2 rounded-md hover:bg-[#ffffff1a] cursor-pointer group"
                    >
                      <img
                        src={song.cover_url || 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=100'}
                        alt={song.title}
                        className="w-12 h-12 rounded-sm object-cover"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="font-semibold truncate">{song.title}</div>
                        <div className="text-sm text-[#b3b3b3] truncate">{song.artist_name}</div>
                      </div>
                      <button className="w-10 h-10 bg-[#1db954] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110">
                        <Play className="w-4 h-4 text-black fill-current ml-0.5" />
                      </button>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {filteredPlaylists.length > 0 && (
              <section>
                <h2 className="text-2xl font-bold mb-4">Playlists</h2>
                <div className="grid grid-cols-5 gap-6">
                  {filteredPlaylists.map((playlist) => (
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
                          className="absolute bottom-2 right-2 w-12 h-12 bg-[#1db954] rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all hover:scale-110 shadow-2xl translate-y-2 group-hover:translate-y-0"
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
            )}

            {filteredSongs.length === 0 && filteredPlaylists.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#b3b3b3] text-lg">No results found for "{searchQuery}"</p>
                <p className="text-[#6a6a6a] text-sm mt-2">Try searching with different keywords</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
