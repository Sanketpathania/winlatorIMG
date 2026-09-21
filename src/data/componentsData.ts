import { InstallableComponent } from '../types';

export const COMPONENT_CATALOG: InstallableComponent[] = [
  // PowerVR DXT & System Vulkan (Pixel 10 Pro XL / Tensor G5)
  {
    id: 'powervr-vulkan-system',
    name: 'System Vulkan ICD (PowerVR DXT 48-1536 / Tensor G5)',
    category: 'powervr',
    version: '1.3.280',
    filename: 'system-vulkan-powervr.tzst',
    size: '2.1 MB',
    releaseYear: '2026',
    description: 'Native Android System Vulkan 1.3 ICD bridge for Imagination Technologies PowerVR DXT architecture (Google Pixel 10 / 10 Pro XL / Tensor G5). Bypasses Mesa Turnip for direct GPU ray-tracing and tile-based hardware access.',
    features: ['Direct PowerVR DXT-48-1536 GPU acceleration', 'Hardware Ray Tracing (Photon Architecture) stubs', 'Native Android 15/16 libvulkan.so pass-through', 'Full Vulkan 1.3 & VK_KHR_dynamic_rendering support'],
    recommendedFor: ['Google Pixel 10 Pro XL (Tensor G5)', 'Imagination PowerVR DXT-48-1536 & DXT-72-2304', 'DirectX 9/11 titles via DXVK', 'Vulkan native PC ports']
  },
  {
    id: 'box64-0.3.7-16k',
    name: 'Box64 v0.3.7 (16KB Page Size Edition - Pixel 10 Pro XL)',
    category: 'box64',
    version: '0.3.7-16k',
    filename: 'box64-0.3.7-16k.tzst',
    size: '4.3 MB',
    releaseYear: '2026',
    description: 'Specialized 16KB memory page size build of Box64 Dynarec for Android 15/16 Linux kernels on Google Pixel 10 Pro XL (Cortex-X925 / A725). Eliminates mmap page misalignment SIGSEGV crashes.',
    features: ['16KB kernel page size native alignment', 'ARMv9.2-A Dynarec optimizations for Cortex-X925', 'BOX64_DYNAREC_PAGE_SIZE=16384 auto-bind', 'SysV shared memory 16k page patch'],
    recommendedFor: ['Google Pixel 10 Pro XL (Android 15 / Android 16 with 16k pages)', 'Tensor G5 SoC', 'GTA 5', 'Skyrim', 'Unity titles on 16k kernels']
  },

  // Box64 Packages
  {
    id: 'box64-0.3.7',
    name: 'Box64 v0.3.7 (Latest)',
    category: 'box64',
    version: '0.3.7',
    filename: 'box64-0.3.7.tzst',
    size: '4.2 MB',
    releaseYear: '2024',
    description: 'Linux x86_64 Userspace Emulator for ARM64 with upgraded Dynarec stability, better AVX/SSE4 emulation, and optimized memory page handling.',
    features: ['ARM64 Native Dynarec', 'Enhanced SSE4.2 & AVX translations', 'Multi-threading synchronization fixes', 'Lower overhead syscalls'],
    recommendedFor: ['Modern 64-bit Windows titles', 'GTA 5', 'Skyrim Special Edition', 'The Witcher 3', 'Cyberpunk 2077 (experimental)']
  },
  {
    id: 'box64-0.3.5',
    name: 'Box64 v0.3.5',
    category: 'box64',
    version: '0.3.5',
    filename: 'box64-0.3.5.tzst',
    size: '3.9 MB',
    releaseYear: '2024',
    description: 'Stable Box64 build with proven compatibility across mid-generation DirectX 9/11 titles.',
    features: ['Stable Dynarec engine', 'Direct thread local storage support', 'Solid backward compatibility'],
    recommendedFor: ['Fallout 3 / New Vegas', 'Mass Effect 2', 'Dark Souls 2', 'Far Cry 4']
  },
  {
    id: 'box64-0.3.3',
    name: 'Box64 v0.3.3',
    category: 'box64',
    version: '0.3.3',
    filename: 'box64-0.3.3.tzst',
    size: '3.7 MB',
    releaseYear: '2023',
    description: 'Legacy Box64 baseline release. Useful for legacy Qualcomm Snapdragon 845/855 devices or older custom ROMs.',
    features: ['Low memory footprint', 'Safe fallback execution mode'],
    recommendedFor: ['Older Adreno 6xx devices', 'Legacy game engines']
  },

  // Turnip (Mesa Vulkan)
  {
    id: 'turnip-26.0.3',
    name: 'Mesa Turnip Driver v26.0.3 (Bleeding Edge)',
    category: 'turnip',
    version: '26.0.3',
    filename: 'turnip-26.0.3.tzst',
    size: '14.8 MB',
    releaseYear: '2025',
    description: 'Open-source Qualcomm Adreno Vulkan driver by Mesa. Includes support for Adreno 7xx/8xx series with VK_KHR_fragment_shading_rate and enhanced buffer memory.',
    features: ['Adreno 730/740/750 & 8 Gen 3 support', 'Vulkan 1.3 compliance', 'Fast dynamic render passes', 'Direct GMEM tiling optimizations'],
    recommendedFor: ['Snapdragon 8 Gen 1 / 8+ Gen 1 / 8 Gen 2 / 8 Gen 3 / 8 Elite', 'High-end 3D emulation']
  },
  {
    id: 'turnip-25.0.0',
    name: 'Mesa Turnip Driver v25.0.0 (Rock Solid)',
    category: 'turnip',
    version: '25.0.0',
    filename: 'turnip-25.0.0.tzst',
    size: '13.9 MB',
    releaseYear: '2024',
    description: 'Highly stable Turnip release with broad game compatibility across Adreno 6xx and 7xx GPUs without vertex flickering.',
    features: ['Zero vertex jitter in DXVK', 'Extended descriptor buffer extension', 'Low memory leak footprint'],
    recommendedFor: ['Adreno 640/650/660/730', 'GTA 5', 'Skyrim', 'Bioshock', 'Sunset Overdrive']
  },
  {
    id: 'turnip-24.1.0',
    name: 'Mesa Turnip Driver v24.1.0',
    category: 'turnip',
    version: '24.1.0',
    filename: 'turnip-24.1.0.tzst',
    size: '12.5 MB',
    releaseYear: '2024',
    description: 'Reliable Turnip driver branch for older Snapdragon 855/860/865/870 chips.',
    features: ['Adreno 618-650 optimized', 'Conservative caching'],
    recommendedFor: ['Poco X3 Pro', 'Snapdragon 870 tablets', '2D/2.5D indie titles']
  },

  // DXVK (DirectX 9/10/11 -> Vulkan)
  {
    id: 'dxvk-2.6.1',
    name: 'DXVK v2.6.1 (Latest)',
    category: 'dxvk',
    version: '2.6.1',
    filename: 'dxvk-2.6.1.tzst',
    size: '8.4 MB',
    releaseYear: '2025',
    description: 'Vulkan-based translation layer for Direct3D 9/10/11. Includes memory optimizations and improved D3D11 dynamic resource allocation for mobile GPUs.',
    features: ['D3D9 / D3D10 / D3D11 full support', 'GPL (Graphics Pipeline Library) support', 'Async pipeline compilation support', 'Lower VRAM overhead'],
    recommendedFor: ['DirectX 11 games (GTA 5, Dark Souls 2, Far Cry 4, Prey)']
  },
  {
    id: 'dxvk-2.5.2',
    name: 'DXVK v2.5.2',
    category: 'dxvk',
    version: '2.5.2',
    filename: 'dxvk-2.5.2.tzst',
    size: '8.1 MB',
    releaseYear: '2024',
    description: 'Proven DXVK 2.5 series build with extensive game compatibility fixes and shader compiler improvements.',
    features: ['Shader cache acceleration', 'D3D9 float precision fixes'],
    recommendedFor: ['DirectX 10/11 games with shader stuttering']
  },
  {
    id: 'dxvk-2.3.1',
    name: 'DXVK v2.3.1',
    category: 'dxvk',
    version: '2.3.1',
    filename: 'dxvk-2.3.1.tzst',
    size: '7.8 MB',
    releaseYear: '2023',
    description: 'Stable DXVK release widely compatible with older Turnip driver versions.',
    features: ['Robust D3D11 render paths', 'Support for conservative driver features'],
    recommendedFor: ['Mid-range Adreno devices']
  },
  {
    id: 'dxvk-2.2',
    name: 'DXVK v2.2',
    category: 'dxvk',
    version: '2.2',
    filename: 'dxvk-2.2.tzst',
    size: '7.5 MB',
    releaseYear: '2023',
    description: 'Baseline 2.x branch for legacy devices requiring Vulkan 1.3.',
    features: ['D3D9 native query support'],
    recommendedFor: ['Snapdragon 865/870']
  },
  {
    id: 'dxvk-1.7.2',
    name: 'DXVK v1.7.2 (Legacy D3D9 Classic)',
    category: 'dxvk',
    version: '1.7.2',
    filename: 'dxvk-1.7.2.tzst',
    size: '5.6 MB',
    releaseYear: '2020',
    description: 'Best compatibility for older DirectX 9 titles that fail or exhibit black screens on DXVK 2.x.',
    features: ['DirectX 9 pure emulation', 'Works on Vulkan 1.1+ without advanced extensions'],
    recommendedFor: ['Fallout 3', 'Oblivion', 'FlatOut 2', 'Turok 2', 'Mass Effect 2']
  },
  {
    id: 'dxvk-1.4.2',
    name: 'DXVK v1.4.2',
    category: 'dxvk',
    version: '1.4.2',
    filename: 'dxvk-1.4.2.tzst',
    size: '4.8 MB',
    releaseYear: '2019',
    description: 'Legacy Direct3D 10/11 fallback layer for specific early 2010s titles.',
    features: ['Minimal Vulkan extension requirement'],
    recommendedFor: ['Old 32-bit Windows games']
  },
  {
    id: 'dxvk-0.96',
    name: 'DXVK v0.96 (Vintage Fallback)',
    category: 'dxvk',
    version: '0.96',
    filename: 'dxvk-0.96.tzst',
    size: '3.9 MB',
    releaseYear: '2019',
    description: 'Historical DXVK version for specific retro compatibility requirements.',
    features: ['Ultra-lightweight state tracker'],
    recommendedFor: ['Legacy debugging']
  },

  // VKD3D (DirectX 12 -> Vulkan)
  {
    id: 'vkd3d-3.0b',
    name: 'VKD3D-Proton v3.0b (DirectX 12 Next-Gen)',
    category: 'vkd3d',
    version: '3.0b',
    filename: 'vkd3d-3.0b.tzst',
    size: '9.8 MB',
    releaseYear: '2025',
    description: 'DirectX 12 to Vulkan translation library. Enables modern DX12-only Windows PC games on ARM64 Adreno devices.',
    features: ['DirectX 12 feature level 12_0 & 12_1', 'Raytracing API stubs', 'Root signature 1.1 support', 'SM 6.x shader translation'],
    recommendedFor: ['DirectX 12 titles', 'Sunset Overdrive', 'Final Fantasy Type-0 HD', 'Modern 64-bit games']
  },
  {
    id: 'vkd3d-2.14.1',
    name: 'VKD3D-Proton v2.14.1',
    category: 'vkd3d',
    version: '2.14.1',
    filename: 'vkd3d-2.14.1.tzst',
    size: '8.9 MB',
    releaseYear: '2024',
    description: 'Stable VKD3D release with high stability on Adreno 7xx GPUs and Turnip 24/25.',
    features: ['Resource binding optimizations', 'Dynamic constant buffer fix'],
    recommendedFor: ['DirectX 12 Windows games']
  },
  {
    id: 'vkd3d-2.12',
    name: 'VKD3D-Proton v2.12',
    category: 'vkd3d',
    version: '2.12',
    filename: 'vkd3d-2.12.tzst',
    size: '7.9 MB',
    releaseYear: '2023',
    description: 'Proven DirectX 12 baseline layer with conservative memory footprint.',
    features: ['Vulkan 1.3 pipeline bindings'],
    recommendedFor: ['Older Adreno 660 devices running DX12']
  },

  // WineD3D (DirectX -> OpenGL)
  {
    id: 'wined3d-10.0',
    name: 'WineD3D v10.0 (Latest OpenGL Backend)',
    category: 'wined3d',
    version: '10.0',
    filename: 'wined3d-10.0.tzst',
    size: '11.2 MB',
    releaseYear: '2025',
    description: 'DirectX to OpenGL translation layer from Wine 10. Best for Mali GPUs, non-Adreno chipsets (MediaTek Dimensity), or games incompatible with Vulkan.',
    features: ['DirectX 1 to 11 via OpenGL ES 3.2', 'Ideal for MediaTek / Mali / VirGL', 'DirectDraw & Direct3D 8/9 support'],
    recommendedFor: ['MediaTek Dimensity / Helio (Mali GPUs)', 'Exynos (Mali)', 'DirectX 7/8 retro games', 'Unepic', 'La Mulana']
  },
  {
    id: 'wined3d-7.8',
    name: 'WineD3D v7.8',
    category: 'wined3d',
    version: '7.8',
    filename: 'wined3d-7.8.tzst',
    size: '9.4 MB',
    releaseYear: '2022',
    description: 'Wine 7.8 OpenGL layer with excellent stability on older OpenGL ES 3.1/3.2 drivers.',
    features: ['DirectDraw acceleration', 'Fixed function pipeline emulation'],
    recommendedFor: ['Mid-range non-Snapdragon phones', 'Vintage Windows games']
  },
  {
    id: 'wined3d-4.21',
    name: 'WineD3D v4.21 (Retro D3D7/8 Specialist)',
    category: 'wined3d',
    version: '4.21',
    filename: 'wined3d-4.21.tzst',
    size: '6.7 MB',
    releaseYear: '2020',
    description: 'Specialized for DirectX 7, DirectX 8, and early 2000s legacy PC titles like Ultima Underworld, Star Wars Jedi Knight 2, and Hitman 2.',
    features: ['100% native fixed-function lighting', 'Zero modern shader overhead'],
    recommendedFor: ['Retro PC games (1998-2005)', 'Ultima Underworld', 'Hitman 2', 'Star Wars Jedi Knight 2']
  }
];
