/*
 ** Служебные комментарии от ESLint
 ** для корректной работы require()
 */

/* eslint no-undef: "error" */
/* eslint-env node */


import { src, dest } from 'gulp'

// --- CSS-утилиты ---
import csso from 'gulp-csso'
import postcss from 'gulp-postcss'
import autoprefixer from 'autoprefixer'

// --- Препроцессорные утилиты ---
import dartSass from 'sass'
import gulpSass from 'gulp-sass'
const sass = gulpSass(dartSass)
import plumber from 'gulp-plumber'
import sourcemap from 'gulp-sourcemaps'

// --- Вспомогательные утилиты ---
import rename from 'gulp-rename'

/*
--- Импорт утилитарных модулей ---
--- ---
--- 1) с описанием путей к Файлам проекта
--- 2) модуль с константами и утилитами
*/
import PATH_TO from '../path-to'
import ASSETS_CONF from '../assets-conf'
import Helpers from '../helpers'


/*
=====================================================
------------------- ОСНОВНОЙ ТАСК -------------------
=====================================================
*/

// *** Обработка всех SCSS-файлов и преобразование их в CSS-файлы ***
export function css() {
  return Helpers.pipeline(
      src(PATH_TO.src.sass.main_style_file),
      plumber(),
      sourcemap.init(),
      sass(ASSETS_CONF.css.scss),
      postcss([
        autoprefixer(ASSETS_CONF.css.autoprefixer)
      ]),
      dest(PATH_TO.build.css),
      csso(),
      rename('styles.min.css'),
      sourcemap.write('.'),
      dest(PATH_TO.build.css),
      Helpers.server.stream()
  )
}

export function cssMin() {
    return Helpers.pipeline(
        src(PATH_TO.src.sass.main_style_file),
        plumber(),
        sass(ASSETS_CONF.css.scss),
        postcss([
          autoprefixer(ASSETS_CONF.css.autoprefixer)
        ]),
        csso(),
        rename('styles.min.css'),
        dest(PATH_TO.build.css),
    )
}
