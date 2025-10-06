import { Play, Pause, SkipBack, SkipForward, Volume2, Shuffle, Repeat, Heart } from 'lucide-react';
import { Song } from '../types';
import { useEffect, useRef, useState } from 'react';

interface PlayerProps {
  currentSong: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function Player({ currentSong, isPlaying, onPlayPause, onNext, onPrevious }: PlayerProps) {
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [volume, setVolume] = useState(70);
  const intervalRef = useRef<number>();

  useEffect(() => {
    if (isPlaying && currentSong) {
      intervalRef.current = window.setInterval(() => {
        setCurrentTime((prev) => {
          const next = prev + 1;
          if (next >= currentSong.duration) {
            onNext();
            return 0;
          }
          setProgress((next / currentSong.duration) * 100);
          return next;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, currentSong, onNext]);

  useEffect(() => {
    setProgress(0);
    setCurrentTime(0);
  }, [currentSong]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!currentSong) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = (x / rect.width) * 100;
    const newTime = Math.floor((percentage / 100) * currentSong.duration);
    setCurrentTime(newTime);
    setProgress(percentage);
  };

  if (!currentSong) {
    return (
      <div className="h-24 bg-[#181818] border-t border-[#282828] flex items-center justify-center">
        <p className="text-[#b3b3b3] text-sm">Select a song to play</p>
      </div>
    );
  }

  return (
    <div className="h-24 bg-[#181818] border-t border-[#282828] flex items-center justify-between px-4">
      <div className="flex items-center gap-4 flex-1">
        <img
          src={currentSong.cover_url || 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=100'}
          alt={currentSong.title}
          className="w-14 h-14 rounded-md object-cover shadow-lg"
        />
        <div className="min-w-0">
          <div className="text-white text-sm hover:underline cursor-pointer truncate">{currentSong.title}</div>
          <div className="text-[#b3b3b3] text-xs hover:underline cursor-pointer truncate">{currentSong.artist_name}</div>
        </div>
        <button className="text-[#b3b3b3] hover:text-white transition-colors ml-4">
          <Heart className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 max-w-2xl">
        <div className="flex items-center justify-center gap-4 mb-2">
          <button className="text-[#b3b3b3] hover:text-white transition-colors">
            <Shuffle className="w-4 h-4" />
          </button>
          <button
            onClick={onPrevious}
            className="text-[#b3b3b3] hover:text-white transition-colors"
          >
            <SkipBack className="w-5 h-5 fill-current" />
          </button>
          <button
            onClick={onPlayPause}
            className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:scale-110 transition-transform"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4 text-black fill-current" />
            ) : (
              <Play className="w-4 h-4 text-black fill-current ml-0.5" />
            )}
          </button>
          <button
            onClick={onNext}
            className="text-[#b3b3b3] hover:text-white transition-colors"
          >
            <SkipForward className="w-5 h-5 fill-current" />
          </button>
          <button className="text-[#b3b3b3] hover:text-white transition-colors">
            <Repeat className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-[#a7a7a7] w-10 text-right">{formatTime(currentTime)}</span>
          <div
            className="flex-1 h-1 bg-[#4d4d4d] rounded-full cursor-pointer group"
            onClick={handleProgressClick}
          >
            <div
              className="h-full bg-white rounded-full relative group-hover:bg-[#1db954] transition-colors"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </div>
          <span className="text-xs text-[#a7a7a7] w-10">{formatTime(currentSong.duration)}</span>
        </div>
      </div>

      <div className="flex items-center gap-3 flex-1 justify-end">
        <Volume2 className="w-4 h-4 text-[#b3b3b3] hover:text-white transition-colors cursor-pointer" />
        <div className="w-24 h-1 bg-[#4d4d4d] rounded-full group cursor-pointer">
          <div
            className="h-full bg-white rounded-full relative group-hover:bg-[#1db954] transition-colors"
            style={{ width: `${volume}%` }}
            onClick={(e) => {
              const rect = e.currentTarget.parentElement!.getBoundingClientRect();
              const x = e.clientX - rect.left;
              const percentage = (x / rect.width) * 100;
              setVolume(Math.max(0, Math.min(100, percentage)));
            }}
          >
            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>
    </div>
  );
}
