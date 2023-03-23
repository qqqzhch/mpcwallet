import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import macrosPlugin from "vite-plugin-babel-macros"

import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import inject from '@rollup/plugin-inject';
// import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'

// import rollupNodePolyFill from 'rollup-plugin-node-polyfills'
import nodePolyfills from 'vite-plugin-node-stdlib-browser'
import type * as http from 'node:http'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    server: {
      proxy: {
        "/api": {
          target: "http://localhost:3004",
          changeOrigin: true
        },
      },
    },
    plugins: [react(),
    macrosPlugin(),
    nodePolyfills()
    ],
    optimizeDeps: {
      exclude: ['@ethersproject/hash', 'wrtc'],
      include: ['js-sha3', '@ethersproject/bignumber'],
      esbuildOptions: {
        // Node.js global to browser globalThis
        define: {
          global: 'globalThis'
        },
        plugins: [
          
        ]
      }


    },
    define: {
      global: 'globalThis',
    },
    resolve: {
      alias: {
        // Buffer : "buffer",

      },
    },
    build: {

      rollupOptions: {
        plugins: [rollupNodePolyFill()],

      },
    }
  }
})
