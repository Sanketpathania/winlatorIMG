import React, { useState } from 'react';
import { ContainerConfig } from '../types';
import { 
  Settings2, 
  Cpu, 
  Monitor, 
  Volume2, 
  Terminal, 
  Check, 
  Copy, 
  Download, 
  Sparkles,
  Plus,
  Trash2
} from 'lucide-react';

const PRESET_TEMPLATES: { name: string; desc: string; config: ContainerConfig }[] = [
  {
    name: 'Google Pixel 10 Pro XL (Tensor G5 / PowerVR DXT)',
    desc: 'Targeted for Imagination PowerVR DXT-48-1536 ray-tracing GPU on Tensor G5. Uses System Vulkan ICD and 16KB kernel page alignment.',
    config: {
      name: 'Pixel10ProXL-PowerVR-DXT',
      screenResolution: '1280x720',
      graphicsDriver: 'System Vulkan (PowerVR DXT / Tensor G5)',
      turnipVersion: 'None (PowerVR DXT GPU)',
      dxvkVersion: 'dxvk-2.6.1',
      vkd3dVersion: 'vkd3d-3.0b',
      box64Preset: 'Stability',
      box64Version: 'box64-0.3.7-16k',
      audioDriver: 'ALSA',
      audioLatencyMs: 35,
      envVars: [
        { key: 'BOX64_DYNAREC_PAGE_SIZE', value: '16384' },
        { key: 'BOX64_DYNAREC_SAFE', value: '1' },
        { key: 'DXVK_ASYNC', value: '1' },
        { key: 'DXVK_FILTER_DEVICE_NAME', value: 'PowerVR' },
        { key: 'MESA_VK_WSI_PRESENT_MODE', value: 'mailbox' },
        { key: 'DXVK_HUD', value: 'fps,gpuload' }
      ],
      execArgs: '',
      forceFullscreen: true,
      wineMono: true,
      pageSize16k: true,
    }
  },
  {
    name: 'Snapdragon 8 Gen 2 / 8 Gen 3 (High-End 3D)',
    desc: 'Max performance for modern 3D games (GTA 5, Skyrim, Far Cry 4) with latest Turnip & DXVK 2.6.1.',
    config: {
      name: 'SD8Gen2-HighPerformance',
      screenResolution: '1280x720',
      graphicsDriver: 'Turnip (Mesa Vulkan)',
      turnipVersion: 'turnip-26.0.3',
      dxvkVersion: 'dxvk-2.6.1',
      vkd3dVersion: 'vkd3d-3.0b',
      box64Preset: 'Performance',
      box64Version: 'box64-0.3.7',
      audioDriver: 'ALSA',
      audioLatencyMs: 40,
      envVars: [
        { key: 'DXVK_ASYNC', value: '1' },
        { key: 'DXVK_HUD', value: 'fps' },
        { key: 'BOX64_DYNAREC_FASTNAN', value: '1' }
      ],
      execArgs: '',
      forceFullscreen: true,
      wineMono: true,
      pageSize16k: false,
    }
  },
  {
    name: 'Unity Engine & Heavy Stutter Fix',
    desc: 'Stabilizes games that freeze or crash on startup by setting Box64 to Stability and direct graphics.',
    config: {
      name: 'Unity-Stability-Preset',
      screenResolution: '1280x720',
      graphicsDriver: 'Turnip (Mesa Vulkan)',
      turnipVersion: 'turnip-25.0.0',
      dxvkVersion: 'dxvk-2.5.2',
      vkd3dVersion: 'vkd3d-2.14.1',
      box64Preset: 'Stability',
      box64Version: 'box64-0.3.5',
      audioDriver: 'ALSA',
      audioLatencyMs: 90,
      envVars: [
        { key: 'BOX64_DYNAREC_SAFE', value: '1' },
        { key: 'MESA_EXTENSION_MAX_YEAR', value: '2005' }
      ],
      execArgs: '-force-gfx-direct',
      forceFullscreen: true,
      wineMono: true,
    }
  },
  {
    name: 'Retro Direct3D 8/9 & Older PC Titles',
    desc: 'Designed for early 2000s classics (Fallout 3, FlatOut 2, Bioshock, Hitman 2) with legacy DXVK 1.7.2.',
    config: {
      name: 'Retro-D3D9-Legacy',
      screenResolution: '1024x768',
      graphicsDriver: 'Turnip (Mesa Vulkan)',
      turnipVersion: 'turnip-25.0.0',
      dxvkVersion: 'dxvk-1.7.2',
      vkd3dVersion: 'vkd3d-2.12',
      box64Preset: 'Compatibility',
      box64Version: 'box64-0.3.5',
      audioDriver: 'ALSA',
      audioLatencyMs: 90,
      envVars: [
        { key: 'MESA_EXTENSION_MAX_YEAR', value: '2003' }
      ],
      execArgs: '',
      forceFullscreen: true,
      wineMono: false,
    }
  },
  {
    name: 'MediaTek Dimensity / Mali GPU (OpenGL Fallback)',
    desc: 'Uses WineD3D OpenGL translation layer for non-Qualcomm chipsets without Turnip Vulkan support.',
    config: {
      name: 'Mali-WineD3D-Compatibility',
      screenResolution: '1280x720',
      graphicsDriver: 'WineD3D (OpenGL)',
      turnipVersion: 'None (Mali GPU)',
      dxvkVersion: 'wined3d-10.0',
      vkd3dVersion: 'None',
      box64Preset: 'Compatibility',
      box64Version: 'box64-0.3.5',
      audioDriver: 'ALSA',
      audioLatencyMs: 60,
      envVars: [],
      execArgs: '',
      forceFullscreen: true,
      wineMono: true,
    }
  }
];

export const ContainerConfigurator: React.FC = () => {
  const [config, setConfig] = useState<ContainerConfig>(PRESET_TEMPLATES[0].config);
  const [copied, setCopied] = useState(false);

  const handleApplyPreset = (presetConfig: ContainerConfig) => {
    setConfig({ ...presetConfig });
  };

  const handleAddEnvVar = () => {
    setConfig(prev => ({
      ...prev,
      envVars: [...prev.envVars, { key: '', value: '' }]
    }));
  };

  const handleRemoveEnvVar = (index: number) => {
    setConfig(prev => ({
      ...prev,
      envVars: prev.envVars.filter((_, i) => i !== index)
    }));
  };

  const handleUpdateEnvVar = (index: number, key: string, value: string) => {
    const next = [...config.envVars];
    next[index] = { key, value };
    setConfig({ ...config, envVars: next });
  };

  const generateConfigText = () => {
    return JSON.stringify(config, null, 2);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generateConfigText());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const blob = new Blob([generateConfigText()], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${config.name.toLowerCase().replace(/\s+/g, '-')}-container-config.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Pixel 10 Pro XL Hardware Architecture Banner */}
      <div className="bg-gradient-to-r from-amber-950/40 via-slate-900 to-cyan-950/40 border border-amber-500/30 rounded-xl p-4 sm:p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase tracking-wider">
              Google Pixel 10 Pro XL / Tensor G5 Hardware
            </span>
            <span className="text-[11px] font-mono text-cyan-300">
              Imagination PowerVR DXT 48-1536 (Ray Tracing GPU)
            </span>
          </div>
          <p className="text-xs text-slate-300">
            <strong className="text-amber-200 font-semibold">Important Hardware Rule:</strong> Mesa Turnip Vulkan driver will crash on PowerVR DXT. Always use <span className="text-cyan-300 font-mono">System Vulkan ICD</span> or <span className="text-cyan-300 font-mono">WineD3D</span> combined with <span className="text-cyan-300 font-mono">16KB page size Dynarec</span> on Android 15/16.
          </p>
        </div>
        <button
          onClick={() => handleApplyPreset(PRESET_TEMPLATES[0].config)}
          className="self-start md:self-center px-4 py-2 bg-gradient-to-r from-cyan-600 to-amber-600 hover:from-cyan-500 hover:to-amber-500 text-white text-xs font-bold rounded-lg shadow-sm shadow-cyan-900/40 transition-all flex items-center gap-1.5 whitespace-nowrap"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>Apply Pixel 10 DXT Preset</span>
        </button>
      </div>

      {/* Preset Quick Select Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <Settings2 className="w-5 h-5 text-cyan-400" />
            <span>Container Preset Builder & Tuning Studio</span>
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Build optimized Winlator container configurations tailored to your phone's SoC and target game requirements.
          </p>
        </div>

        {/* Preset Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3">
          {PRESET_TEMPLATES.map((tmpl, i) => (
            <button
              key={i}
              onClick={() => handleApplyPreset(tmpl.config)}
              className={`text-left p-3.5 rounded-xl border transition-all flex flex-col justify-between ${
                config.name === tmpl.config.name
                  ? 'bg-cyan-950/50 border-cyan-500 shadow-sm shadow-cyan-500/20 ring-1 ring-cyan-500/40'
                  : 'bg-slate-950 border-slate-800 hover:border-slate-700 hover:bg-slate-900'
              }`}
            >
              <div>
                <span className="font-bold text-xs text-white block mb-1">
                  {tmpl.name}
                </span>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {tmpl.desc}
                </p>
              </div>
              <div className="mt-3 flex items-center gap-1 text-[10px] font-mono text-cyan-400 font-semibold">
                <Sparkles className="w-3 h-3" />
                <span>Apply Preset</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Main Configurator Form & Live Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Form Controls */}
        <div className="lg:col-span-7 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
          
          {/* General & Resolution */}
          <div className="space-y-3 border-b border-slate-800 pb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Monitor className="w-4 h-4 text-cyan-400" />
              <span>Display & General Settings</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Container Name</label>
                <input
                  type="text"
                  value={config.name}
                  onChange={(e) => setConfig({ ...config, name: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Screen Resolution</label>
                <select
                  value={config.screenResolution}
                  onChange={(e) => setConfig({ ...config, screenResolution: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="1280x720">1280x720 (16:9 Standard HD - Recommended)</option>
                  <option value="1600x720">1600x720 (20:9 Pixel 10 Full Screen)</option>
                  <option value="1600x900">1600x900 (16:9 900p)</option>
                  <option value="1920x1080">1920x1080 (16:9 Full HD)</option>
                  <option value="1024x768">1024x768 (4:3 Retro)</option>
                  <option value="800x600">800x600 (4:3 Low Res)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 text-xs pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.forceFullscreen}
                  onChange={(e) => setConfig({ ...config, forceFullscreen: e.target.checked })}
                  className="w-4 h-4 accent-cyan-500 rounded"
                />
                <span className="text-slate-300">Force Fullscreen (Scales 720p to 20:9 display)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={config.wineMono}
                  onChange={(e) => setConfig({ ...config, wineMono: e.target.checked })}
                  className="w-4 h-4 accent-cyan-500 rounded"
                />
                <span className="text-slate-300">Enable Wine Mono (.NET Framework)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer bg-cyan-950/40 border border-cyan-500/30 px-2 py-1 rounded-lg">
                <input
                  type="checkbox"
                  checked={!!config.pageSize16k}
                  onChange={(e) => {
                    const enabled = e.target.checked;
                    let nextEnv = [...config.envVars];
                    if (enabled) {
                      if (!nextEnv.some(v => v.key === 'BOX64_DYNAREC_PAGE_SIZE')) {
                        nextEnv.push({ key: 'BOX64_DYNAREC_PAGE_SIZE', value: '16384' });
                      }
                      if (!nextEnv.some(v => v.key === 'BOX64_DYNAREC_SAFE')) {
                        nextEnv.push({ key: 'BOX64_DYNAREC_SAFE', value: '1' });
                      }
                    }
                    setConfig({
                      ...config,
                      pageSize16k: enabled,
                      envVars: nextEnv
                    });
                  }}
                  className="w-4 h-4 accent-cyan-400 rounded"
                />
                <span className="text-cyan-300 font-semibold">16KB Kernel Page Size Mode (Pixel 10 / Android 15+)</span>
              </label>
            </div>
          </div>

          {/* Graphics & Box64 */}
          <div className="space-y-3 border-b border-slate-800 pb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Cpu className="w-4 h-4 text-cyan-400" />
              <span>Graphics & CPU Emulation Engine</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Graphics Driver</label>
                <select
                  value={config.graphicsDriver}
                  onChange={(e) => {
                    const val = e.target.value;
                    const isPowerVR = val.includes('PowerVR') || val.includes('System Vulkan');
                    setConfig({
                      ...config,
                      graphicsDriver: val,
                      turnipVersion: isPowerVR ? 'None (PowerVR DXT GPU)' : config.turnipVersion
                    });
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="System Vulkan (PowerVR DXT / Tensor G5)">System Vulkan (PowerVR DXT 48-1536 / Tensor G5)</option>
                  <option value="Turnip (Mesa Vulkan)">Turnip (Qualcomm Adreno Vulkan Only)</option>
                  <option value="WineD3D (OpenGL)">WineD3D (PowerVR DXT / Mali OpenGL ES)</option>
                  <option value="VirGL (OpenGL ES)">VirGL (Generic OpenGL ES)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Turnip Vulkan Driver Version</label>
                <select
                  value={config.turnipVersion}
                  onChange={(e) => setConfig({ ...config, turnipVersion: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="None (PowerVR DXT GPU)">None (PowerVR DXT / System Driver)</option>
                  <option value="turnip-26.0.3">turnip-26.0.3 (Snapdragon 8 Gen 2/3)</option>
                  <option value="turnip-25.0.0">turnip-25.0.0 (Snapdragon 865/870/730)</option>
                  <option value="turnip-24.1.0">turnip-24.1.0 (Adreno 6xx Legacy)</option>
                  <option value="None (Mali GPU)">None (Mali GPU)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">DXVK (DirectX 9/11) Version</label>
                <select
                  value={config.dxvkVersion}
                  onChange={(e) => setConfig({ ...config, dxvkVersion: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="dxvk-2.6.1">dxvk-2.6.1 (Latest D3D11 - System Vulkan)</option>
                  <option value="dxvk-2.5.2">dxvk-2.5.2 (High Stability)</option>
                  <option value="dxvk-2.3.1">dxvk-2.3.1 (PowerVR Recommended)</option>
                  <option value="dxvk-1.11.1-sareek">dxvk-1.11.1-sareek (Sareek Async Mod - Zero Stutter)</option>
                  <option value="dxvk-1.7.2">dxvk-1.7.2 (DirectX 9 Retro Specialist)</option>
                  <option value="wined3d-10.0">wined3d-10.0 (OpenGL Backend)</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Box64 Preset</label>
                <select
                  value={config.box64Preset}
                  onChange={(e) => setConfig({ ...config, box64Preset: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="Stability">Stability (Recommended for Tensor G5 / 16k)</option>
                  <option value="Performance">Performance (Max Dynarec Speed)</option>
                  <option value="Compatibility">Compatibility (Safe Page Boundaries)</option>
                  <option value="Default">Default</option>
                </select>
              </div>
            </div>
          </div>

          {/* Audio Engine & Latency */}
          <div className="space-y-3 border-b border-slate-800 pb-4">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Volume2 className="w-4 h-4 text-cyan-400" />
              <span>Audio Driver & ALSA Buffer Tuning</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <label className="block text-slate-400 mb-1">Audio Subsystem</label>
                <select
                  value={config.audioDriver}
                  onChange={(e) => setConfig({ ...config, audioDriver: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
                >
                  <option value="ALSA">ALSA (Low-latency Android aserver)</option>
                  <option value="PulseAudio">PulseAudio (Generic compatibility)</option>
                </select>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-slate-400">Audio Latency Buffer</label>
                  <span className="font-mono text-cyan-400">{config.audioLatencyMs}ms</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="140"
                  step="10"
                  value={config.audioLatencyMs}
                  onChange={(e) => setConfig({ ...config, audioLatencyMs: parseInt(e.target.value) })}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
                <span className="text-[10px] text-slate-500">
                  Tip: Use 90ms for Unreal/retro games to fix crackling audio.
                </span>
              </div>
            </div>
          </div>

          {/* Environment Variables & Exec Arguments */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Environment Variables & Exec Flags</span>
              </h3>
              <button
                onClick={handleAddEnvVar}
                className="flex items-center gap-1 px-2.5 py-1 text-xs rounded bg-slate-800 text-slate-200 hover:text-white border border-slate-700"
              >
                <Plus className="w-3 h-3 text-cyan-400" />
                <span>Add Variable</span>
              </button>
            </div>

            {/* Env vars rows */}
            <div className="space-y-2">
              {config.envVars.map((env, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs font-mono">
                  <input
                    type="text"
                    placeholder="VAR_NAME (e.g. MESA_EXTENSION_MAX_YEAR)"
                    value={env.key}
                    onChange={(e) => handleUpdateEnvVar(idx, e.target.value, env.value)}
                    className="flex-1 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-cyan-300"
                  />
                  <span className="text-slate-500">=</span>
                  <input
                    type="text"
                    placeholder="VALUE (e.g. 2003)"
                    value={env.value}
                    onChange={(e) => handleUpdateEnvVar(idx, env.key, e.target.value)}
                    className="w-32 bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200"
                  />
                  <button
                    onClick={() => handleRemoveEnvVar(idx)}
                    className="p-1.5 text-rose-400 hover:bg-rose-500/10 rounded"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Exec Arguments */}
            <div className="text-xs">
              <label className="block text-slate-400 mb-1">Shortcut Exec Arguments</label>
              <input
                type="text"
                placeholder="e.g., -force-gfx-direct -dx11"
                value={config.execArgs}
                onChange={(e) => setConfig({ ...config, execArgs: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
              />
            </div>

          </div>

        </div>

        {/* Live Export & Preview Card */}
        <div className="lg:col-span-5 space-y-4">
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h4 className="font-bold text-sm text-white flex items-center gap-2">
                <Terminal className="w-4 h-4 text-cyan-400" />
                <span>Container Preset Export</span>
              </h4>
              <div className="flex items-center gap-2">
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied' : 'Copy'}</span>
                </button>
                <button
                  onClick={handleDownload}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download</span>
                </button>
              </div>
            </div>

            {/* Formatted Code Box */}
            <pre className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-96">
              {generateConfigText()}
            </pre>

            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80 text-[11px] text-slate-400 space-y-1">
              <span className="font-semibold text-slate-300 block">Winlator Import Tip:</span>
              <p>
                In the Winlator Android app, open Container Settings and replicate these values for the selected game shortcut to achieve peak framerates and avoid crashes.
              </p>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
};
