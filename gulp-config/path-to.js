export default {
  /*
  ===========================
  --- Директория "src/" ---
  ===========================
  */
  src: {
    root: './src/',
    pug: {
      root: './src/pug/',
      to_html: './src/pug/to-html/',
    },
    sass: {
      root: './src/sass/',
      main_style_file: './src/sass/styles.scss',
    },
    js: {
      root: './src/js/',
      main_file: './src/js/common.js',
    },
    fonts: './src/fonts/',
    img: './src/img/',
    favicons: './src/favicons/',
  },


  /*
  ===========================
  --- Директория "build/" ---
  ===========================
  */
  build: {
    root: './build/',
    css: './build/css/',
    js: './build/js/',
    img: './build/img/',
    snippets: './build/snippets/',
  },
};
