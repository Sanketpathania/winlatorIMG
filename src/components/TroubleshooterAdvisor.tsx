import React, { useState } from 'react';
import { TROUBLESHOOTING_TIPS } from '../data/troubleshootingData';
import { TroubleshootingTip } from '../types';
import { 
  AlertTriangle, 
  Wrench, 
  Sparkles,
  Terminal
} from 'lucide-react';

export const TroubleshooterAdvisor: React.FC = () => {
  const [selectedTip, setSelectedTip] = useState<TroubleshootingTip>(TROUBLESHOOTING_TIPS[0]);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const filteredTips = activeCategory === 'all'
    ? TROUBLESHOOTING_TIPS
    : TROUBLESHOOTING_TIPS.filter(t => t.category === activeCategory);

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Wrench className="w-5 h-5 text-cyan-400" />
            <span>Interactive Diagnostic & Troubleshooting Advisor</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Fix black screens, audio popping, Unity engine freezes, and DirectX driver mismatches.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
          {[
            { id: 'all', label: 'All Issues' },
            { id: 'powervr', label: 'Pixel 10 / PowerVR' },
            { id: 'stability', label: 'Stability & Freezes' },
            { id: 'audio', label: 'Audio & Latency' },
            { id: 'graphics', label: 'Graphics & Black Screen' },
            { id: 'dotnet', label: '.NET / Mono' },
            { id: 'performance', label: 'Mali / Hardware' },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveCategory(tab.id)}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors ${
                activeCategory === tab.id
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Issue Cards */}
        <div className="lg:col-span-6 space-y-3">
          {filteredTips.map(tip => {
            const isSelected = tip.id === selectedTip.id;

            return (
              <div
                key={tip.id}
                onClick={() => setSelectedTip(tip)}
                className={`p-4 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-gradient-to-r from-slate-900 to-cyan-950/40 border-cyan-500 shadow-md shadow-cyan-500/10'
                    : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg mt-0.5 ${
                    tip.category === 'stability' ? 'bg-amber-500/10 text-amber-400' :
                    tip.category === 'audio' ? 'bg-blue-500/10 text-blue-400' :
                    tip.category === 'graphics' ? 'bg-emerald-500/10 text-emerald-400' :
                    'bg-purple-500/10 text-purple-400'
                  }`}>
                    <AlertTriangle className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-white">{tip.title}</h3>
                    <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                      {tip.symptom}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Detailed Solution Guide */}
        <div className="lg:col-span-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5 sticky top-24">
            
            <div className="border-b border-slate-800 pb-4">
              <span className="text-xs font-mono uppercase text-cyan-400 tracking-wider font-semibold">
                Diagnostic Solution & Recommended Action
              </span>
              <h3 className="text-lg font-bold text-white mt-1">{selectedTip.title}</h3>
              
              <div className="mt-3 p-3 bg-slate-950 rounded-lg border border-slate-800/90 text-xs text-slate-300">
                <span className="font-semibold text-rose-400 block mb-1">Symptom:</span>
                {selectedTip.symptom}
              </div>
            </div>

            {/* Steps to resolve */}
            <div className="space-y-3 text-xs">
              <h4 className="font-semibold text-slate-200 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>Step-by-Step Resolution</span>
              </h4>

              <div className="space-y-2">
                {selectedTip.steps.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3 p-2.5 bg-slate-950 rounded-lg border border-slate-800/60">
                    <span className="w-5 h-5 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 flex items-center justify-center font-mono font-bold text-[10px] flex-shrink-0">
                      {idx + 1}
                    </span>
                    <span className="text-slate-300 text-xs leading-relaxed">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Suggested Env Vars */}
            {selectedTip.suggestedEnvVars && (
              <div className="space-y-2 text-xs">
                <h4 className="font-semibold text-slate-300 flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Required Environment Variables</span>
                </h4>
                <div className="p-3 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px] text-cyan-300 space-y-1">
                  {Object.entries(selectedTip.suggestedEnvVars).map(([k, v]) => (
                    <div key={k}>
                      <span className="text-slate-400">{k}=</span>
                      <span className="text-emerald-400">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>
        </div>

      </div>

    </div>
  );
};
