import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

function safePublicCopy(): import('vite').Plugin {
  return {
    name: 'safe-public-copy',
    apply: 'build',
    configResolved(config) {
      (config as { _safePublicRoot?: string })._safePublicRoot = config.publicDir;
    },
    closeBundle() {
      const publicDir = path.resolve(__dirname, 'public');
      const outDir = path.resolve(__dirname, 'dist');

      function copyDirSafe(src: string, dest: string) {
        if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });
        const entries = fs.readdirSync(src, { withFileTypes: true });
        for (const entry of entries) {
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(dest, entry.name);
          if (entry.isDirectory()) {
            copyDirSafe(srcPath, destPath);
          } else {
            try {
              const buf = fs.readFileSync(srcPath);
              fs.writeFileSync(destPath, buf);
            } catch {
              console.warn(`[safe-public-copy] Skipped locked file: ${entry.name}`);
            }
          }
        }
      }

      copyDirSafe(publicDir, outDir);
    },
  };
}

export default defineConfig({
  plugins: [react(), safePublicCopy()],
  build: {
    copyPublicDir: false,
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
