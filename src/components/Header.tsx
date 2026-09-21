import React from 'react';
import { Gamepad2, Package, Settings2, HelpCircle, Volume2, Download, Upload, Plus } from 'lucide-react';

interface HeaderProps {
  activeTab: 'profiles' | 'catalog' | 'container' | 'troubleshoot' | 'audio';
  setActiveTab: (tab: 'profiles' | 'catalog' | 'container' | 'troubleshoot' | 'audio') => void;
  onNewProfile: () => void;
  onImportProfile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onExportCurrentProfile: () => void;
  currentProfileName: string;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  onNewProfile,
  onImportProfile,
  onExportCurrentProfile,
  currentProfileName,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <header className="border-b border-slate-800 bg-slate-900/90 backdrop-blur sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Title */}
          <div className="flex items-center gap-3">
            <img 
              src="/logo.png" 
              alt="Winlator" 
              className="h-9 w-auto object-contain drop-shadow-md"
              onError={(e) => {
                // Fallback icon if logo not loaded
                (e.target as HTMLElement).style.display = 'none';
              }}
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-lg text-white tracking-wide">Winlator Hub</span>
                <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-cyan-500/20 text-cyan-400 border border-cyan-500/30">
                  v11.2 IMG
                </span>
              </div>
              <p className="text-xs text-slate-400 hidden sm:block">
                Windows on ARM64 • Control Studio & Component Manager
              </p>
            </div>
          </div>

          {/* Nav Tabs */}
          <nav className="flex items-center gap-1 overflow-x-auto py-1">
            <button
              id="tab-controls"
              onClick={() => setActiveTab('profiles')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'profiles'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Control Profiles</span>
            </button>

            <button
              id="tab-catalog"
              onClick={() => setActiveTab('catalog')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'catalog'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Package className="w-4 h-4" />
              <span>Components & Drivers</span>
            </button>

            <button
              id="tab-container"
              onClick={() => setActiveTab('container')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'container'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Settings2 className="w-4 h-4" />
              <span>Container Setup</span>
            </button>

            <button
              id="tab-troubleshoot"
              onClick={() => setActiveTab('troubleshoot')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'troubleshoot'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <HelpCircle className="w-4 h-4" />
              <span>Troubleshooter</span>
            </button>

            <button
              id="tab-audio"
              onClick={() => setActiveTab('audio')}
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                activeTab === 'audio'
                  ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20 font-semibold'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <Volume2 className="w-4 h-4" />
              <span>ALSA & Audio</span>
            </button>
          </nav>

          {/* Quick Actions (when in profile studio) */}
          <div className="flex items-center gap-2">
            <input
              type="file"
              ref={fileInputRef}
              accept=".icp,application/json"
              onChange={onImportProfile}
              className="hidden"
            />

            <button
              id="btn-import-profile"
              onClick={() => fileInputRef.current?.click()}
              title="Import .icp profile file"
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-700 bg-slate-800/70 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <Upload className="w-3.5 h-3.5 text-cyan-400" />
              <span className="hidden md:inline">Import .icp</span>
            </button>

            {activeTab === 'profiles' && (
              <>
                <button
                  id="btn-new-profile"
                  onClick={onNewProfile}
                  title="Create a new empty profile"
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg border border-slate-700 bg-slate-800/70 text-slate-200 hover:bg-slate-700 hover:text-white transition-colors"
                >
                  <Plus className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="hidden md:inline">New Profile</span>
                </button>

                <button
                  id="btn-export-profile"
                  onClick={onExportCurrentProfile}
                  title={`Export ${currentProfileName}.icp`}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30 transition-colors"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span className="hidden md:inline">Export .icp</span>
                </button>
              </>
            )}
          </div>

        </div>
      </div>
    </header>
  );
};
