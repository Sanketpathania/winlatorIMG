export type ElementType = 'BUTTON' | 'D_PAD' | 'STICK' | 'TRACKPAD';
export type ElementShape = 'CIRCLE' | 'RECT' | 'ROUND_RECT';

export interface ControlElement {
  type: ElementType | string;
  shape: ElementShape | string;
  bindings: string[];
  scale: number;
  x: number;
  y: number;
  toggleSwitch: boolean;
  text: string;
  iconId: number;
}

export interface InputControlProfile {
  id: number;
  name: string;
  cursorSpeed: number;
  elements: ControlElement[];
  genre?: string;
  tags?: string[];
}

export interface InstallableComponent {
  id: string;
  name: string;
  category: 'box64' | 'dxvk' | 'turnip' | 'vkd3d' | 'wined3d' | 'powervr';
  version: string;
  filename: string;
  size: string;
  description: string;
  releaseYear: string;
  features: string[];
  recommendedFor: string[];
}

export interface ContainerConfig {
  name: string;
  screenResolution: string;
  graphicsDriver: string;
  dxvkVersion: string;
  vkd3dVersion: string;
  box64Preset: 'Performance' | 'Compatibility' | 'Stability' | 'Default';
  box64Version: string;
  turnipVersion: string;
  audioDriver: 'ALSA' | 'PulseAudio';
  audioLatencyMs: number;
  envVars: Array<{ key: string; value: string }>;
  execArgs: string;
  forceFullscreen: boolean;
  wineMono: boolean;
  pageSize16k?: boolean;
}

export interface TroubleshootingTip {
  id: string;
  title: string;
  category: 'graphics' | 'audio' | 'stability' | 'performance' | 'dotnet' | 'powervr';
  symptom: string;
  solution: string;
  steps: string[];
  suggestedEnvVars?: Record<string, string>;
  suggestedConfig?: Partial<ContainerConfig>;
}
