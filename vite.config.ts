
  import { defineConfig } from 'vite';
  import react from '@vitejs/plugin-react-swc';

  export default defineConfig({
    base: '/ChecklistAcessibilidade/',
    plugins: [react()],
    build: {
      target: 'esnext',
      outDir: 'build',
    },
    server: {
      port: 3000,
      open: true,
      allowedHosts: ['localhost', 'sidagro-dev.dac.ufla.br'],
    },
  });
