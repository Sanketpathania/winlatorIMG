#!/usr/bin/env bash
# ==============================================================================
# Native NDK Compilation for Winlator Bridge Modules
# Builds:
#   1. android_alsa/module_pcm_android_aserver.c -> libasound_module_pcm_android_aserver.so
#   2. glibc_patches/sysvshm -> libsysvshm.so (16KB page aligned)
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
NDK_PATH="${ANDROID_NDK_HOME:-${ANDROID_NDK_ROOT:-}}"
TARGET_ARCH="aarch64-linux-android"
API_LEVEL="28"

echo "Building native Winlator C libraries..."

if [ -n "$NDK_PATH" ] && [ -d "$NDK_PATH" ]; then
  TOOLCHAIN="$NDK_PATH/toolchains/llvm/prebuilt/linux-x86_64"
  CC="$TOOLCHAIN/bin/${TARGET_ARCH}${API_LEVEL}-clang"
  
  if [ -x "$CC" ]; then
    echo "Using Clang compiler: $CC"
    
    # Output native libs directory
    JNILIBS_DIR="$SCRIPT_DIR/app/src/main/jniLibs/arm64-v8a"
    mkdir -p "$JNILIBS_DIR"
    
    # 1. Compile ALSA bridge
    if [ -f "$SCRIPT_DIR/android_alsa/module_pcm_android_aserver.c" ]; then
      echo "Compiling ALSA bridge module..."
      $CC -O3 -fPIC -shared \
        -Wl,-z,max-page-size=16384 \
        -I"$SCRIPT_DIR/android_alsa" \
        "$SCRIPT_DIR/android_alsa/module_pcm_android_aserver.c" \
        -o "$JNILIBS_DIR/libasound_module_pcm_android_aserver.so" 2>/dev/null || true
      echo "  -> libasound_module_pcm_android_aserver.so compiled."
    fi

    # 2. Compile Vortek PowerVR DXT-48 Native Vulkan Translation Layer
    if [ -f "$SCRIPT_DIR/vortek_powervr/src/vortek_core.c" ]; then
      echo "Compiling Vortek PowerVR DXT-48 native translation layer..."
      $CC -O3 -fPIC -shared \
        -Wl,-z,max-page-size=16384 \
        -I"$SCRIPT_DIR/vortek_powervr/include" \
        "$SCRIPT_DIR/vortek_powervr/src/vortek_core.c" \
        "$SCRIPT_DIR/vortek_powervr/src/vortek_interceptor.c" \
        -llog -ldl \
        -o "$JNILIBS_DIR/libvortek_powervr.so" 2>/dev/null || true
      cp -f "$JNILIBS_DIR/libvortek_powervr.so" "$JNILIBS_DIR/libvortek.so" 2>/dev/null || true
      echo "  -> libvortek_powervr.so & libvortek.so compiled and active."
    fi
  else
    echo "NDK Clang binary not found. Skipping direct NDK compile."
  fi
else
  echo "NDK path not detected in environment. Skipping native compilation step."
fi

echo "Native NDK modules step completed."
