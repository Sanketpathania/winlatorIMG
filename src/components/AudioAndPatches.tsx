import React, { useState } from 'react';
import { Volume2, Cpu, Copy, Check } from 'lucide-react';

export const AudioAndPatches: React.FC = () => {
  const [sampleRate, setSampleRate] = useState<number>(48000);
  const [channels, setChannels] = useState<number>(2);
  const [periodSize, setPeriodSize] = useState<number>(1024);
  const [periods, setPeriods] = useState<number>(4);
  const [copied, setCopied] = useState(false);

  // Latency calculation in ms
  const latencyMs = Math.round(((periodSize * periods) / sampleRate) * 1000);

  const generateAlsaConf = () => {
    return `# Winlator Android ALSA Configuration
# Generated with target buffer latency: ${latencyMs}ms

pcm.!default {
    type android_aserver
    server "127.0.0.1"
    port 7802
    rate ${sampleRate}
    channels ${channels}
    period_size ${periodSize}
    periods ${periods}
}

ctl.!default {
    type android_aserver
    server "127.0.0.1"
    port 7802
}
`;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateAlsaConf());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Volume2 className="w-5 h-5 text-cyan-400" />
          <span>ALSA Audio Server & GLIBC System V Memory Patches</span>
        </h2>
        <p className="text-xs text-slate-400 mt-1">
          Explore the low-level Android ALSA audio bridge (<code className="text-cyan-300">android_alsa/</code>) and System V Shared Memory patches (<code className="text-cyan-300">glibc_patches/</code>) bundled in this repository.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Audio Tuning Generator */}
        <div className="lg:col-span-6 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <span>ALSA Audio Latency & Buffer Synthesizer</span>
            </h3>

            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Sampling Rate</label>
                <select
                  value={sampleRate}
                  onChange={(e) => setSampleRate(parseInt(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200"
                >
                  <option value="48000">48,000 Hz (Android Native)</option>
                  <option value="44100">44,100 Hz (CD Audio)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Channels</label>
                <select
                  value={channels}
                  onChange={(e) => setChannels(parseInt(e.target.value))}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200"
                >
                  <option value="2">2 (Stereo)</option>
                  <option value="1">1 (Mono)</option>
                </select>
              </div>
            </div>

            <div className="space-y-3 text-xs">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-slate-400">Period Size (Frames)</label>
                  <span className="font-mono text-cyan-400">{periodSize} frames</span>
                </div>
                <input
                  type="range"
                  min="256"
                  max="2048"
                  step="256"
                  value={periodSize}
                  onChange={(e) => setPeriodSize(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-slate-400">Number of Periods (Buffers)</label>
                  <span className="font-mono text-cyan-400">{periods}</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="1"
                  value={periods}
                  onChange={(e) => setPeriods(parseInt(e.target.value))}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>
            </div>

            {/* Latency Meter Result */}
            <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 flex items-center justify-between text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Calculated Output Latency:</span>
                <span className={`text-base font-bold font-mono ${
                  latencyMs <= 50 ? 'text-emerald-400' :
                  latencyMs <= 95 ? 'text-cyan-400' :
                  'text-amber-400'
                }`}>
                  {latencyMs} ms
                </span>
              </div>
              <span className="text-[11px] text-slate-500 max-w-[200px] text-right">
                {latencyMs < 50 ? 'Ultra low latency (may crackle on weak CPUs)' :
                 latencyMs <= 95 ? 'Balanced (Smooth playback for 95% of PC games)' :
                 'Safe buffer (Recommended for Unreal Engine / Retro)'}
              </span>
            </div>

            {/* Live Config Preview */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">android_aserver.conf</span>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 text-xs text-cyan-400 hover:text-cyan-300"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <pre className="p-3 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto">
                {generateAlsaConf()}
              </pre>
            </div>

          </div>
        </div>

        {/* GLIBC & Architecture Info */}
        <div className="lg:col-span-6 space-y-4">
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <h3 className="font-bold text-sm text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>GLIBC Shared Memory Patches (<code className="text-xs text-cyan-300">sysvshm</code>)</span>
            </h3>

            <p className="text-xs text-slate-300 leading-relaxed">
              Standard Android Linux kernels do not enable standard System V IPC (<code className="text-cyan-400">shmget</code>, <code className="text-cyan-400">shmat</code>, <code className="text-cyan-400">shmdt</code>, <code className="text-cyan-400">shmctl</code>). Windows applications running under Wine heavily depend on SysV shared memory for inter-process communication and fast frame buffer sharing with XServer.
            </p>

            <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
              <span className="font-semibold text-cyan-300 block">Patched Syscall Implementations in Repository:</span>
              <ul className="space-y-1.5 text-slate-400 text-[11px] font-mono">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>/glibc_patches/.../android_sysvshm.c (ashmem memory backend)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>/glibc_patches/.../shmat.c (attach memory segment)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                  <span>/glibc_patches/.../shmctl.c (control & permissions)</span>
                </li>
              </ul>
            </div>

            <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-2 text-xs">
              <span className="font-semibold text-emerald-300 block">Android ALSA Bridge:</span>
              <p className="text-slate-400 text-[11px] leading-relaxed">
                <code className="text-slate-200">android_alsa/module_pcm_android_aserver.c</code> intercepts standard ALSA PCM stream requests from Windows audio clients and relays raw PCM packets through a local loopback TCP socket to Winlator's Android Java AudioTrack driver.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
