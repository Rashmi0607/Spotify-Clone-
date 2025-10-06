import { useState } from 'react';
import { Sidebar } from './components/Sidebar';
import { Player } from './components/Player';
import { PlaylistView } from './components/PlaylistView';
import { HomeView } from './components/HomeView';
import { SearchView } from './components/SearchView';
import { LibraryView } from './components/LibraryView';
import { TopBar } from './components/TopBar';
import { playlists as mockPlaylists } from './data/mockData';
import { Song } from './types';

function App() {
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(null);
  const [currentView, setCurrentView] = useState<'home' | 'search' | 'library'>('home');
  const [currentSong, setCurrentSong] = useState<Song | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [queue, setQueue] = useState<Song[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const selectedPlaylist = selectedPlaylistId === 'liked'
    ? mockPlaylists[mockPlaylists.length - 1]
    : mockPlaylists.find((p) => p.id === selectedPlaylistId) || null;

  const handlePlaySong = (song: Song, playlistSongs: Song[]) => {
    setCurrentSong(song);
    setQueue(playlistSongs);
    setCurrentIndex(playlistSongs.findIndex((s) => s.id === song.id));
    setIsPlaying(true);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    if (queue.length > 0) {
      const nextIndex = (currentIndex + 1) % queue.length;
      setCurrentIndex(nextIndex);
      setCurrentSong(queue[nextIndex]);
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    if (queue.length > 0) {
      const prevIndex = currentIndex === 0 ? queue.length - 1 : currentIndex - 1;
      setCurrentIndex(prevIndex);
      setCurrentSong(queue[prevIndex]);
      setIsPlaying(true);
    }
  };

  const handleSelectPlaylist = (id: string | null) => {
    setSelectedPlaylistId(id);
    if (id) {
      setCurrentView('home');
    }
  };

  return (
    <div className="h-screen flex flex-col bg-black text-white">
      <div className="flex-1 flex overflow-hidden">
        <Sidebar
          playlists={mockPlaylists}
          selectedPlaylist={selectedPlaylistId}
          onSelectPlaylist={handleSelectPlaylist}
          onSelectView={setCurrentView}
          currentView={currentView}
        />

        <div className="flex-1 flex flex-col overflow-hidden relative">
          <TopBar />
          {selectedPlaylistId ? (
            <PlaylistView
              playlist={selectedPlaylist}
              onPlaySong={handlePlaySong}
              isPlaying={isPlaying}
              currentSong={currentSong}
            />
          ) : currentView === 'home' ? (
            <HomeView
              playlists={mockPlaylists}
              onSelectPlaylist={handleSelectPlaylist}
              onPlaySong={handlePlaySong}
            />
          ) : currentView === 'search' ? (
            <SearchView
              playlists={mockPlaylists}
              onSelectPlaylist={handleSelectPlaylist}
              onPlaySong={handlePlaySong}
            />
          ) : (
            <LibraryView
              playlists={mockPlaylists}
              onSelectPlaylist={handleSelectPlaylist}
              onPlaySong={handlePlaySong}
            />
          )}
        </div>
      </div>

      <Player
        currentSong={currentSong}
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </div>
  );
}

export default App;
