import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // Load env file based on `mode` in the current working directory.
  // Set the third parameter to '' to load all env regardless of the `VITE_` prefix.
  // Fix: Replaced `process.cwd()` with an empty string ('') to resolve a TypeScript
  // type error where 'cwd' was not found on 'process'. Vite's `loadEnv` function
  // defaults to `process.cwd()` when the directory argument is an empty string.
  const env = loadEnv(mode, '', '');
  return {
    plugins: [react()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.API_KEY)
    }
  }
})
