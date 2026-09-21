import { InputControlProfile } from '../types';

export const INITIAL_PROFILES: InputControlProfile[] = [
  {
    id: 16,
    name: 'GTA 5',
    cursorSpeed: 1.0,
    genre: 'Open World Action',
    tags: ['3D Action', 'Shooter', 'Driving', 'Third Person'],
    elements: [
      { type: 'STICK', shape: 'CIRCLE', bindings: ['KEY_W', 'KEY_D', 'KEY_S', 'KEY_A'], scale: 1.1, x: 0.11, y: 0.73, toggleSwitch: false, text: 'Movement', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['MOUSE_LEFT_BUTTON', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.81, y: 0.73, toggleSwitch: false, text: 'Shoot', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_R', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.87, y: 0.60, toggleSwitch: false, text: 'Reload', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_F', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.87, y: 0.87, toggleSwitch: false, text: 'Enter Car', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_SPACE', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.93, y: 0.73, toggleSwitch: false, text: 'Jump/Brake', iconId: 0 },
      { type: 'BUTTON', shape: 'RECT', bindings: ['KEY_Q', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.82, y: 0.09, toggleSwitch: false, text: 'Cover', iconId: 0 },
      { type: 'BUTTON', shape: 'RECT', bindings: ['KEY_V', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.92, y: 0.09, toggleSwitch: false, text: 'Camera', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_DOWN', 'NONE', 'NONE', 'NONE'], scale: 0.75, x: 0.09, y: 0.44, toggleSwitch: false, text: 'Phone Down', iconId: 11 },
      { type: 'BUTTON', shape: 'RECT', bindings: ['KEY_SHIFT_L', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.08, y: 0.09, toggleSwitch: true, text: 'Sprint', iconId: 0 },
      { type: 'BUTTON', shape: 'RECT', bindings: ['KEY_ALT_L', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.18, y: 0.09, toggleSwitch: false, text: 'Ability', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_G', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.93, y: 0.44, toggleSwitch: false, text: 'Grenade', iconId: 0 },
      { type: 'BUTTON', shape: 'ROUND_RECT', bindings: ['KEY_ENTER', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.54, y: 0.91, toggleSwitch: false, text: 'Enter', iconId: 0 },
      { type: 'BUTTON', shape: 'ROUND_RECT', bindings: ['KEY_ESC', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.46, y: 0.91, toggleSwitch: false, text: 'Pause', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['MOUSE_RIGHT_BUTTON', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.25, y: 0.89, toggleSwitch: false, text: 'Aim', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_TAB', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.75, y: 0.89, toggleSwitch: false, text: 'Weapon Wheel', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_UP', 'NONE', 'NONE', 'NONE'], scale: 0.75, x: 0.09, y: 0.27, toggleSwitch: false, text: 'Phone Up', iconId: 9 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_RIGHT', 'NONE', 'NONE', 'NONE'], scale: 0.75, x: 0.13, y: 0.36, toggleSwitch: false, text: 'Phone Right', iconId: 10 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_LEFT', 'NONE', 'NONE', 'NONE'], scale: 0.75, x: 0.05, y: 0.36, toggleSwitch: false, text: 'Phone Left', iconId: 8 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_E', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.93, y: 0.27, toggleSwitch: false, text: 'Horn/Interact', iconId: 0 }
    ]
  },
  {
    id: 4,
    name: 'Skyrim',
    cursorSpeed: 1.35,
    genre: 'Action RPG',
    tags: ['RPG', 'Open World', 'First Person', 'Magic'],
    elements: [
      { type: 'D_PAD', shape: 'CIRCLE', bindings: ['KEY_W', 'KEY_D', 'KEY_S', 'KEY_A'], scale: 1.0, x: 0.10, y: 0.73, toggleSwitch: false, text: 'Move', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['MOUSE_LEFT_BUTTON', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.82, y: 0.73, toggleSwitch: false, text: 'Right Hand', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_Z', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.88, y: 0.60, toggleSwitch: false, text: 'Shout / Power', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_SPACE', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.88, y: 0.87, toggleSwitch: false, text: 'Jump', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_E', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.94, y: 0.73, toggleSwitch: false, text: 'Interact / Loot', iconId: 0 },
      { type: 'BUTTON', shape: 'RECT', bindings: ['KEY_T', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.83, y: 0.09, toggleSwitch: false, text: 'Wait', iconId: 0 },
      { type: 'BUTTON', shape: 'RECT', bindings: ['KEY_ALT_L', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.93, y: 0.09, toggleSwitch: true, text: 'Sprint', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['MOUSE_RIGHT_BUTTON', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.06, y: 0.44, toggleSwitch: false, text: 'Left Hand / Block', iconId: 0 },
      { type: 'BUTTON', shape: 'RECT', bindings: ['KEY_SHIFT_L', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.07, y: 0.09, toggleSwitch: true, text: 'Walk / Run', iconId: 0 },
      { type: 'BUTTON', shape: 'RECT', bindings: ['KEY_R', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.17, y: 0.09, toggleSwitch: false, text: 'Ready Weapon', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_F', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.94, y: 0.44, toggleSwitch: false, text: 'POV Toggle', iconId: 0 },
      { type: 'BUTTON', shape: 'ROUND_RECT', bindings: ['KEY_ESC', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.54, y: 0.91, toggleSwitch: false, text: 'Journal / System', iconId: 0 },
      { type: 'BUTTON', shape: 'ROUND_RECT', bindings: ['KEY_TAB', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.46, y: 0.91, toggleSwitch: false, text: 'Character Menu', iconId: 0 }
    ]
  },
  {
    id: 3,
    name: 'Bioshock',
    cursorSpeed: 1.2,
    genre: 'FPS / Immersive Sim',
    tags: ['Shooter', 'Sci-Fi', 'Horror', 'Powers'],
    elements: [
      { type: 'STICK', shape: 'CIRCLE', bindings: ['KEY_W', 'KEY_D', 'KEY_S', 'KEY_A'], scale: 1.0, x: 0.10, y: 0.72, toggleSwitch: false, text: 'Move', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['MOUSE_LEFT_BUTTON', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.83, y: 0.72, toggleSwitch: false, text: 'Fire Weapon', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['MOUSE_RIGHT_BUTTON', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.08, y: 0.45, toggleSwitch: false, text: 'Cast Plasmid', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_SPACE', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.90, y: 0.85, toggleSwitch: false, text: 'Jump', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_E', 'NONE', 'NONE', 'NONE'], scale: 0.9, x: 0.92, y: 0.65, toggleSwitch: false, text: 'Use', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_R', 'NONE', 'NONE', 'NONE'], scale: 0.9, x: 0.80, y: 0.55, toggleSwitch: false, text: 'Reload', iconId: 0 },
      { type: 'BUTTON', shape: 'RECT', bindings: ['KEY_SHIFT_L', 'NONE', 'NONE', 'NONE'], scale: 0.9, x: 0.07, y: 0.12, toggleSwitch: true, text: 'Crouch', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_F', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.92, y: 0.42, toggleSwitch: false, text: 'First Aid', iconId: 0 },
      { type: 'BUTTON', shape: 'ROUND_RECT', bindings: ['KEY_ESC', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.5, y: 0.92, toggleSwitch: false, text: 'Pause', iconId: 0 }
    ]
  },
  {
    id: 15,
    name: 'FlatOut 2',
    cursorSpeed: 1.0,
    genre: 'Arcade Racing',
    tags: ['Racing', 'Destruction', 'Vehicle'],
    elements: [
      { type: 'D_PAD', shape: 'CIRCLE', bindings: ['KEY_UP', 'KEY_RIGHT', 'KEY_DOWN', 'KEY_LEFT'], scale: 1.1, x: 0.12, y: 0.72, toggleSwitch: false, text: 'Steer/Gas', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_UP', 'NONE', 'NONE', 'NONE'], scale: 1.1, x: 0.88, y: 0.65, toggleSwitch: false, text: 'Accelerate', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_DOWN', 'NONE', 'NONE', 'NONE'], scale: 1.1, x: 0.82, y: 0.82, toggleSwitch: false, text: 'Brake / Rev', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_SPACE', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.93, y: 0.80, toggleSwitch: false, text: 'Handbrake', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_CTRL_L', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.78, y: 0.65, toggleSwitch: false, text: 'Nitro Boost', iconId: 0 },
      { type: 'BUTTON', shape: 'RECT', bindings: ['KEY_R', 'NONE', 'NONE', 'NONE'], scale: 0.9, x: 0.90, y: 0.12, toggleSwitch: false, text: 'Reset Car', iconId: 0 },
      { type: 'BUTTON', shape: 'RECT', bindings: ['KEY_C', 'NONE', 'NONE', 'NONE'], scale: 0.9, x: 0.10, y: 0.12, toggleSwitch: false, text: 'Camera', iconId: 0 },
      { type: 'BUTTON', shape: 'ROUND_RECT', bindings: ['KEY_ESC', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.5, y: 0.92, toggleSwitch: false, text: 'Menu', iconId: 0 }
    ]
  },
  {
    id: 11,
    name: 'Fallout 3',
    cursorSpeed: 1.25,
    genre: 'Action RPG / Post-Apocalyptic',
    tags: ['RPG', 'VATS', 'Shooter', 'Open World'],
    elements: [
      { type: 'STICK', shape: 'CIRCLE', bindings: ['KEY_W', 'KEY_D', 'KEY_S', 'KEY_A'], scale: 1.05, x: 0.11, y: 0.72, toggleSwitch: false, text: 'Move', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['MOUSE_LEFT_BUTTON', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.82, y: 0.72, toggleSwitch: false, text: 'Attack', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_V', 'NONE', 'NONE', 'NONE'], scale: 1.1, x: 0.88, y: 0.58, toggleSwitch: false, text: 'V.A.T.S.', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_E', 'NONE', 'NONE', 'NONE'], scale: 0.95, x: 0.93, y: 0.72, toggleSwitch: false, text: 'Activate', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_SPACE', 'NONE', 'NONE', 'NONE'], scale: 0.95, x: 0.88, y: 0.86, toggleSwitch: false, text: 'Jump', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_TAB', 'NONE', 'NONE', 'NONE'], scale: 0.95, x: 0.78, y: 0.86, toggleSwitch: false, text: 'Pip-Boy', iconId: 0 },
      { type: 'BUTTON', shape: 'RECT', bindings: ['KEY_R', 'NONE', 'NONE', 'NONE'], scale: 0.9, x: 0.82, y: 0.10, toggleSwitch: false, text: 'Reload', iconId: 0 },
      { type: 'BUTTON', shape: 'RECT', bindings: ['KEY_CTRL_L', 'NONE', 'NONE', 'NONE'], scale: 0.9, x: 0.08, y: 0.10, toggleSwitch: true, text: 'Sneak', iconId: 0 },
      { type: 'BUTTON', shape: 'ROUND_RECT', bindings: ['KEY_ESC', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.5, y: 0.92, toggleSwitch: false, text: 'Pause', iconId: 0 }
    ]
  },
  {
    id: 6,
    name: 'Dark Souls 2',
    cursorSpeed: 1.1,
    genre: 'Souls-like Action RPG',
    tags: ['Action RPG', 'Hardcore', 'Third Person', 'Fantasy'],
    elements: [
      { type: 'STICK', shape: 'CIRCLE', bindings: ['KEY_W', 'KEY_D', 'KEY_S', 'KEY_A'], scale: 1.05, x: 0.11, y: 0.72, toggleSwitch: false, text: 'Walk/Run', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['MOUSE_LEFT_BUTTON', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.82, y: 0.72, toggleSwitch: false, text: 'R-Attack', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['MOUSE_RIGHT_BUTTON', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.10, y: 0.45, toggleSwitch: false, text: 'L-Block/Parry', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_SPACE', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.92, y: 0.72, toggleSwitch: false, text: 'Dodge/Roll', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_E', 'NONE', 'NONE', 'NONE'], scale: 0.9, x: 0.87, y: 0.58, toggleSwitch: false, text: 'Use Item (Estus)', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_Q', 'NONE', 'NONE', 'NONE'], scale: 0.9, x: 0.87, y: 0.86, toggleSwitch: false, text: 'Lock On', iconId: 0 },
      { type: 'BUTTON', shape: 'ROUND_RECT', bindings: ['KEY_ESC', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.5, y: 0.92, toggleSwitch: false, text: 'Inventory', iconId: 0 }
    ]
  },
  {
    id: 12,
    name: 'Far Cry 4',
    cursorSpeed: 1.3,
    genre: 'Open World FPS',
    tags: ['Shooter', 'Action', 'Hunting', 'Stealth'],
    elements: [
      { type: 'STICK', shape: 'CIRCLE', bindings: ['KEY_W', 'KEY_D', 'KEY_S', 'KEY_A'], scale: 1.0, x: 0.11, y: 0.72, toggleSwitch: false, text: 'Move', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['MOUSE_LEFT_BUTTON', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.82, y: 0.72, toggleSwitch: false, text: 'Fire', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['MOUSE_RIGHT_BUTTON', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.08, y: 0.45, toggleSwitch: false, text: 'Aim Down Sight', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_SPACE', 'NONE', 'NONE', 'NONE'], scale: 0.95, x: 0.92, y: 0.72, toggleSwitch: false, text: 'Jump / Wingsuit', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_E', 'NONE', 'NONE', 'NONE'], scale: 0.9, x: 0.87, y: 0.58, toggleSwitch: false, text: 'Interact / Takedown', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_C', 'NONE', 'NONE', 'NONE'], scale: 0.9, x: 0.87, y: 0.86, toggleSwitch: true, text: 'Crouch', iconId: 0 },
      { type: 'BUTTON', shape: 'RECT', bindings: ['KEY_SHIFT_L', 'NONE', 'NONE', 'NONE'], scale: 0.9, x: 0.08, y: 0.10, toggleSwitch: true, text: 'Sprint', iconId: 0 },
      { type: 'BUTTON', shape: 'ROUND_RECT', bindings: ['KEY_ESC', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.5, y: 0.92, toggleSwitch: false, text: 'Map/Menu', iconId: 0 }
    ]
  },
  {
    id: 34,
    name: 'Shovel Knight',
    cursorSpeed: 1.0,
    genre: 'Retro 2D Platformer',
    tags: ['Platformer', 'Pixel Art', 'Action', 'Indie'],
    elements: [
      { type: 'D_PAD', shape: 'CIRCLE', bindings: ['KEY_UP', 'KEY_RIGHT', 'KEY_DOWN', 'KEY_LEFT'], scale: 1.1, x: 0.12, y: 0.72, toggleSwitch: false, text: 'D-Pad', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_Z', 'NONE', 'NONE', 'NONE'], scale: 1.1, x: 0.82, y: 0.75, toggleSwitch: false, text: 'Attack (Slash)', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_X', 'NONE', 'NONE', 'NONE'], scale: 1.1, x: 0.92, y: 0.68, toggleSwitch: false, text: 'Jump', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_C', 'NONE', 'NONE', 'NONE'], scale: 0.9, x: 0.82, y: 0.58, toggleSwitch: false, text: 'Relic (Subweapon)', iconId: 0 },
      { type: 'BUTTON', shape: 'ROUND_RECT', bindings: ['KEY_ENTER', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.55, y: 0.92, toggleSwitch: false, text: 'Inventory', iconId: 0 },
      { type: 'BUTTON', shape: 'ROUND_RECT', bindings: ['KEY_ESC', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.45, y: 0.92, toggleSwitch: false, text: 'Pause', iconId: 0 }
    ]
  },
  {
    id: 38,
    name: 'Sonic Mania',
    cursorSpeed: 1.0,
    genre: 'High-Speed 2D Platformer',
    tags: ['Platformer', 'Speed', 'Sega', 'Arcade'],
    elements: [
      { type: 'D_PAD', shape: 'CIRCLE', bindings: ['KEY_UP', 'KEY_RIGHT', 'KEY_DOWN', 'KEY_LEFT'], scale: 1.15, x: 0.12, y: 0.72, toggleSwitch: false, text: 'D-Pad', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_A', 'NONE', 'NONE', 'NONE'], scale: 1.1, x: 0.80, y: 0.74, toggleSwitch: false, text: 'Jump A', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_S', 'NONE', 'NONE', 'NONE'], scale: 1.1, x: 0.88, y: 0.62, toggleSwitch: false, text: 'Jump B', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_D', 'NONE', 'NONE', 'NONE'], scale: 1.1, x: 0.92, y: 0.78, toggleSwitch: false, text: 'Jump C', iconId: 0 },
      { type: 'BUTTON', shape: 'ROUND_RECT', bindings: ['KEY_ENTER', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.5, y: 0.92, toggleSwitch: false, text: 'Start', iconId: 0 }
    ]
  },
  {
    id: 25,
    name: 'Metro 2033',
    cursorSpeed: 1.25,
    genre: 'Atmospheric FPS / Survival',
    tags: ['FPS', 'Horror', 'Survival', 'Atmospheric'],
    elements: [
      { type: 'STICK', shape: 'CIRCLE', bindings: ['KEY_W', 'KEY_D', 'KEY_S', 'KEY_A'], scale: 1.0, x: 0.11, y: 0.72, toggleSwitch: false, text: 'Move', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['MOUSE_LEFT_BUTTON', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.82, y: 0.72, toggleSwitch: false, text: 'Fire', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['MOUSE_RIGHT_BUTTON', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.08, y: 0.45, toggleSwitch: false, text: 'Aim', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_G', 'NONE', 'NONE', 'NONE'], scale: 0.9, x: 0.87, y: 0.58, toggleSwitch: false, text: 'Gas Mask', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_F', 'NONE', 'NONE', 'NONE'], scale: 0.9, x: 0.92, y: 0.72, toggleSwitch: false, text: 'Flashlight/Charger', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_SPACE', 'NONE', 'NONE', 'NONE'], scale: 0.95, x: 0.87, y: 0.86, toggleSwitch: false, text: 'Jump', iconId: 0 },
      { type: 'BUTTON', shape: 'RECT', bindings: ['KEY_SHIFT_L', 'NONE', 'NONE', 'NONE'], scale: 0.9, x: 0.08, y: 0.10, toggleSwitch: true, text: 'Sprint', iconId: 0 },
      { type: 'BUTTON', shape: 'ROUND_RECT', bindings: ['KEY_ESC', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.5, y: 0.92, toggleSwitch: false, text: 'Journal / Pause', iconId: 0 }
    ]
  },
  {
    id: 26,
    name: 'Oblivion',
    cursorSpeed: 1.3,
    genre: 'Elder Scrolls Action RPG',
    tags: ['RPG', 'Open World', 'Fantasy', 'First Person'],
    elements: [
      { type: 'D_PAD', shape: 'CIRCLE', bindings: ['KEY_W', 'KEY_D', 'KEY_S', 'KEY_A'], scale: 1.0, x: 0.10, y: 0.73, toggleSwitch: false, text: 'Movement', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['MOUSE_LEFT_BUTTON', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.82, y: 0.73, toggleSwitch: false, text: 'Attack', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_C', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.88, y: 0.60, toggleSwitch: false, text: 'Cast Spell', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_SPACE', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.88, y: 0.87, toggleSwitch: false, text: 'Jump', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_SPACE', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.94, y: 0.73, toggleSwitch: false, text: 'Activate', iconId: 0 },
      { type: 'BUTTON', shape: 'RECT', bindings: ['KEY_TAB', 'NONE', 'NONE', 'NONE'], scale: 0.9, x: 0.83, y: 0.09, toggleSwitch: false, text: 'Journal / Stats', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['MOUSE_RIGHT_BUTTON', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.06, y: 0.44, toggleSwitch: false, text: 'Block', iconId: 0 },
      { type: 'BUTTON', shape: 'ROUND_RECT', bindings: ['KEY_ESC', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.5, y: 0.91, toggleSwitch: false, text: 'System', iconId: 0 }
    ]
  },
  {
    id: 24,
    name: 'Mass Effect 2',
    cursorSpeed: 1.2,
    genre: 'Sci-Fi Action RPG / Shooter',
    tags: ['Sci-Fi', 'Shooter', 'Squad RPG', 'BioWare'],
    elements: [
      { type: 'STICK', shape: 'CIRCLE', bindings: ['KEY_W', 'KEY_D', 'KEY_S', 'KEY_A'], scale: 1.0, x: 0.11, y: 0.72, toggleSwitch: false, text: 'Move', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['MOUSE_LEFT_BUTTON', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.82, y: 0.72, toggleSwitch: false, text: 'Fire Weapon', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['MOUSE_RIGHT_BUTTON', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.08, y: 0.45, toggleSwitch: false, text: 'Aim', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_SPACE', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.92, y: 0.72, toggleSwitch: false, text: 'Cover / Storm', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_LEFT_SHIFT', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.87, y: 0.58, toggleSwitch: false, text: 'Power HUD (Pause)', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_R', 'NONE', 'NONE', 'NONE'], scale: 0.9, x: 0.87, y: 0.86, toggleSwitch: false, text: 'Reload Thermal Clip', iconId: 0 },
      { type: 'BUTTON', shape: 'ROUND_RECT', bindings: ['KEY_ESC', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.5, y: 0.92, toggleSwitch: false, text: 'Mission Log', iconId: 0 }
    ]
  },
  {
    id: 5,
    name: 'Cyber Shadow',
    cursorSpeed: 1.0,
    genre: 'Ninja Cyberpunk Action 2D',
    tags: ['Platformer', 'Ninja', 'Cyberpunk', 'Action'],
    elements: [
      { type: 'D_PAD', shape: 'CIRCLE', bindings: ['KEY_UP', 'KEY_RIGHT', 'KEY_DOWN', 'KEY_LEFT'], scale: 1.1, x: 0.12, y: 0.72, toggleSwitch: false, text: 'D-Pad', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_Z', 'NONE', 'NONE', 'NONE'], scale: 1.1, x: 0.82, y: 0.74, toggleSwitch: false, text: 'Katana Slash', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_X', 'NONE', 'NONE', 'NONE'], scale: 1.1, x: 0.92, y: 0.65, toggleSwitch: false, text: 'Jump', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_C', 'NONE', 'NONE', 'NONE'], scale: 0.95, x: 0.82, y: 0.56, toggleSwitch: false, text: 'Ninjutsu Skill', iconId: 0 },
      { type: 'BUTTON', shape: 'ROUND_RECT', bindings: ['KEY_ENTER', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.5, y: 0.92, toggleSwitch: false, text: 'Pause', iconId: 0 }
    ]
  },
  {
    id: 43,
    name: 'Sunset Overdrive',
    cursorSpeed: 1.25,
    genre: 'Stylized Open World Acrobatics',
    tags: ['Action', 'DirectX 12', 'Parkour', 'Comedy'],
    elements: [
      { type: 'STICK', shape: 'CIRCLE', bindings: ['KEY_W', 'KEY_D', 'KEY_S', 'KEY_A'], scale: 1.05, x: 0.11, y: 0.72, toggleSwitch: false, text: 'Movement', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['MOUSE_LEFT_BUTTON', 'NONE', 'NONE', 'NONE'], scale: 1.0, x: 0.82, y: 0.72, toggleSwitch: false, text: 'Fire Weapon', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_SPACE', 'NONE', 'NONE', 'NONE'], scale: 1.05, x: 0.92, y: 0.72, toggleSwitch: false, text: 'Grind / Jump', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['MOUSE_RIGHT_BUTTON', 'NONE', 'NONE', 'NONE'], scale: 0.9, x: 0.08, y: 0.45, toggleSwitch: false, text: 'Aim Mode', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_SHIFT_L', 'NONE', 'NONE', 'NONE'], scale: 0.95, x: 0.87, y: 0.58, toggleSwitch: false, text: 'Air Dash', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_E', 'NONE', 'NONE', 'NONE'], scale: 0.9, x: 0.87, y: 0.86, toggleSwitch: false, text: 'Melee', iconId: 0 },
      { type: 'BUTTON', shape: 'ROUND_RECT', bindings: ['KEY_ESC', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.5, y: 0.92, toggleSwitch: false, text: 'Menu', iconId: 0 }
    ]
  },
  {
    id: 42,
    name: 'SteamWorld Dig 2',
    cursorSpeed: 1.0,
    genre: 'Mining Metroidvania',
    tags: ['Metroidvania', 'Platformer', 'Mining', 'Steampunk'],
    elements: [
      { type: 'D_PAD', shape: 'CIRCLE', bindings: ['KEY_UP', 'KEY_RIGHT', 'KEY_DOWN', 'KEY_LEFT'], scale: 1.1, x: 0.12, y: 0.72, toggleSwitch: false, text: 'Move / Dig Dir', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_SPACE', 'NONE', 'NONE', 'NONE'], scale: 1.1, x: 0.82, y: 0.74, toggleSwitch: false, text: 'Jump / Jetpack', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_X', 'NONE', 'NONE', 'NONE'], scale: 1.1, x: 0.92, y: 0.65, toggleSwitch: false, text: 'Pickaxe Strike', iconId: 0 },
      { type: 'BUTTON', shape: 'CIRCLE', bindings: ['KEY_C', 'NONE', 'NONE', 'NONE'], scale: 0.95, x: 0.82, y: 0.56, toggleSwitch: false, text: 'Hookshot / Pressure Bomb', iconId: 0 },
      { type: 'BUTTON', shape: 'ROUND_RECT', bindings: ['KEY_TAB', 'NONE', 'NONE', 'NONE'], scale: 0.85, x: 0.5, y: 0.92, toggleSwitch: false, text: 'Map', iconId: 0 }
    ]
  }
];

// All 53 games present in input_controls/
export const ALL_GAME_NAMES = [
  "Alien Versus Predator",
  "Alpha Protocol",
  "Bioshock",
  "Call of Juarez Gunslinger",
  "Cyber Shadow",
  "Dark Souls 2",
  "Deus Ex Human Revolution",
  "Divinity 2 DC",
  "Drakensang",
  "Driver Parallel Lines",
  "Fallout 3",
  "Far Cry 4",
  "Final Fantasy 8",
  "Final Fantasy Type-0",
  "FlatOut 2",
  "Front Mission Evolved",
  "Gravity Circuit",
  "GTA 5",
  "Hitman 2",
  "IGI 2",
  "Infernal",
  "La Mulana",
  "Marvel Ultimate Alliance",
  "Mass Effect 2",
  "Metro 2033",
  "Oblivion",
  "Prey",
  "Psychonauts",
  "Quake 4",
  "RAGE",
  "Rayman 3",
  "Risen 2",
  "Second Sight",
  "Shovel Knight",
  "Singularity",
  "Skyrim",
  "Sonic Generations",
  "Sonic Mania",
  "Spiderman Shattered Dimensions",
  "Stalker CS",
  "Star Wars Jedi Knight 2",
  "SteamWorld Dig 2",
  "Sunset Overdrive",
  "The Alliance Alive",
  "The Forest",
  "The Saboteur",
  "Turok 2",
  "Turok Evolution",
  "Ultima Underworld",
  "Unepic",
  "Wolfenstein",
  "Xanadu Next",
  "Ys Origin"
];
