import React, { useState } from 'react';
import { COMPONENT_CATALOG } from '../data/componentsData';
import { InstallableComponent } from '../types';
import { 
  Package, 
  Cpu, 
  Zap, 
  CheckCircle2, 
  HelpCircle, 
  ShieldCheck
} from 'lucide-react';

export const ComponentsCatalog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeComponent, setActiveComponent] = useState<InstallableComponent>(COMPONENT_CATALOG[0]);

  const filteredComponents = selectedCategory === 'all'
    ? COMPONENT_CATALOG
    : COMPONENT_CATALOG.filter(c => c.category === selectedCategory);

  return (
    <div className="space-y-6">
      
      {/* Category Navigation */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Package className="w-5 h-5 text-cyan-400" />
            <span>Installable Component Archives & Drivers</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Official pre-compiled .tzst packages for Box64 Dynarec, Mesa Turnip Vulkan, DXVK, VKD3D, and WineD3D.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          {[
            { id: 'all', label: 'All Packages' },
            { id: 'powervr', label: 'PowerVR / Pixel 10' },
            { id: 'box64', label: 'Box64 (CPU)' },
            { id: 'turnip', label: 'Turnip (GPU)' },
            { id: 'dxvk', label: 'DXVK (D3D9/11)' },
            { id: 'vkd3d', label: 'VKD3D (D3D12)' },
            { id: 'wined3d', label: 'WineD3D (OpenGL)' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setSelectedCategory(tab.id)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                selectedCategory === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid: Component Cards & Detail Inspector */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Component List Cards */}
        <div className="lg:col-span-7 space-y-3">
          {filteredComponents.map(comp => {
            const isSelected = comp.id === activeComponent.id;

            return (
              <div
                key={comp.id}
                onClick={() => setActiveComponent(comp)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-slate-900 to-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded font-semibold ${
                        comp.category === 'box64' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                        comp.category === 'turnip' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                        comp.category === 'dxvk' ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' :
                        comp.category === 'vkd3d' ? 'bg-purple-500/10 text-purple-400 border border-purple-500/20' :
                        'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                      }`}>
                        {comp.category}
                      </span>
                      <h3 className="font-bold text-sm text-white">{comp.name}</h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-1.5 line-clamp-2">
                      {comp.description}
                    </p>
                  </div>

                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-mono text-slate-300 font-semibold block">
                      {comp.size}
                    </span>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {comp.filename}
                    </span>
                  </div>
                </div>

                {/* Features Pill tags */}
                <div className="flex items-center gap-1.5 mt-3 flex-wrap">
                  {comp.features.slice(0, 3).map((feat, i) => (
                    <span key={i} className="text-[10px] px-2 py-0.5 rounded bg-slate-950 text-slate-300 border border-slate-800 font-medium">
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Component Technical Dossier */}
        <div className="lg:col-span-5">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 sticky top-24 space-y-5">
            
            <div className="border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">
                  Component Architecture Dossier
                </span>
              </div>
              <h3 className="text-lg font-bold text-white mt-1">{activeComponent.name}</h3>
              <p className="text-xs text-slate-400 mt-1">{activeComponent.description}</p>
            </div>

            {/* Technical Specifications */}
            <div className="space-y-3 text-xs">
              <h4 className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-400" />
                <span>Feature Highlights & Enhancements</span>
              </h4>
              <ul className="space-y-2">
                {activeComponent.features.map((feat, i) => (
                  <li key={i} className="flex items-start gap-2 text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Recommended Hardware & Titles */}
            {activeComponent.recommendedFor && activeComponent.recommendedFor.length > 0 && (
              <div className="space-y-2 text-xs">
                <h4 className="font-semibold text-slate-200 flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Optimal Compatibility Target</span>
                </h4>
                <div className="flex flex-wrap gap-1.5">
                  {activeComponent.recommendedFor.map((rec, i) => (
                    <span key={i} className="px-2 py-1 rounded bg-slate-950 text-cyan-300 border border-cyan-500/20 text-[11px]">
                      {rec}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Winlator Installation Instructions Box */}
            <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold">
                <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
                <span>How to Install in Winlator APK</span>
              </div>
              <ol className="list-decimal list-inside space-y-1 text-slate-400 text-[11px] leading-relaxed">
                <li>Copy <span className="font-mono text-cyan-300">{activeComponent.filename}</span> to your phone's storage.</li>
                <li>In Winlator side menu, go to <strong>Install Component</strong>.</li>
                <li>Select the <span className="font-mono text-slate-300">.tzst</span> package to register it.</li>
                <li>Assign it in your Container Settings dropdown.</li>
              </ol>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
};
