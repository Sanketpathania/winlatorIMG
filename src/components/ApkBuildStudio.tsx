import React, { useState } from 'react';
import { 
  Copy, 
  Check, 
  Download, 
  Sparkles, 
  Cpu, 
  Workflow
} from 'lucide-react';

export const ApkBuildStudio: React.FC = () => {
  const [buildType, setBuildType] = useState<'debug' | 'release'>('debug');
  const [enable16k, setEnable16k] = useState<boolean>(true);
  const [ndkVersion, setNdkVersion] = useState<string>('27.1.12297006');
  const [bundleComponents, setBundleComponents] = useState<boolean>(true);
  const [javaVersion, setJavaVersion] = useState<'17' | '21'>('17');
  const [activeSubTab, setActiveSubTab] = useState<'workflow' | 'sh' | 'guide'>('workflow');
  const [copiedWorkflow, setCopiedWorkflow] = useState<boolean>(false);
  const [copiedSh, setCopiedSh] = useState<boolean>(false);

  // Dynamically generate the YAML workflow based on user configuration
  const generateWorkflowYaml = () => {
    return `name: Build Winlator Android APK

on:
  push:
    branches: [ main, master, dev ]
    tags:
      - 'v*'
  pull_request:
    branches: [ main, master ]
  workflow_dispatch:
    inputs:
      build_type:
        description: 'Build Type'
        required: true
        default: '${buildType}'
        type: choice
        options:
          - 'debug'
          - 'release'
      enable_16kb_pages:
        description: 'Enable 16KB Kernel Page Size Alignment (Pixel 10 Pro XL / Android 15+)'
        required: true
        type: boolean
        default: ${enable16k}
      ndk_version:
        description: 'Android NDK Version'
        required: true
        default: '${ndkVersion}'
      bundle_components:
        description: 'Bundle .tzst Components & Profiles into APK Assets'
        required: true
        type: boolean
        default: ${bundleComponents}
      create_release:
        description: 'Publish GitHub Release if built successfully'
        required: false
        type: boolean
        default: ${buildType === 'release'}

concurrency:
  group: \${{ github.workflow }}-\${{ github.ref }}
  cancel-in-progress: true

jobs:
  build-apk:
    name: 🚀 Build Winlator APK (\${{ github.event.inputs.build_type || '${buildType}' }})
    runs-on: ubuntu-latest

    steps:
      - name: 📥 Checkout Repository
        uses: actions/checkout@v4
        with:
          submodules: recursive
          fetch-depth: 0

      - name: ☕ Set up JDK ${javaVersion}
        uses: actions/setup-java@v4
        with:
          distribution: 'temurin'
          java-version: '${javaVersion}'
          cache: 'gradle'

      - name: 🤖 Set up Android SDK Environment
        run: |
          echo "ANDROID_HOME=/usr/local/lib/android/sdk" >> $GITHUB_ENV
          echo "ANDROID_SDK_ROOT=/usr/local/lib/android/sdk" >> $GITHUB_ENV
          echo "/usr/local/lib/android/sdk/cmdline-tools/latest/bin" >> $GITHUB_PATH
          echo "/usr/local/lib/android/sdk/platform-tools" >> $GITHUB_PATH

      - name: 🔧 Install Android NDK & Build Tools
        run: |
          NDK_VER="\${{ github.event.inputs.ndk_version || '${ndkVersion}' }}"
          echo "Accepting Android SDK licenses..."
          yes | /usr/local/lib/android/sdk/cmdline-tools/latest/bin/sdkmanager --licenses > /dev/null 2>&1 || true
          echo "Installing NDK ($NDK_VER), CMake 3.22.1, and Build Tools 34.0.0..."
          /usr/local/lib/android/sdk/cmdline-tools/latest/bin/sdkmanager --install "ndk;$NDK_VER" "cmake;3.22.1" "build-tools;34.0.0" "platforms;android-34"
          echo "ANDROID_NDK_HOME=/usr/local/lib/android/sdk/ndk/$NDK_VER" >> $GITHUB_ENV
          echo "ANDROID_NDK_ROOT=/usr/local/lib/android/sdk/ndk/$NDK_VER" >> $GITHUB_ENV

      - name: 📂 Initialize Winlator Android Project Source
        run: |
          echo "Verifying Winlator Android App Source..."
          if [ ! -f "./gradlew" ] && [ ! -d "./app/src/main" ]; then
            echo "Submodule not populated. Fetching Winlator Android source tree..."
            git submodule update --init --recursive || true
          fi
          
          if [ ! -f "./gradlew" ] && [ ! -d "./app/src/main" ]; then
            echo "Cloning Winlator Android Studio frontend base..."
            git clone --depth 1 https://github.com/brunodev85/winlator.git _winlator_base || true
            if [ -d "_winlator_base" ]; then
              cp -rn _winlator_base/* . 2>/dev/null || true
              cp -rn _winlator_base/.* . 2>/dev/null || true
              rm -rf _winlator_base
            fi
          fi

      - name: 📦 Compile Native Android ALSA & SysV Shared Memory Modules
        run: |
          echo "Compiling native Android C modules..."
          chmod +x ./scripts/build_ndk_modules.sh 2>/dev/null || true
          
          # 16KB kernel page size support
          if [ "\${{ github.event.inputs.enable_16kb_pages || '${enable16k}' }}" = "true" ]; then
            export CFLAGS="-O3 -fPIC -Wl,-z,max-page-size=16384"
            export LDFLAGS="-Wl,-z,max-page-size=16384"
            echo "16KB kernel page alignment flag active."
          fi

          if [ -f "./scripts/build_ndk_modules.sh" ]; then
            ./scripts/build_ndk_modules.sh
          fi

      - name: 📂 Prepare Assets & Component Packages
        run: |
          mkdir -p app/src/main/assets/imagefs/components || true
          mkdir -p app/src/main/assets/profiles || true

          if [ "\${{ github.event.inputs.bundle_components || '${bundleComponents}' }}" = "true" ]; then
            if [ -d "installable_components" ]; then
              cp -r installable_components/* app/src/main/assets/imagefs/components/ 2>/dev/null || true
            fi
            if [ -d "input_controls" ]; then
              cp -r input_controls/* app/src/main/assets/profiles/ 2>/dev/null || true
            fi
          fi

      - name: 🔨 Build APK via Gradle
        run: |
          BUILD_TYPE="\${{ github.event.inputs.build_type || '${buildType}' }}"
          
          if [ -f "./gradlew" ]; then
            chmod +x ./gradlew
            if [ "$BUILD_TYPE" = "release" ]; then
              ./gradlew assembleRelease --stacktrace --no-daemon
            else
              ./gradlew assembleDebug --stacktrace --no-daemon
            fi
          else
            chmod +x ./build_apk.sh
            ./build_apk.sh --type "$BUILD_TYPE"
          fi

      - name: 🔑 Sign Release APK (Optional Keystore)
        if: \${{ (github.event.inputs.build_type == 'release' || startsWith(github.ref, 'refs/tags/')) && env.KEYSTORE_SECRET != '' }}
        env:
          KEYSTORE_SECRET: \${{ secrets.KEYSTORE_BASE64 }}
          KEYSTORE_PASSWORD: \${{ secrets.KEYSTORE_PASSWORD }}
          KEY_ALIAS: \${{ secrets.KEY_ALIAS }}
          KEY_PASSWORD: \${{ secrets.KEY_PASSWORD }}
        run: |
          echo "Signing release APK..."
          echo "$KEYSTORE_SECRET" | base64 --decode > release.jks
          UNSIGNED_APK=$(find app/build/outputs/apk/release/ -name "*.apk" -not -name "*signed*" | head -n 1)
          if [ -n "$UNSIGNED_APK" ]; then
            zipalign -v -p 4 "$UNSIGNED_APK" aligned.apk
            apksigner sign --ks release.jks --ks-pass "pass:$KEYSTORE_PASSWORD" --ks-key-alias "$KEY_ALIAS" --key-pass "pass:$KEY_PASSWORD" --out app/build/outputs/apk/release/Winlator-release-signed.apk aligned.apk
          fi

      - name: 🏷️ Collect & Validate APK Artifacts
        run: |
          mkdir -p dist_apk/
          echo "Searching for generated APK files..."
          find . -type f -name "*.apk" -not -path "*/dist_apk/*" -exec cp -v {} dist_apk/ \\; 2>/dev/null || true
          
          COUNT=$(find dist_apk/ -name "*.apk" | wc -l)
          echo "Found $COUNT APK files in dist_apk/"
          
          if [ "$COUNT" -eq 0 ]; then
            echo "::error::No APK files were produced by the Gradle build step."
            exit 1
          fi

      - name: 📤 Upload APK Artifacts
        uses: actions/upload-artifact@v4
        with:
          name: Winlator-\${{ github.event.inputs.build_type || '${buildType}' }}-apk
          path: dist_apk/*.apk
          retention-days: 30

      - name: 🌟 Create GitHub Release
        if: \${{ startsWith(github.ref, 'refs/tags/') || github.event.inputs.create_release == 'true' }}
        uses: softprops/action-gh-release@v2
        with:
          files: dist_apk/*.apk
          name: Winlator Release \${{ github.ref_name }}
          draft: false
          prerelease: false
        env:
          GITHUB_TOKEN: \${{ secrets.GITHUB_TOKEN }}
`;
  };

  const generateLocalShellScript = () => {
    return `#!/usr/bin/env bash
# ==============================================================================
# Winlator Automated Android APK Build Script (Local / CI runner)
# ==============================================================================

set -euo pipefail

BUILD_TYPE="${buildType}"
ENABLE_16K=${enable16k}
OUTPUT_DIR="./dist_apk"

echo "Building Winlator APK ($BUILD_TYPE)..."
mkdir -p "$OUTPUT_DIR"

# 1. Native compile
if [ "$ENABLE_16K" = true ]; then
  export CFLAGS="-O3 -fPIC -Wl,-z,max-page-size=16384 \${CFLAGS:-}"
  export LDFLAGS="-Wl,-z,max-page-size=16384 \${LDFLAGS:-}"
fi

if [ -f "./scripts/build_ndk_modules.sh" ]; then
  chmod +x ./scripts/build_ndk_modules.sh
  ./scripts/build_ndk_modules.sh
fi

# 2. Package assets
mkdir -p app/src/main/assets/imagefs/components app/src/main/assets/profiles 2>/dev/null || true
cp -r installable_components/* app/src/main/assets/imagefs/components/ 2>/dev/null || true
cp -r input_controls/* app/src/main/assets/profiles/ 2>/dev/null || true

# 3. Gradle build
if [ -f "./gradlew" ]; then
  chmod +x ./gradlew
  if [ "$BUILD_TYPE" = "release" ]; then
    ./gradlew assembleRelease
  else
    ./gradlew assembleDebug
  fi
fi

# 4. Output collection
find app/build/outputs/apk/ -name "*.apk" -exec cp {} "$OUTPUT_DIR/" \\; 2>/dev/null || true
echo "Build complete! Output APKs in: $OUTPUT_DIR"
`;
  };

  const handleCopyWorkflow = () => {
    navigator.clipboard.writeText(generateWorkflowYaml());
    setCopiedWorkflow(true);
    setTimeout(() => setCopiedWorkflow(false), 2000);
  };

  const handleDownloadWorkflow = () => {
    const blob = new Blob([generateWorkflowYaml()], { type: 'text/yaml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'build-apk.yml';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopySh = () => {
    navigator.clipboard.writeText(generateLocalShellScript());
    setCopiedSh(true);
    setTimeout(() => setCopiedSh(false), 2000);
  };

  const handleDownloadSh = () => {
    const blob = new Blob([generateLocalShellScript()], { type: 'text/x-sh' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'build_apk.sh';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-white flex items-center gap-2">
              <Workflow className="w-5 h-5 text-cyan-400" />
              <span>Automated GitHub Actions APK Build System</span>
            </h2>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-semibold">
              CI/CD Pipeline
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Build and sign Winlator Android APKs automatically on GitHub Actions with 16KB kernel page alignment, NDK r27c, and pre-bundled Box64/Turnip/PowerVR components.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownloadWorkflow}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition-colors shadow-sm shadow-cyan-500/20"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Download build-apk.yml</span>
          </button>
        </div>
      </div>

      {/* Grid: Configuration Matrix & Workflow Preview */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Form Controls */}
        <div className="lg:col-span-5 bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-5">
          <h3 className="text-sm font-bold text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>CI/CD Pipeline Options</span>
          </h3>

          <div className="space-y-4 text-xs">
            {/* Build Flavor */}
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Target Build Type</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  type="button"
                  onClick={() => setBuildType('debug')}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    buildType === 'debug'
                      ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold">Debug APK</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Quick testing & dev logs</div>
                </button>

                <button
                  type="button"
                  onClick={() => setBuildType('release')}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    buildType === 'release'
                      ? 'bg-cyan-950/60 border-cyan-500 text-cyan-300 font-semibold'
                      : 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  <div className="font-bold">Release (Optimized)</div>
                  <div className="text-[10px] text-slate-500 mt-0.5">Signed APK & Release tab</div>
                </button>
              </div>
            </div>

            {/* 16KB Page Size Alignment (Pixel 10 Pro XL / Tensor G5) */}
            <div className="p-3.5 bg-slate-950 rounded-xl border border-cyan-500/30 space-y-2">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={enable16k}
                  onChange={(e) => setEnable16k(e.target.checked)}
                  className="w-4 h-4 mt-0.5 accent-cyan-400 rounded"
                />
                <div>
                  <span className="font-bold text-cyan-300 block">
                    16KB Kernel Page Size Flag (-Wl,-z,max-page-size=16384)
                  </span>
                  <p className="text-[11px] text-slate-400 mt-0.5 leading-relaxed">
                    Mandatory for Google Pixel 10 Pro XL (Tensor G5 / PowerVR DXT) and Android 15/16 devices to prevent native library SIGSEGV crash.
                  </p>
                </div>
              </label>
            </div>

            {/* Android NDK Version */}
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Android NDK Version</label>
              <select
                value={ndkVersion}
                onChange={(e) => setNdkVersion(e.target.value)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="27.1.12297006">NDK r27c (27.1.12297006 - 16k Page Default)</option>
                <option value="26.3.11579264">NDK r26d (26.3.11579264 - Stable)</option>
                <option value="25.2.9519653">NDK r25c (25.2.9519653 - Legacy)</option>
              </select>
            </div>

            {/* Java SDK Version */}
            <div>
              <label className="block text-slate-400 mb-1 font-semibold">Java SDK (Temurin)</label>
              <select
                value={javaVersion}
                onChange={(e) => setJavaVersion(e.target.value as any)}
                className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-cyan-500"
              >
                <option value="17">Java 17 (Recommended for Android Gradle 8.x)</option>
                <option value="21">Java 21 (Modern LTS)</option>
              </select>
            </div>

            {/* Asset Packaging */}
            <div className="pt-1">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={bundleComponents}
                  onChange={(e) => setBundleComponents(e.target.checked)}
                  className="w-4 h-4 accent-cyan-400 rounded"
                />
                <span className="text-slate-300">
                  Bundle installable_components (.tzst) into APK assets
                </span>
              </label>
            </div>

          </div>

          {/* Quick Info Box */}
          <div className="p-3 bg-slate-950/70 rounded-lg border border-slate-800 text-[11px] text-slate-400 space-y-1.5">
            <div className="flex items-center gap-1 text-slate-300 font-semibold">
              <Cpu className="w-3.5 h-3.5 text-cyan-400" />
              <span>Pipeline Architecture:</span>
            </div>
            <p>
              The workflow compiles both native C submodules (<code className="text-cyan-300">android_alsa</code> audio bridge, <code className="text-cyan-300">glibc_patches</code>) and bundles touch control game profiles into the output APK artifact.
            </p>
          </div>
        </div>

        {/* Right Code View & Step Guide */}
        <div className="lg:col-span-7 space-y-4">
          
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
            {/* Sub Tabs */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveSubTab('workflow')}
                  className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors ${
                    activeSubTab === 'workflow'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'text-slate-400 hover:text-white bg-slate-950'
                  }`}
                >
                  .github/workflows/build-apk.yml
                </button>
                <button
                  onClick={() => setActiveSubTab('sh')}
                  className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors ${
                    activeSubTab === 'sh'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'text-slate-400 hover:text-white bg-slate-950'
                  }`}
                >
                  build_apk.sh (Local Runner)
                </button>
                <button
                  onClick={() => setActiveSubTab('guide')}
                  className={`px-3 py-1.5 text-xs rounded-lg font-semibold transition-colors ${
                    activeSubTab === 'guide'
                      ? 'bg-cyan-500 text-slate-950'
                      : 'text-slate-400 hover:text-white bg-slate-950'
                  }`}
                >
                  Setup Guide
                </button>
              </div>

              {activeSubTab === 'workflow' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyWorkflow}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white"
                  >
                    {copiedWorkflow ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedWorkflow ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              )}

              {activeSubTab === 'sh' && (
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopySh}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-slate-800 border border-slate-700 text-slate-200 hover:text-white"
                  >
                    {copiedSh ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSh ? 'Copied' : 'Copy'}</span>
                  </button>
                  <button
                    onClick={handleDownloadSh}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs rounded-lg bg-cyan-500 text-slate-950 font-semibold hover:bg-cyan-400"
                  >
                    <Download className="w-3.5 h-3.5" />
                    <span>Download</span>
                  </button>
                </div>
              )}
            </div>

            {/* Workflow Preview Tab */}
            {activeSubTab === 'workflow' && (
              <div className="space-y-3">
                <pre className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-[460px] leading-relaxed">
                  {generateWorkflowYaml()}
                </pre>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Location: <code className="text-slate-200">.github/workflows/build-apk.yml</code></span>
                  <span className="text-emerald-400">✓ Ready to run in GitHub Actions</span>
                </div>
              </div>
            )}

            {/* Local Runner Tab */}
            {activeSubTab === 'sh' && (
              <div className="space-y-3">
                <pre className="p-4 bg-slate-950 rounded-lg border border-slate-800 text-[11px] font-mono text-cyan-300 overflow-x-auto max-h-[460px] leading-relaxed">
                  {generateLocalShellScript()}
                </pre>
                <div className="flex items-center justify-between text-[11px] text-slate-400">
                  <span>Location: <code className="text-slate-200">./build_apk.sh</code></span>
                  <span>Run: <code className="text-cyan-300">chmod +x build_apk.sh && ./build_apk.sh</code></span>
                </div>
              </div>
            )}

            {/* Step-by-Step CI/CD Execution Guide */}
            {activeSubTab === 'guide' && (
              <div className="space-y-4 text-xs text-slate-300">
                <h4 className="font-bold text-white text-sm">How to Trigger Automatic APK Build on GitHub:</h4>
                
                <div className="space-y-3">
                  <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-bold text-cyan-400 block">Step 1: Commit the workflow file</span>
                    <p className="text-slate-400 text-[11px]">
                      Ensure <code className="text-slate-200">.github/workflows/build-apk.yml</code> and <code className="text-slate-200">build_apk.sh</code> are committed to your GitHub repository on the <code className="text-slate-200">main</code> branch.
                    </p>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-bold text-cyan-400 block">Step 2: Trigger the build</span>
                    <ul className="list-disc list-inside space-y-1 text-slate-400 text-[11px]">
                      <li><strong>Automatic Trigger:</strong> Simply push a new commit or tag (e.g., <code className="text-slate-200">git tag v11.2 && git push --tags</code>).</li>
                      <li><strong>Manual Trigger:</strong> Go to the <strong>Actions</strong> tab in your GitHub repository, click <strong>Build Winlator Android APK</strong>, and click <strong>Run workflow</strong>.</li>
                    </ul>
                  </div>

                  <div className="p-3.5 bg-slate-950 rounded-lg border border-slate-800 space-y-1">
                    <span className="font-bold text-cyan-400 block">Step 3: Download your built APK</span>
                    <p className="text-slate-400 text-[11px]">
                      Once the workflow finishes (typically ~3-5 minutes on GitHub runners), click on the completed run to download the generated <code className="text-cyan-300">Winlator-debug-apk.zip</code> or check the <strong>Releases</strong> page.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
};
