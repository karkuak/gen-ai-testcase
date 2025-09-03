// Fix: Added a triple-slash directive to include Node.js types. This resolves
// the TypeScript error for `process.cwd()` by ensuring that the correct type
// definitions for the `process` global object are available in this file.
/// <reference types="node" />

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, process.cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    },
      resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  }
})