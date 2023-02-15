import { defineConfig, Plugin } from 'vite'
import { comlink } from 'vite-plugin-comlink'
import preact from '@preact/preset-vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { visualizer } from 'rollup-plugin-visualizer'
import GlobalsPolyfills from '@esbuild-plugins/node-globals-polyfill'
import inject from '@rollup/plugin-inject'
import nodePolyfills from 'rollup-plugin-polyfill-node'
import removeConsole from 'vite-plugin-remove-console'

export default defineConfig({
  plugins: [comlink(), preact(), tsconfigPaths()],
  resolve: { alias: { assert: 'assert-browserify', crypto: 'crypto-browserify' } },
  build: {
    target: 'es2020',
    rollupOptions: {
      plugins: [
        visualizer({
          gzipSize: true,
          brotliSize: true,
        }),
        nodePolyfills(),
        inject({
          process: 'process',
          Buffer: ['buffer', 'Buffer'],
          global: 'global',
          stream: 'stream',
          _stream_duplex: 'duplex',
        }),
        removeConsole(),
      ] as unknown[] as Plugin[],
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    outDir: './docs',
  },
  optimizeDeps: {
    esbuildOptions: {
      target: 'es2020',
      supported: { bigint: true },
      define: {
        global: 'globalThis',
      },
      plugins: [
        GlobalsPolyfills({
          buffer: true,
        }),
      ] as any[],
    },
  },
  esbuild: {
    logOverride: { 'this-is-undefined-in-esm': 'silent' },
  },
  worker: {
    plugins: [comlink()],
  },
  server: { port: 3000 },
})
