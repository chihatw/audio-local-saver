import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    // npm run dev でブラウザを開く
    open: true,
    // bit-harmony との衝突をさける
    port: 3001,
  },
  plugins: [react()],
});
