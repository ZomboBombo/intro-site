import { series } from 'gulp'

/*
  Webpack-настройки для поддержки Hot-Module-Replacement (HMR)
*/
import webpack from 'webpack'
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const webpackConfig = require('./webpack.config')
const webpackCompiler = webpack(webpackConfig)

// --- Импортирование кастомных модулей из директории "gulp-config/tasks" ---
import pugToHtml from './gulp-config/tasks/pug'
import { css, cssMin } from './gulp-config/tasks/css'
import scripts from './gulp-config/tasks/scripts'
import { sprite, imagesoptimisation } from './gulp-config/tasks/images'
import copy from './gulp-config/tasks/copy'
import clean from './gulp-config/tasks/clean'

// --- Импорт утилитарного модуля ---
import Helpers from './gulp-config/helpers'


/*
=====================================================
----------------------- ТАСКИ -----------------------
=====================================================
*/

// --- Основной таск для поднятия сервера ---
function server(done) {
  Helpers.server.init({
    server: {
      baseDir: './build',
      index: 'index.html',

      middleware: [
        webpackDevMiddleware(webpackCompiler, {
          publicPath: webpackConfig.output.publicPath,
          stats: {
            colors: true,
          },
        }),
        webpackHotMiddleware(webpackCompiler),
      ],
    },

    notify: false,
    open: true,
    port: 9000,
    injectchanges: true,

    files: [
      {
        match: ['src/pug/**/*.pug'],
        fn: series(pugToHtml, refresh),
      },
      {
        match: ['src/sass/**/*.{scss,sass}'],
        fn: series(css),
      },
      {
        match: ['src/images/**/*.{jpg,png}'],
        fn: series(imagemin, refresh),
      },
      {
        match: ['src/images/**/icon-*.svg'],
        fn: series(sprite, refresh),
      },
    ],
  })

  done()
}

// --- Таск для перезагрузки страницы в браузере ---
function refresh(done) {
  Helpers.server.reload()
  done()
}

// --- Таск оптимизации изображений ---
function imagemin(done) {
  imagesoptimisation()
  done()
}


/*
==========================================================================
--- Основные задачи для Сборки проекта в 'продакшн' и поднятие Сервера ---
==========================================================================
*/

// --- Таск для Сборки проекта БЕЗ поднятия сервера ---
const prod_build = series(clean, copy, cssMin, scripts, sprite, pugToHtml, imagemin)
const dev_build = series(clean, copy, css, sprite, pugToHtml, imagemin)

exports.build = prod_build
exports.start = series(dev_build, server)

export { clean, copy, css, scripts, sprite, pugToHtml }
