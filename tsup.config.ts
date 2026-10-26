
import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: ['src/index.ts', 'src/parser.ts'],
    format: ['esm'],
    dts: true,
    clean: true,
    outDir: 'dist',
  },
  {
    entry: ['src/index.cts', 'src/parser.cts'],
    format: ['cjs'],
    dts: false,
    clean: false,
    outDir: 'dist',
    outExtension() {
      return { js: '.cjs' };
    },
  },
]);
