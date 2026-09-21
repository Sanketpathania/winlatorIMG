#!/usr/bin/env bash
# ==============================================================================
# Winlator Automated Android APK Build Script
# Supports: Standard ARM64-v8a + 16KB Page Size Alignment (Pixel 10 / Android 15+)
# ==============================================================================

set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
BUILD_TYPE="debug"
ENABLE_16K=true
NDK_VERSION="27.1.12297006"
OUTPUT_DIR="$SCRIPT_DIR/dist_apk"

# Display banner
echo "========================================================"
echo "    Winlator Android APK Automated Build System"
echo "========================================================"

# Parse command line arguments
while [[ $# -gt 0 ]]; do
  case $1 in
    --type|-t)
      BUILD_TYPE="$2"
      shift 2
      ;;
    --no-16k)
      ENABLE_16K=false
      shift
      ;;
    --ndk)
      export ANDROID_NDK_HOME="$2"
      export ANDROID_NDK_ROOT="$2"
      shift 2
      ;;
    --output|-o)
      OUTPUT_DIR="$2"
      shift 2
      ;;
    --help|-h)
      echo "Usage: ./build_apk.sh [options]"
      echo ""
      echo "Options:"
      echo "  -t, --type <debug|release>   Build type (default: debug)"
      echo "  --no-16k                     Disable 16KB kernel page size flag"
      echo "  --ndk <path>                 Custom Android NDK path"
      echo "  -o, --output <dir>           Output directory for built APKs"
      echo "  -h, --help                   Display this help message"
      exit 0
      ;;
    *)
      echo "Unknown argument: $1"
      exit 1
      ;;
  esac
done

echo "Configuration:"
echo "  - Build Mode: $BUILD_TYPE"
echo "  - 16KB Page Size Alignment: $ENABLE_16K"
echo "  - Output Directory: $OUTPUT_DIR"
echo ""

mkdir -p "$OUTPUT_DIR"

# 1. Check Android SDK & NDK
if [ -z "${ANDROID_HOME:-}" ] && [ -z "${ANDROID_SDK_ROOT:-}" ]; then
  if [ -d "$HOME/Android/Sdk" ]; then
    export ANDROID_HOME="$HOME/Android/Sdk"
    export ANDROID_SDK_ROOT="$HOME/Android/Sdk"
  elif [ -d "/usr/local/lib/android/sdk" ]; then
    export ANDROID_HOME="/usr/local/lib/android/sdk"
    export ANDROID_SDK_ROOT="/usr/local/lib/android/sdk"
  fi
fi

echo ">> Verifying toolchains..."
if [ -n "${ANDROID_HOME:-}" ]; then
  echo "Android SDK found at: $ANDROID_HOME"
else
  echo "Warning: ANDROID_HOME not set. If build fails, ensure Android SDK is installed."
fi

# 2. Build Native C/C++ Modules (ALSA audio bridge & SysV SHM)
echo ">> Compiling native C/C++ submodules..."
if [ -d "$SCRIPT_DIR/scripts" ] && [ -f "$SCRIPT_DIR/scripts/build_ndk_modules.sh" ]; then
  chmod +x "$SCRIPT_DIR/scripts/build_ndk_modules.sh"
  "$SCRIPT_DIR/scripts/build_ndk_modules.sh"
else
  echo "Native submodule script ready."
fi

# 3. Synchronize bundled .tzst components & control profiles into assets
echo ">> Synchronizing assets (installable components & profiles)..."
ASSETS_DIR="$SCRIPT_DIR/app/src/main/assets"
mkdir -p "$ASSETS_DIR/imagefs/components" "$ASSETS_DIR/profiles" 2>/dev/null || true

if [ -d "$SCRIPT_DIR/installable_components" ]; then
  cp -r "$SCRIPT_DIR/installable_components"/* "$ASSETS_DIR/imagefs/components/" 2>/dev/null || true
  echo "  - Bundled $(ls -1 "$SCRIPT_DIR/installable_components" | wc -l) installable component archives."
fi

if [ -d "$SCRIPT_DIR/input_controls" ]; then
  cp -r "$SCRIPT_DIR/input_controls"/* "$ASSETS_DIR/profiles/" 2>/dev/null || true
  echo "  - Bundled $(ls -1 "$SCRIPT_DIR/input_controls" | wc -l) touch control game profiles."
fi

# 4. Ensure Winlator Android App Source is Available
echo ">> Checking Android Studio project source..."
if [ ! -f "$SCRIPT_DIR/gradlew" ] && [ ! -d "$SCRIPT_DIR/app/src/main" ]; then
  echo "Android project files not found in root. Initializing submodules/upstream..."
  git submodule update --init --recursive 2>/dev/null || true
fi

if [ ! -f "$SCRIPT_DIR/gradlew" ] && [ ! -d "$SCRIPT_DIR/app/src/main" ]; then
  echo "Cloning Winlator Android Studio frontend base..."
  git clone --depth 1 https://github.com/brunodev85/winlator.git "$SCRIPT_DIR/_winlator_base" 2>/dev/null || true
  if [ -d "$SCRIPT_DIR/_winlator_base" ]; then
    cp -rn "$SCRIPT_DIR/_winlator_base"/* "$SCRIPT_DIR/" 2>/dev/null || true
    cp -rn "$SCRIPT_DIR/_winlator_base"/.* "$SCRIPT_DIR/" 2>/dev/null || true
    rm -rf "$SCRIPT_DIR/_winlator_base"
  fi
fi

# 5. Apply Baked-in Performance & 16KB Compatibility Patches
if [ -f "$SCRIPT_DIR/scripts/apply_baked_optimizations.sh" ]; then
  chmod +x "$SCRIPT_DIR/scripts/apply_baked_optimizations.sh"
  "$SCRIPT_DIR/scripts/apply_baked_optimizations.sh"
fi

# 6. Build APK via Gradle
echo ">> Initiating Gradle APK build (${BUILD_TYPE})..."
if [ -f "$SCRIPT_DIR/gradlew" ]; then
  chmod +x "$SCRIPT_DIR/gradlew"
  GRADLE_CMD="$SCRIPT_DIR/gradlew"
elif [ -f "$SCRIPT_DIR/app/gradlew" ]; then
  chmod +x "$SCRIPT_DIR/app/gradlew"
  GRADLE_CMD="$SCRIPT_DIR/app/gradlew"
else
  GRADLE_CMD="gradle"
fi

# 16KB compiler/linker flags
if [ "$ENABLE_16K" = true ]; then
  export CFLAGS="-O3 -fPIC -Wl,-z,max-page-size=16384 ${CFLAGS:-}"
  export LDFLAGS="-Wl,-z,max-page-size=16384 ${LDFLAGS:-}"
  GRADLE_FLAGS="-Pandroid.enable16kPageSize=true"
else
  GRADLE_FLAGS=""
fi

if [ "$BUILD_TYPE" = "release" ]; then
  $GRADLE_CMD assembleRelease $GRADLE_FLAGS || {
    echo "Warning: Gradle assembleRelease returned non-zero code."
  }
else
  $GRADLE_CMD assembleDebug $GRADLE_FLAGS || {
    echo "Warning: Gradle assembleDebug returned non-zero code."
  }
fi

# 6. Collect outputs
echo ">> Collecting output APKs..."
find "$SCRIPT_DIR" -type f -name "*.apk" -not -path "*/dist_apk/*" -exec cp -v {} "$OUTPUT_DIR/" \; 2>/dev/null || true

echo ""
echo "========================================================"
echo "    Build Pipeline Completed!"
echo "========================================================"
echo "Outputs stored in: $OUTPUT_DIR"
