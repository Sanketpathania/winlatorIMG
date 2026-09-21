import React, { useState, useMemo } from 'react';
import { InputControlProfile } from '../types';
import { Search, Gamepad, Download, ArrowRight, Filter } from 'lucide-react';
import { ALL_GAME_NAMES } from '../data/profilesData';

interface ProfileListProps {
  profiles: InputControlProfile[];
  selectedProfileId: number;
  onSelectProfile: (profile: InputControlProfile) => void;
  onExportProfile: (profile: InputControlProfile) => void;
}

export const ProfileList: React.FC<ProfileListProps> = ({
  profiles,
  selectedProfileId,
  onSelectProfile,
  onExportProfile,
}) => {
  const [search, setSearch] = useState('');
  const [genreFilter, setGenreFilter] = useState('ALL');

  // Derive genres
  const genres = useMemo(() => {
    const set = new Set<string>();
    profiles.forEach(p => {
      if (p.genre) set.add(p.genre);
    });
    return ['ALL', ...Array.from(set)];
  }, [profiles]);

  // Combined list including standard profiles and games
  const filteredProfiles = useMemo(() => {
    return profiles.filter(p => {
      const matchesSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.tags?.some(t => t.toLowerCase().includes(search.toLowerCase())) ||
        p.genre?.toLowerCase().includes(search.toLowerCase());
      const matchesGenre = genreFilter === 'ALL' || p.genre === genreFilter;
      return matchesSearch && matchesGenre;
    });
  }, [profiles, search, genreFilter]);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
      
      {/* Header & Search */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Gamepad className="w-4 h-4 text-cyan-400" />
            <span>Pre-Configured Game Profiles Catalog</span>
            <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 font-mono">
              {ALL_GAME_NAMES.length} Official Games (.icp)
            </span>
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Select a game to view layout, edit touch triggers, or export to your device's Winlator input controls directory.
          </p>
        </div>

        {/* Search Bar */}
        <div className="relative w-full md:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search Skyrim, GTA 5, FlatOut..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-700 rounded-lg pl-9 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Genre Filter Pills */}
      {genres.length > 1 && (
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          <Filter className="w-3.5 h-3.5 text-slate-500 flex-shrink-0" />
          {genres.map(g => (
            <button
              key={g}
              onClick={() => setGenreFilter(g)}
              className={`px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                genreFilter === g
                  ? 'bg-cyan-500 text-slate-950 font-bold'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {g}
            </button>
          ))}
        </div>
      )}

      {/* Grid of Profile Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 max-h-[480px] overflow-y-auto pr-1">
        {filteredProfiles.map((p) => {
          const isSelected = p.id === selectedProfileId;
          const buttonCount = p.elements.filter(e => e.type === 'BUTTON').length;
          const stickCount = p.elements.filter(e => e.type === 'STICK').length;
          const dpadCount = p.elements.filter(e => e.type === 'D_PAD').length;

          return (
            <div
              key={p.id}
              onClick={() => onSelectProfile(p)}
              className={`p-3.5 rounded-xl border transition-all cursor-pointer flex flex-col justify-between group ${
                isSelected
                  ? 'bg-gradient-to-br from-cyan-950/60 to-slate-900 border-cyan-500 shadow-md shadow-cyan-500/10'
                  : 'bg-slate-950/70 border-slate-800/90 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                    {p.name}
                  </h4>
                  <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-slate-900 text-slate-400 border border-slate-800">
                    ID: {p.id}
                  </span>
                </div>

                {p.genre && (
                  <p className="text-[11px] text-cyan-400/90 mt-0.5 font-medium">
                    {p.genre}
                  </p>
                )}

                {/* Control Breakdown Tags */}
                <div className="flex items-center gap-1.5 mt-2 flex-wrap text-[10px] text-slate-400 font-mono">
                  {stickCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                      🕹️ {stickCount} Stick
                    </span>
                  )}
                  {dpadCount > 0 && (
                    <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                      🎛️ {dpadCount} D-Pad
                    </span>
                  )}
                  <span className="px-1.5 py-0.5 rounded bg-slate-900 border border-slate-800">
                    🔘 {buttonCount} Buttons
                  </span>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-800/80 text-xs">
                <span className="text-[11px] text-slate-500">
                  Sensitivity: <span className="text-slate-300 font-mono">{p.cursorSpeed}x</span>
                </span>

                <div className="flex items-center gap-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onExportProfile(p);
                    }}
                    title="Export this .icp file"
                    className="p-1 rounded text-slate-400 hover:text-emerald-400 hover:bg-emerald-500/10 transition-colors"
                  >
                    <Download className="w-3.5 h-3.5" />
                  </button>

                  <span className="text-cyan-400 flex items-center gap-0.5 text-[11px] font-medium group-hover:translate-x-0.5 transition-transform">
                    <span>Load</span>
                    <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
