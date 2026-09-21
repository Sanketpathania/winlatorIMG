import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { ProfileVisualizer } from './components/ProfileVisualizer';
import { ProfileList } from './components/ProfileList';
import { ComponentsCatalog } from './components/ComponentsCatalog';
import { ContainerConfigurator } from './components/ContainerConfigurator';
import { TroubleshooterAdvisor } from './components/TroubleshooterAdvisor';
import { AudioAndPatches } from './components/AudioAndPatches';
import { INITIAL_PROFILES } from './data/profilesData';
import { InputControlProfile } from './types';

export function App() {
  const [activeTab, setActiveTab] = useState<'profiles' | 'catalog' | 'container' | 'troubleshoot' | 'audio'>('profiles');
  const [profiles, setProfiles] = useState<InputControlProfile[]>(() => {
    const saved = localStorage.getItem('winlator_profiles');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved profiles', e);
      }
    }
    return INITIAL_PROFILES;
  });

  const [currentProfileId, setCurrentProfileId] = useState<number>(profiles[0]?.id || 16);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('winlator_profiles', JSON.stringify(profiles));
  }, [profiles]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  const currentProfile = profiles.find(p => p.id === currentProfileId) || profiles[0] || INITIAL_PROFILES[0];

  const handleUpdateProfile = (updated: InputControlProfile) => {
    setProfiles(prev => prev.map(p => p.id === updated.id ? updated : p));
  };

  const handleNewProfile = () => {
    const newId = Date.now() % 10000;
    const newProfile: InputControlProfile = {
      id: newId,
      name: `Custom Game ${newId}`,
      cursorSpeed: 1.0,
      genre: 'Custom',
      elements: [
        { type: 'D_PAD', shape: 'CIRCLE', bindings: ['KEY_W', 'KEY_D', 'KEY_S', 'KEY_A'], scale: 1.0, x: 0.12, y: 0.72, toggleSwitch: false, text: 'D-Pad', iconId: 0 },
        { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_SPACE', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.88, y: 0.72, toggleSwitch: false, text: 'Action', iconId: 0 },
        { type: 'BUTTON', shape: 'ROUND_RECT', bindings: ['KEY_ESC', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.5, y: 0.92, toggleSwitch: false, text: 'Menu', iconId: 0 }
      ]
    };
    setProfiles(prev => [newProfile, ...prev]);
    setCurrentProfileId(newProfile.id);
    setActiveTab('profiles');
    showToast(`Created new profile: ${newProfile.name}`);
  };

  const handleExportProfile = (profileToExport: InputControlProfile) => {
    // Exact Winlator .icp format
    const icpData = {
      id: profileToExport.id,
      name: profileToExport.name,
      cursorSpeed: profileToExport.cursorSpeed,
      elements: profileToExport.elements.map(el => ({
        type: el.type,
        shape: el.shape,
        bindings: el.bindings,
        scale: el.scale,
        x: el.x,
        y: el.y,
        toggleSwitch: el.toggleSwitch,
        text: el.text || '',
        iconId: el.iconId || 0,
      }))
    };

    const blob = new Blob([JSON.stringify(icpData)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${profileToExport.name}.icp`;
    a.click();
    URL.revokeObjectURL(url);
    showToast(`Exported ${profileToExport.name}.icp`);
  };

  const handleImportProfile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (!parsed.name || !Array.isArray(parsed.elements)) {
          throw new Error('Invalid .icp file format');
        }

        const newProfile: InputControlProfile = {
          id: parsed.id || (Date.now() % 10000),
          name: parsed.name,
          cursorSpeed: parsed.cursorSpeed || 1.0,
          genre: 'Imported',
          elements: parsed.elements.map((el: any) => ({
            type: el.type || 'BUTTON',
            shape: el.shape || 'CIRCLE',
            bindings: el.bindings || ['NONE', 'NONE', 'NONE', 'NONE'],
            scale: el.scale || 1.0,
            x: el.x ?? 0.5,
            y: el.y ?? 0.5,
            toggleSwitch: !!el.toggleSwitch,
            text: el.text || '',
            iconId: el.iconId || 0,
          }))
        };

        setProfiles(prev => [newProfile, ...prev]);
        setCurrentProfileId(newProfile.id);
        setActiveTab('profiles');
        showToast(`Successfully imported ${newProfile.name}.icp`);
      } catch (err: any) {
        showToast(`Failed to parse profile: ${err.message}`);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      
      {/* App Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onNewProfile={handleNewProfile}
        onImportProfile={handleImportProfile}
        onExportCurrentProfile={() => handleExportProfile(currentProfile)}
        currentProfileName={currentProfile.name}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Toast Notification */}
        {toastMessage && (
          <div className="fixed bottom-5 right-5 z-50 px-4 py-2.5 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl shadow-xl shadow-cyan-500/20 flex items-center gap-2 border border-cyan-300">
            <span>✨</span>
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Tab Views */}
        {activeTab === 'profiles' && (
          <div className="space-y-8">
            <ProfileVisualizer
              profile={currentProfile}
              onChange={handleUpdateProfile}
              onExport={() => handleExportProfile(currentProfile)}
            />

            <ProfileList
              profiles={profiles}
              selectedProfileId={currentProfile.id}
              onSelectProfile={(p) => setCurrentProfileId(p.id)}
              onExportProfile={handleExportProfile}
            />
          </div>
        )}

        {activeTab === 'catalog' && (
          <ComponentsCatalog />
        )}

        {activeTab === 'container' && (
          <ContainerConfigurator />
        )}

        {activeTab === 'troubleshoot' && (
          <TroubleshooterAdvisor />
        )}

        {activeTab === 'audio' && (
          <AudioAndPatches />
        )}

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950 py-6 text-xs text-slate-500 text-center">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Winlator v11.2 IMG Package Repository & Control Profile Studio</span>
          <span>Wine • Box64 • Mesa Turnip • DXVK • VKD3D • ALSA</span>
        </div>
      </footer>

    </div>
  );
}
export default App;
