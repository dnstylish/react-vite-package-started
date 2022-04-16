import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import Inspect from 'vite-plugin-inspect'
import IndexGenerator from './src/plugins/vite/vite-plugin-react-index-generator'
import * as path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3004
  },
  resolve: {
    alias: {
      '@library': path.resolve(__dirname, './src'),
      '@components/': `${path.resolve(__dirname, './src/components')}/`
    }
  },
  plugins: [react(), Inspect(), IndexGenerator()],
  build: {
    lib: {
      entry: path.resolve(__dirname, 'src/index.tsx'),
      name: 'library',
      fileName: (format) => `main.${format}.js`
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'styled-components'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
          'styled-components': 'styled'
        }
      }
    },
    minify: true
  },
  esbuild: {
    minify: true
  }
})
