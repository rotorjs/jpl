import react from '@vitejs/plugin-react';
import { readdirSync } from 'fs';
import { basename, extname, join } from 'path';
import dts from 'unplugin-dts/vite';
import { defineConfig } from 'vite';
import packages from './package.json';

type Packages = {
  dependencies?: Record<string, unknown>;
  peerDependencies?: Record<string, unknown>;
};
const pkg = packages as Packages;

function createEntrypoints(base: string, outputPrefix?: string) {
  return Object.fromEntries(
    readdirSync(join('lib', base)).map((name) => [
      join(outputPrefix ?? '', base, basename(name, extname(name))),
      join('lib', base, basename(name, extname(name))),
    ]),
  );
}

// https://vite.dev/config/
export default defineConfig({
  server: { host: '0.0.0.0', port: 8080, allowedHosts: true },
  plugins: [
    react(),
    dts({ tsconfigPath: './tsconfig-build.json', outDirs: 'dist/types' }),
  ],
  publicDir: 'demo/public',
  resolve: { tsconfigPaths: true },
  build: {
    lib: {
      entry: {
        'esm/main': 'lib/main',
        'esm/presets': 'lib/presets',
        ...createEntrypoints('vars', 'esm'),
      },
      formats: ['es'],
    },
    copyPublicDir: false,
    rollupOptions: {
      external: [
        ...Object.keys({
          ...pkg.dependencies,
          ...pkg.peerDependencies,
        }),
        'react/jsx-runtime',
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: 'assets/[name][extname]',
        entryFileNames: '[name].js',
      },
    },
  },
});
