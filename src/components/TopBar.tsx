import { ChevronLeft, ChevronRight, User } from 'lucide-react';

interface TopBarProps {
  onBack?: () => void;
  onForward?: () => void;
}

export function TopBar({ onBack, onForward }: TopBarProps) {
  return (
    <div className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between px-8 pt-4 pb-2 bg-gradient-to-b from-[#00000088] to-transparent">
      <div className="flex items-center gap-4">
        <button
          onClick={onBack}
          className="w-8 h-8 bg-[#00000088] rounded-full flex items-center justify-center hover:bg-[#000000bb] transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={onForward}
          className="w-8 h-8 bg-[#00000088] rounded-full flex items-center justify-center hover:bg-[#000000bb] transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button className="px-8 py-2 text-sm font-bold text-[#b3b3b3] hover:text-white hover:scale-105 transition-all">
          Sign up
        </button>
        <button className="px-8 py-3 bg-white text-black rounded-full text-sm font-bold hover:scale-105 transition-transform">
          Log in
        </button>
      </div>
    </div>
  );
}
