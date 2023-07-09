export default {
  fonts: {
    extension: 'woff,woff2,eot,ttf',
  },
  images: {
    extension: 'png,webp,jpg,jpeg,svg',
    mozjpeg: {
      quality: 90,
      progressive: true,
    },
    optipng: {
      optimizationLevel: 5,
    },
    svgo: {
      removeViewBox: false,
      removeUselessStrokeAndFill: true,
    },
    webp: {
      quality: 90,
    },
  },
  css: {
    autoprefixer: {
      grid: true,
    },
    scss: {
      outputStyle: 'expanded',
      precision: 8,
      errLogToConsole: true,
    },
  },
  pug: {
    pretty: true,
  },
};
