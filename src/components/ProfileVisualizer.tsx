import React, { useState, useRef } from 'react';
import { ControlElement, InputControlProfile } from '../types';
import { 
  Play, 
  Edit3, 
  Plus, 
  Trash2, 
  Sliders, 
  Layers,
  Copy,
  Info
} from 'lucide-react';

interface ProfileVisualizerProps {
  profile: InputControlProfile;
  onChange: (updatedProfile: InputControlProfile) => void;
  onExport: () => void;
}

const COMMON_KEYS = [
  'KEY_W', 'KEY_A', 'KEY_S', 'KEY_D', 'KEY_SPACE', 'KEY_E', 'KEY_R', 'KEY_F',
  'KEY_Q', 'KEY_C', 'KEY_Z', 'KEY_X', 'KEY_V', 'KEY_T', 'KEY_G', 'KEY_M', 'KEY_TAB',
  'KEY_ESC', 'KEY_ENTER', 'KEY_SHIFT_L', 'KEY_CTRL_L', 'KEY_ALT_L',
  'KEY_UP', 'KEY_DOWN', 'KEY_LEFT', 'KEY_RIGHT',
  'KEY_1', 'KEY_2', 'KEY_3', 'KEY_4',
  'MOUSE_LEFT_BUTTON', 'MOUSE_RIGHT_BUTTON', 'MOUSE_MIDDLE_BUTTON', 'NONE'
];

export const ProfileVisualizer: React.FC<ProfileVisualizerProps> = ({
  profile,
  onChange,
  onExport,
}) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(0);
  const [aspectRatio, setAspectRatio] = useState<'16:9' | '20:9' | '4:3'>('16:9');
  const [isTestMode, setIsTestMode] = useState(false);
  const [activeInputs, setActiveInputs] = useState<string[]>([]);
  
  const screenRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);

  // Aspect ratio styling
  const aspectClass = {
    '16:9': 'aspect-[16/9] max-w-4xl',
    '20:9': 'aspect-[20/9] max-w-5xl',
    '4:3': 'aspect-[4/3] max-w-3xl',
  }[aspectRatio];

  const selectedElement = selectedIndex !== null ? profile.elements[selectedIndex] : null;

  // Handle element selection
  const handleSelectElement = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!isTestMode) {
      setSelectedIndex(index);
    }
  };

  // Update selected element property
  const updateSelectedElement = (partial: Partial<ControlElement>) => {
    if (selectedIndex === null) return;
    const nextElements = [...profile.elements];
    nextElements[selectedIndex] = { ...nextElements[selectedIndex], ...partial };
    onChange({ ...profile, elements: nextElements });
  };

  // Add a new element
  const handleAddElement = (type: 'BUTTON' | 'D_PAD' | 'STICK' | 'TRACKPAD') => {
    const newElement: ControlElement = {
      type,
      shape: type === 'STICK' || type === 'D_PAD' ? 'CIRCLE' : 'CIRCLE',
      bindings: type === 'D_PAD' || type === 'STICK' ? ['KEY_W', 'KEY_D', 'KEY_S', 'KEY_A'] : ['KEY_E', 'NONE', 'NONE', 'NONE'],
      scale: 1.0,
      x: 0.5,
      y: 0.5,
      toggleSwitch: false,
      text: type === 'BUTTON' ? 'Action' : '',
      iconId: 0,
    };
    const nextElements = [...profile.elements, newElement];
    onChange({ ...profile, elements: nextElements });
    setSelectedIndex(nextElements.length - 1);
  };

  // Duplicate selected element
  const handleDuplicate = () => {
    if (selectedIndex === null || !selectedElement) return;
    const cloned: ControlElement = {
      ...selectedElement,
      x: Math.min(0.9, selectedElement.x + 0.05),
      y: Math.min(0.9, selectedElement.y + 0.05),
    };
    const nextElements = [...profile.elements, cloned];
    onChange({ ...profile, elements: nextElements });
    setSelectedIndex(nextElements.length - 1);
  };

  // Delete selected element
  const handleDelete = () => {
    if (selectedIndex === null) return;
    const nextElements = profile.elements.filter((_, i) => i !== selectedIndex);
    onChange({ ...profile, elements: nextElements });
    setSelectedIndex(nextElements.length > 0 ? 0 : null);
  };

  // Mouse Drag on canvas for repositioning
  const handleScreenMouseDown = (e: React.MouseEvent) => {
    if (isTestMode || selectedIndex === null || !screenRef.current) return;
    
    // Check if clicked inside screen
    const rect = screenRef.current.getBoundingClientRect();
    const clickX = (e.clientX - rect.left) / rect.width;
    const clickY = (e.clientY - rect.top) / rect.height;

    // Check if clicked close to selected element
    const el = profile.elements[selectedIndex];
    if (el) {
      const dist = Math.hypot(clickX - el.x, clickY - el.y);
      if (dist < 0.15 * el.scale) {
        isDraggingRef.current = true;
      }
    }
  };

  const handleScreenMouseMove = (e: React.MouseEvent) => {
    if (!isDraggingRef.current || isTestMode || selectedIndex === null || !screenRef.current) return;
    const rect = screenRef.current.getBoundingClientRect();
    const newX = Math.max(0.04, Math.min(0.96, (e.clientX - rect.left) / rect.width));
    const newY = Math.max(0.04, Math.min(0.96, (e.clientY - rect.top) / rect.height));

    updateSelectedElement({
      x: Number(newX.toFixed(4)),
      y: Number(newY.toFixed(4)),
    });
  };

  const handleScreenMouseUp = () => {
    isDraggingRef.current = false;
  };

  // Test mode interactive actions
  const handleElementTestDown = (element: ControlElement, e: React.MouseEvent | React.TouchEvent) => {
    if (!isTestMode) return;
    e.stopPropagation();

    const activeKeys = element.bindings.filter(b => b && b !== 'NONE');
    setActiveInputs(prev => Array.from(new Set([...prev, ...activeKeys])));
  };

  const handleElementTestUp = (element: ControlElement) => {
    if (!isTestMode) return;
    const releasedKeys = element.bindings;
    setActiveInputs(prev => prev.filter(k => !releasedKeys.includes(k)));
  };

  return (
    <div className="space-y-6">
      
      {/* Top Profile Summary Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white tracking-wide">{profile.name}</h2>
            <span className="text-xs px-2.5 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 font-mono">
              ID: {profile.id}
            </span>
            {profile.genre && (
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                {profile.genre}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Total on-screen elements: <span className="text-slate-200 font-medium">{profile.elements.length}</span> • Cursor Speed: <span className="text-slate-200 font-medium">{profile.cursorSpeed}x</span>
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          
          {/* Aspect Ratio Switcher */}
          <div className="flex items-center bg-slate-950 p-1 rounded-lg border border-slate-800 text-xs">
            {(['16:9', '20:9', '4:3'] as const).map(ratio => (
              <button
                key={ratio}
                onClick={() => setAspectRatio(ratio)}
                className={`px-2.5 py-1 rounded font-medium transition-colors ${
                  aspectRatio === ratio
                    ? 'bg-cyan-500/20 text-cyan-300 font-semibold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {ratio}
              </button>
            ))}
          </div>

          {/* Test / Edit Mode Toggle */}
          <button
            id="toggle-test-mode"
            onClick={() => {
              setIsTestMode(!isTestMode);
              setActiveInputs([]);
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
              isTestMode
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20 ring-2 ring-amber-400/50'
                : 'bg-slate-800 text-slate-300 hover:bg-slate-700 hover:text-white border border-slate-700'
            }`}
          >
            {isTestMode ? <Play className="w-3.5 h-3.5 fill-current" /> : <Edit3 className="w-3.5 h-3.5" />}
            <span>{isTestMode ? 'Test Mode Active' : 'Edit Mode'}</span>
          </button>

          {/* Add Control Button */}
          {!isTestMode && (
            <div className="flex items-center gap-1">
              <button
                onClick={() => handleAddElement('BUTTON')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white transition-colors"
              >
                <Plus className="w-3 h-3 text-cyan-400" />
                <span>Button</span>
              </button>
              <button
                onClick={() => handleAddElement('D_PAD')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white transition-colors"
              >
                <Plus className="w-3 h-3 text-cyan-400" />
                <span>D-Pad</span>
              </button>
              <button
                onClick={() => handleAddElement('STICK')}
                className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 hover:text-white transition-colors"
              >
                <Plus className="w-3 h-3 text-cyan-400" />
                <span>Stick</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Canvas & Inspector Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Virtual Android Phone Screen Canvas */}
        <div className="lg:col-span-8 flex flex-col items-center">
          
          <div className="w-full bg-slate-900/60 p-4 rounded-2xl border border-slate-800/80 shadow-2xl flex flex-col items-center">
            
            {/* Phone Bezel Header Indicator */}
            <div className="w-full flex items-center justify-between pb-2 text-[11px] text-slate-500 font-mono">
              <span>Android Touch Display • {aspectRatio}</span>
              <span className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                {isTestMode ? 'Touch Emulation Mode' : 'Drag Element or Click to Select'}
              </span>
            </div>

            {/* Screen Box */}
            <div
              ref={screenRef}
              onMouseDown={handleScreenMouseDown}
              onMouseMove={handleScreenMouseMove}
              onMouseUp={handleScreenMouseUp}
              className={`w-full ${aspectClass} relative bg-gradient-to-b from-slate-950 to-slate-900 rounded-xl overflow-hidden border border-slate-700/60 shadow-inner select-none cursor-crosshair`}
              style={{
                backgroundImage: `radial-gradient(circle at 50% 50%, rgba(15, 23, 42, 0.9) 0%, rgba(2, 6, 23, 1) 100%), linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
                backgroundSize: '100% 100%, 40px 40px, 40px 40px',
              }}
            >
              
              {/* Center Game Placeholder Watermark */}
              <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none opacity-20">
                <span className="text-3xl font-black tracking-widest uppercase text-slate-300 font-mono">
                  {profile.name}
                </span>
                <span className="text-xs text-slate-400 mt-1">Windows Emulation Canvas</span>
              </div>

              {/* Render All Touch Control Elements */}
              {profile.elements.map((element, idx) => {
                const isSelected = selectedIndex === idx && !isTestMode;
                const baseSize = 64 * element.scale;
                
                // Position calculations (centered on x, y)
                const leftPct = element.x * 100;
                const topPct = element.y * 100;

                // Primary label or binding text
                const primaryKey = element.bindings[0]?.replace('KEY_', '').replace('MOUSE_', '') || element.text || 'BTN';
                const isPressed = element.bindings.some(b => activeInputs.includes(b));

                return (
                  <div
                    key={idx}
                    id={`control-element-${idx}`}
                    onClick={(e) => handleSelectElement(idx, e)}
                    onMouseDown={(e) => handleElementTestDown(element, e)}
                    onMouseUp={() => handleElementTestUp(element)}
                    onTouchStart={(e) => handleElementTestDown(element, e)}
                    onTouchEnd={() => handleElementTestUp(element)}
                    style={{
                      left: `${leftPct}%`,
                      top: `${topPct}%`,
                      width: `${baseSize}px`,
                      height: `${baseSize}px`,
                      transform: 'translate(-50%, -50%)',
                    }}
                    className={`absolute flex flex-col items-center justify-center transition-transform cursor-pointer select-none ${
                      element.shape === 'CIRCLE'
                        ? 'rounded-full'
                        : element.shape === 'ROUND_RECT'
                        ? 'rounded-xl'
                        : 'rounded-md'
                    } ${
                      isSelected
                        ? 'ring-2 ring-cyan-400 shadow-lg shadow-cyan-500/30 z-30'
                        : 'hover:ring-1 hover:ring-slate-400/50 z-20'
                    } ${
                      isPressed
                        ? 'bg-cyan-400 text-slate-950 scale-95 shadow-cyan-400/50'
                        : 'bg-slate-900/80 backdrop-blur border border-cyan-500/40 text-cyan-200'
                    }`}
                  >
                    
                    {/* D-PAD Visualization */}
                    {element.type === 'D_PAD' && (
                      <div className="relative w-full h-full flex items-center justify-center">
                        <div className="w-1/3 h-full bg-cyan-500/10 absolute rounded-sm border border-cyan-500/20"></div>
                        <div className="h-1/3 w-full bg-cyan-500/10 absolute rounded-sm border border-cyan-500/20"></div>
                        <div className="text-[10px] font-bold text-cyan-300 z-10 font-mono">D-PAD</div>
                        <span className="absolute top-1 text-[8px] text-cyan-400/80">▲</span>
                        <span className="absolute bottom-1 text-[8px] text-cyan-400/80">▼</span>
                        <span className="absolute left-1 text-[8px] text-cyan-400/80">◀</span>
                        <span className="absolute right-1 text-[8px] text-cyan-400/80">▶</span>
                      </div>
                    )}

                    {/* Analog Stick Visualization */}
                    {element.type === 'STICK' && (
                      <div className="relative w-full h-full rounded-full border-2 border-dashed border-cyan-500/40 flex items-center justify-center bg-slate-950/40">
                        <div className="w-1/2 h-1/2 rounded-full bg-cyan-500/30 border border-cyan-400/70 shadow-sm flex items-center justify-center">
                          <div className="w-2 h-2 rounded-full bg-cyan-300"></div>
                        </div>
                      </div>
                    )}

                    {/* Standard Action Button */}
                    {element.type === 'BUTTON' && (
                      <div className="text-center px-1">
                        <span className={`font-black tracking-tight leading-none ${element.scale < 0.9 ? 'text-[10px]' : 'text-xs'}`}>
                          {element.text || primaryKey}
                        </span>
                        {element.toggleSwitch && (
                          <span className="block text-[7px] text-amber-400 uppercase font-mono tracking-tighter">
                            Toggle
                          </span>
                        )}
                      </div>
                    )}

                    {/* Trackpad */}
                    {element.type === 'TRACKPAD' && (
                      <div className="text-[10px] font-mono text-cyan-300 flex items-center gap-1">
                        <span>TOUCHPAD</span>
                      </div>
                    )}

                  </div>
                );
              })}

            </div>

            {/* Live Input Logger Stream (for test mode) */}
            {isTestMode && (
              <div className="w-full mt-4 p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-cyan-400 font-semibold">Active Press:</span>
                  {activeInputs.length > 0 ? (
                    <div className="flex items-center gap-1 flex-wrap">
                      {activeInputs.map((key, i) => (
                        <span key={i} className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono font-bold text-[11px] border border-cyan-500/40">
                          {key}
                        </span>
                      ))}
                    </div>
                  ) : (
                    <span className="text-slate-500 italic">Tap or click any virtual button on screen...</span>
                  )}
                </div>

                <button 
                  onClick={() => setActiveInputs([])}
                  className="text-[10px] text-slate-500 hover:text-slate-300"
                >
                  Reset Keys
                </button>
              </div>
            )}

          </div>

        </div>

        {/* Inspector & Controls Editor Panel */}
        <div className="lg:col-span-4 space-y-4">
          
          {selectedElement && !isTestMode ? (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
              
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Sliders className="w-4 h-4 text-cyan-400" />
                  <h3 className="font-bold text-sm text-white">Element Inspector</h3>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={handleDuplicate}
                    title="Duplicate Element"
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                  <button
                    onClick={handleDelete}
                    title="Delete Element"
                    className="p-1.5 rounded-lg text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Element Type & Shape */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Type</label>
                  <select
                    value={selectedElement.type}
                    onChange={(e) => updateSelectedElement({ type: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="BUTTON">BUTTON</option>
                    <option value="D_PAD">D_PAD</option>
                    <option value="STICK">STICK</option>
                    <option value="TRACKPAD">TRACKPAD</option>
                  </select>
                </div>

                <div>
                  <label className="block text-slate-400 font-medium mb-1">Shape</label>
                  <select
                    value={selectedElement.shape}
                    onChange={(e) => updateSelectedElement({ shape: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  >
                    <option value="CIRCLE">CIRCLE</option>
                    <option value="ROUND_RECT">ROUND_RECT</option>
                    <option value="RECT">RECT</option>
                  </select>
                </div>
              </div>

              {/* Label & Toggle Switch */}
              <div className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Display Text / Label</label>
                  <input
                    type="text"
                    value={selectedElement.text}
                    placeholder="e.g., Jump, Attack, Sprint"
                    onChange={(e) => updateSelectedElement({ text: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div className="flex items-center justify-between p-2.5 bg-slate-950 rounded-lg border border-slate-800">
                  <div>
                    <span className="text-slate-200 font-medium block">Sticky Toggle Switch</span>
                    <span className="text-[10px] text-slate-500">Maintains pressed state after tap (sprint/crouch)</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={selectedElement.toggleSwitch}
                    onChange={(e) => updateSelectedElement({ toggleSwitch: e.target.checked })}
                    className="w-4 h-4 accent-cyan-500 rounded cursor-pointer"
                  />
                </div>
              </div>

              {/* Scale Slider */}
              <div className="space-y-1.5 text-xs">
                <div className="flex items-center justify-between">
                  <label className="text-slate-400 font-medium">Scale (Size)</label>
                  <span className="font-mono text-cyan-400">{selectedElement.scale.toFixed(2)}x</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.8"
                  step="0.05"
                  value={selectedElement.scale}
                  onChange={(e) => updateSelectedElement({ scale: parseFloat(e.target.value) })}
                  className="w-full accent-cyan-500 cursor-pointer"
                />
              </div>

              {/* Normalized Coordinates */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Position X (0-1)</label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={selectedElement.x}
                    onChange={(e) => updateSelectedElement({ x: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-400 font-medium mb-1">Position Y (0-1)</label>
                  <input
                    type="number"
                    min="0"
                    max="1"
                    step="0.01"
                    value={selectedElement.y}
                    onChange={(e) => updateSelectedElement({ y: parseFloat(e.target.value) || 0 })}
                    className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              {/* Key Bindings */}
              <div className="space-y-2 text-xs">
                <label className="block text-slate-400 font-medium">
                  Assigned Key / Mouse Binding
                </label>
                
                <select
                  value={selectedElement.bindings[0] || 'NONE'}
                  onChange={(e) => {
                    const newBindings = [...selectedElement.bindings];
                    newBindings[0] = e.target.value;
                    updateSelectedElement({ bindings: newBindings });
                  }}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-2 text-slate-200 font-mono focus:outline-none focus:border-cyan-500"
                >
                  {COMMON_KEYS.map((k) => (
                    <option key={k} value={k}>
                      {k}
                    </option>
                  ))}
                </select>

                {/* Quick select tags */}
                <div className="pt-2">
                  <span className="text-[10px] text-slate-500 block mb-1">Quick Select Binding:</span>
                  <div className="flex flex-wrap gap-1">
                    {['MOUSE_LEFT_BUTTON', 'MOUSE_RIGHT_BUTTON', 'KEY_SPACE', 'KEY_E', 'KEY_R', 'KEY_SHIFT_L', 'KEY_ESC', 'KEY_TAB'].map((k) => (
                      <button
                        key={k}
                        type="button"
                        onClick={() => {
                          const newBindings = [...selectedElement.bindings];
                          newBindings[0] = k;
                          updateSelectedElement({ bindings: newBindings });
                        }}
                        className={`text-[10px] px-1.5 py-0.5 rounded font-mono border transition-colors ${
                          selectedElement.bindings[0] === k
                            ? 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40 font-bold'
                            : 'bg-slate-950 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-slate-200'
                        }`}
                      >
                        {k.replace('KEY_', '').replace('MOUSE_', '')}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 text-center space-y-3">
              <Info className="w-8 h-8 text-slate-500 mx-auto" />
              <h4 className="text-sm font-semibold text-slate-300">
                {isTestMode ? 'Test Mode Active' : 'No Element Selected'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isTestMode
                  ? 'Click and tap on-screen controls in the simulated view to test button responses and check key outputs.'
                  : 'Click on any virtual button, D-Pad, or analog stick on the display canvas to customize its coordinates, shape, bindings, and size.'}
              </p>
            </div>
          )}

          {/* Profile Details & Metadata Box */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 text-xs">
            <h4 className="font-semibold text-slate-200 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-cyan-400" />
              <span>Profile Settings</span>
            </h4>

            <div>
              <label className="block text-slate-400 mb-1">Profile Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => onChange({ ...profile, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-200 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="space-y-1">
              <div className="flex items-center justify-between">
                <label className="text-slate-400">Cursor / Touch Sensitivity</label>
                <span className="font-mono text-cyan-400">{profile.cursorSpeed}x</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="2.5"
                step="0.05"
                value={profile.cursorSpeed}
                onChange={(e) => onChange({ ...profile, cursorSpeed: parseFloat(e.target.value) })}
                className="w-full accent-cyan-500 cursor-pointer"
              />
            </div>

            <button
              onClick={onExport}
              className="w-full py-2 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-semibold rounded-lg shadow-md transition-all text-xs flex items-center justify-center gap-1.5"
            >
              <span>Download {profile.name}.icp for Android</span>
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
