// Core Plugins
import vituum from 'vituum'
import pages from 'vituum/plugins/pages'
import pug from '@vituum/vite-plugin-pug'
import autoprefixer from 'autoprefixer'

// Custom Plugins
import customStackSvgPlugin from './custom-vite-plugins/custom-stack-svg-plugin'

export default {
  base: './',
  server: {
    open: true,
    port: 9000,
  },
  build: {
    outDir: 'build',
    minify: true,
    emptyOutDir: true,
    sourcemap: false,
    rollupOptions: {
      input: './src/pug/to-html/*.pug',
      output: {
        assetFileNames: (assetInfo) => 'assets/[name].[ext]',
        chunkFileNames: (chunkInfo) => 'assets/[name].js',
      },
    },
  },
  css: {
    devSourcemap: true,
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
      }
    },
    postcss: {
      plugins: [
        autoprefixer(),
      ],
    },
  },
  plugins: [
    customStackSvgPlugin({
      pathToSpriteIcns: './public/img/icons/',
      output: './public/img/sprite.svg',
    }),
    vituum(),
    pug({
      root: './src/pug/to-html',
    }),
    pages({
      dir: './src/pug/to-html',
      normalizeBasePath: true,
    }),
  ]
}
