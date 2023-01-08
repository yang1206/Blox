import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['./src/index.ts'],
  clean: true,
  outDir: './lib',
  format: ['esm', 'cjs'],
  dts: true,
  minify: true,
})
