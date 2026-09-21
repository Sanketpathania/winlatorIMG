import { TroubleshootingTip } from '../types';

export const TROUBLESHOOTING_TIPS: TroubleshootingTip[] = [
  {
    id: 'pixel-10-powervr-setup',
    title: 'Pixel 10 Pro XL / Tensor G5 (PowerVR DXT 48-1536) Configuration Guide',
    category: 'powervr',
    symptom: 'Instant crash, black screen, or "Vulkan device not supported" when attempting to run Winlator on Google Pixel 10 Pro XL (Tensor G5).',
    solution: 'Turnip Mesa driver is Qualcomm-only. You must select System Vulkan (Android Native ICD) or WineD3D for Imagination PowerVR DXT architecture, plus enable 16KB memory page alignment.',
    steps: [
      'In Container Settings -> Graphics Driver, choose "System Vulkan (PowerVR DXT / Native Android)" or "WineD3D (OpenGL)". DO NOT choose Turnip.',
      'Set DXVK to version 2.6.1 or 2.3.1 (which binds directly to Android /system/lib64/libvulkan.so).',
      'In Box64 settings, select Box64 v0.3.7 (16k Edition) and set Preset to "Stability".',
      'Under Environment Variables, add: BOX64_DYNAREC_PAGE_SIZE = 16384, BOX64_DYNAREC_SAFE = 1, and DXVK_FILTER_DEVICE_NAME = PowerVR',
      'Set Screen Resolution to 1280x720 (or 1600x720 20:9) with Force Fullscreen enabled to maximize FPS without thermal throttling.'
    ],
    suggestedEnvVars: {
      BOX64_DYNAREC_PAGE_SIZE: '16384',
      BOX64_DYNAREC_SAFE: '1',
      DXVK_ASYNC: '1',
      DXVK_FILTER_DEVICE_NAME: 'PowerVR',
      DXVK_HUD: 'fps,gpuload'
    },
    suggestedConfig: {
      graphicsDriver: 'System Vulkan (PowerVR DXT / Tensor G5)',
      turnipVersion: 'None (PowerVR DXT GPU)',
      dxvkVersion: 'dxvk-2.6.1',
      box64Preset: 'Stability',
      box64Version: 'box64-0.3.7 (16KB Page Support)',
      screenResolution: '1280x720',
      audioLatencyMs: 40,
      pageSize16k: true
    }
  },
  {
    id: '16kb-page-size-crash',
    title: '16KB Kernel Page Size Error (mmap / SIGSEGV on Android 15 & 16)',
    category: 'powervr',
    symptom: 'Winlator container fails to start, showing "mmap: Invalid argument", "Illegal Instruction", or instant SIGSEGV segmentation fault on Google Pixel 8/9/10 devices running 16KB page kernels.',
    solution: 'Configure Box64 Dynarec to respect 16KB memory page granularity instead of legacy 4KB pages.',
    steps: [
      'Open Winlator Container Settings -> Environment Variables.',
      'Add variable: BOX64_DYNAREC_PAGE_SIZE = 16384',
      'Add variable: BOX64_PAGE_SIZE = 16k',
      'Add variable: BOX64_DYNAREC_BIGBLOCK = 0 (prevents dynarec from spanning invalid page boundaries)',
      'Ensure Box64 preset is set to Stability or Compatibility.'
    ],
    suggestedEnvVars: {
      BOX64_DYNAREC_PAGE_SIZE: '16384',
      BOX64_PAGE_SIZE: '16k',
      BOX64_DYNAREC_BIGBLOCK: '0',
      BOX64_DYNAREC_SAFE: '1'
    },
    suggestedConfig: {
      box64Preset: 'Stability',
      pageSize16k: true
    }
  },
  {
    id: 'turnip-powervr-incompatibility',
    title: 'Turnip Driver Fatal Crash on Non-Snapdragon (PowerVR / Mali)',
    category: 'graphics',
    symptom: 'Logcat shows "vkCreateInstance failed: VK_ERROR_INCOMPATIBLE_DRIVER" when Turnip Mesa Vulkan is selected on Pixel 10 Pro XL.',
    solution: 'Turnip is hardcoded to Qualcomm Adreno hardware registers (a6xx/a7xx/a8xx). PowerVR DXT requires the Android Native Vulkan HAL.',
    steps: [
      'Edit your Winlator Container.',
      'Change "Graphics Driver" from Turnip to "System Vulkan (PowerVR DXT / Tensor G5)".',
      'Set Turnip Version to "None (PowerVR DXT GPU)".',
      'For DirectX 9/11 games, use DXVK 2.6.1 with DXVK_ASYNC=1.',
      'For DirectX 7/8 retro titles, use WineD3D (OpenGL).'
    ],
    suggestedConfig: {
      graphicsDriver: 'System Vulkan (PowerVR DXT / Tensor G5)',
      turnipVersion: 'None (PowerVR DXT GPU)'
    }
  },
  {
    id: 'unity-engine-crash',
    title: 'Unity Engine Games Crashing / Freezing',
    category: 'stability',
    symptom: 'Game crashes right at the splash screen or within 30 seconds of gameplay on games powered by Unity Engine.',
    solution: 'Change Box64 preset to "Stability" and pass the direct rendering executive argument.',
    steps: [
      'Open Winlator Container Settings -> Advanced Tab.',
      'Set Box64 Preset to "Stability" (or "Safe").',
      'In the Game Shortcut settings, add the Exec Argument: -force-gfx-direct',
      'Launch the game from the shortcut icon on your Winlator desktop.'
    ],
    suggestedEnvVars: {
      BOX64_DYNAREC: '1',
      BOX64_DYNAREC_SAFE: '1'
    },
    suggestedConfig: {
      box64Preset: 'Stability',
      execArgs: '-force-gfx-direct'
    }
  },
  {
    id: 'audio-crackling-lag',
    title: 'Audio Crackling, Stutter, or Out of Sync',
    category: 'audio',
    symptom: 'Game audio exhibits loud popping, robotic stutter, or falls behind video actions.',
    solution: 'Increase ALSA or PulseAudio buffer latency to 90ms or 120ms to allow smooth audio streaming without buffer underruns.',
    steps: [
      'Open Container Settings -> Sound / Audio tab.',
      'Select Audio Driver: ALSA (recommended for low overhead) or PulseAudio.',
      'Increase Audio Latency from default (30-40ms) to 90ms (or 100ms for older Unreal Engine games like Unreal Gold / Deus Ex).',
      'Restart the container to apply the ALSA server buffer.'
    ],
    suggestedConfig: {
      audioDriver: 'ALSA',
      audioLatencyMs: 90
    }
  },
  {
    id: 'mesa-year-limit',
    title: 'Older Games (2000-2006) Refuse to Open / Instant Black Screen',
    category: 'graphics',
    symptom: 'Older DirectX 8/9 games immediately terminate with "DirectX device creation failed" or black screens because Mesa reports too many modern OpenGL extensions.',
    solution: 'Limit Mesa reported extension support year to 2003 via environment variable.',
    steps: [
      'Open Container Settings -> Environment Variables.',
      'Add a new variable: Name = MESA_EXTENSION_MAX_YEAR, Value = 2003',
      'If using Turnip + DXVK, try switching DXVK version to 1.7.2 (DirectX 9 legacy branch).',
      'Save and run the game.'
    ],
    suggestedEnvVars: {
      MESA_EXTENSION_MAX_YEAR: '2003'
    },
    suggestedConfig: {
      dxvkVersion: '1.7.2'
    }
  },
  {
    id: 'dotnet-mono-installer',
    title: 'Application Requires .NET Framework / MSVC Runtime',
    category: 'dotnet',
    symptom: 'Error message popup saying ".NET Framework 4.0/4.5 is required to run this application" or "mscoree.dll not found".',
    solution: 'Install Wine Mono from the built-in Start Menu Installers.',
    steps: [
      'Launch your Winlator desktop container.',
      'Click Start Menu (bottom-left) -> System Tools -> Installers.',
      'Select and run "Wine Mono" to install the .NET runtime into the current Wine prefix.',
      'Optionally install "Wine Gecko" for embedded HTML views.'
    ],
    suggestedConfig: {
      wineMono: true
    }
  },
  {
    id: 'low-resolution-scaling',
    title: 'Low Resolution Games Not Filling Screen (Black Borders)',
    category: 'graphics',
    symptom: 'Games running at 800x600 or 1024x768 render in a tiny centered box on high-DPI phone screens.',
    solution: 'Enable "Force Fullscreen" in the individual Game Shortcut settings.',
    steps: [
      'Long-press or tap Edit on the game Shortcut on the Winlator home screen.',
      'Check the "Force Fullscreen" toggle.',
      'Set Container Screen Resolution to match your phone display aspect ratio (e.g., 1280x720 16:9 or 1920x1080).',
      'Save and start the game.'
    ],
    suggestedConfig: {
      forceFullscreen: true,
      screenResolution: '1280x720'
    }
  },
  {
    id: 'mali-mediatek-setup',
    title: 'MediaTek Dimensity / Mali GPU Configuration',
    category: 'performance',
    symptom: 'Turnip Vulkan driver fails to initialize or crashes with "Vulkan driver not found" on non-Snapdragon processors.',
    solution: 'Turnip only supports Qualcomm Adreno GPUs. Use WineD3D or VirGL for MediaTek/Exynos/Mali.',
    steps: [
      'Open Container Settings -> Graphics Driver.',
      'Change Graphics Driver from Turnip (Zink) to WineD3D or VirGL.',
      'Set WineD3D version to 10.0 or 7.8.',
      'Set Box64 preset to "Compatibility".'
    ],
    suggestedConfig: {
      graphicsDriver: 'WineD3D (OpenGL)',
      turnipVersion: 'None (Mali GPU)',
      box64Preset: 'Compatibility'
    }
  }
];
