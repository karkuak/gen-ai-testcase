import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
// Fix: To resolve a TypeScript type error where `process.cwd()` is not recognized,
// we explicitly import `cwd` from `node:process`. This provides the correct type definitions
// and is the modern way to access this functionality in Node.js.
import { cwd } from 'node:process';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  const env = loadEnv(mode, cwd(), '');
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})
