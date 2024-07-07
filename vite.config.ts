import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';

export default defineConfig({
  plugins: [vue()],
  build: {
    lib: {
      entry: './packages/lib/main.ts',
      name: 'mergeTableCells',
      fileName: 'merge-table-cells'
    },
    outDir: './packages/dist'
  },
  root: './examples',
  server: {
    open: true
  }
});
