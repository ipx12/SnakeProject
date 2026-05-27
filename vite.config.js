import { defineConfig } from 'vite'
import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { fileURLToPath, URL } from 'node:url'

const resolvePath = (p) => fileURLToPath(new URL(p, import.meta.url))

export default defineConfig({
  plugins: [
    react({
      babel: {
        presets: [reactCompilerPreset()],
      },
    }),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@lib': resolvePath('./src/lib'),
      '@components': resolvePath('./src/components'),
      '@icons': resolvePath('./src/assets/icons'),
      '@images': resolvePath('./src/assets/images'),
    },
  },
})
