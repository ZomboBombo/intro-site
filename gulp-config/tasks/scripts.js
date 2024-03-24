/*
 ** Служебные комментарии от ESLint
 ** для корректной работы require()
 */

/* eslint no-undef: "error" */
/* eslint-env node */

// --- Файлы с настройками для Webpack ---
import webpackStream from 'webpack-stream'
const webpackConfig = require('../../webpack.config.js')

// --- Gulp-утилиты ---
import { src, dest } from 'gulp'


/*
--- Импорт утилитарных модулей ---
--- ---
--- 1) с описанием путей к Файлам проекта
--- 2) модуль с константами и утилитами
*/
import PATH_TO from '../path-to'
import Helpers from '../helpers'


/*
=====================================================
------------------- ОСНОВНОЙ ТАСК -------------------
=====================================================
*/

// *** Сборка всех JS-файлов ***
export default function scripts() {
  return Helpers.pipeline(
      src(PATH_TO.src.js.main_file),
      webpackStream(webpackConfig),
      dest(PATH_TO.build.js)
  )
}
