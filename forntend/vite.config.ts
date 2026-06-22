import { defineConfig, loadEnv } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'


function figmaAssetResolver() {
  return {
    name: 'figma-asset-resolver',
    resolveId(id) {
      if (id.startsWith('figma:asset/')) {
        const filename = id.replace('figma:asset/', '')
        return path.resolve(__dirname, 'src/assets', filename)
      }
    },
  }
}

function apiProxyTarget(mode: string) {
  const env = loadEnv(mode, process.cwd(), '')
  const configuredUrl = env.VITE_API_URL || 'http://localhost:5001/api'

  if (!/^https?:\/\//i.test(configuredUrl)) {
    return 'http://localhost:5001'
  }

  return configuredUrl.replace(/\/api\/?$/i, '').replace(/\/+$/, '')
}

export default defineConfig(({ mode }) => ({
  plugins: [
    figmaAssetResolver(),
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
    VitePWA({ registerType: 'autoUpdate' }),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/api': {
        target: apiProxyTarget(mode),
        changeOrigin: true,
        secure: false,
      },
      '/uploads': {
        target: apiProxyTarget(mode),
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
}))
