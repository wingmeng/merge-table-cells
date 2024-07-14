import { defineConfig } from 'vite';

export default defineConfig({
  build: {
    lib: {
      entry:  './lib/main.ts',
      name: 'mergeTableCells',
      fileName: 'merge-table-cells'
    },
    outDir: './dist'
  }
});
