import { src, dest } from 'gulp'
// eslint-disable-next-line no-undef
const isProd = process.env.NODE_ENV === 'production'

const pug = require('gulp-pug')
const replace = require('gulp-replace')

/*
--- Импорт утилитарных модулей ---
--- ---
--- 1) с описанием путей к Файлам проекта
--- 2) модуль с константами и утилитами
*/
import PATH_TO from '../path-to'
import Helpers from '../helpers'
import ASSETS_CONF from '../assets-conf'

/*
=====================================================
------------------- ОСНОВНОЙ ТАСК -------------------
=====================================================
*/

export default function pugToHtml() {
  Helpers.pipeline(
      src(PATH_TO.src.pug.snippets + '**/*.pug'),
      pug(ASSETS_CONF.pug),
      dest(PATH_TO.build.snippets)
  )

  return Helpers.pipeline(
      src(PATH_TO.src.pug.to_html + '**/*.pug'),
      pug(ASSETS_CONF.pug),
      /*
        Реплейсер вхождений ##hot-bundle-js## для поддержки WP-Hot-Module-Replacement:
        заменяет кострукцию ##hot-bundle-js## на корректный адрес к файлу скриптов.

        ЕСЛИ триггериться prod-версия,
        то реплейсер подставляет адрес к итоговому минифицированному
        файлу скриптов "/js/main.min.js".

        ИНАЧЕ (т.е. для dev-версии) — устанавливается адрес к виртуальному
        банлду, ведущему в корень сайта: "/hot-bundle.js".
      */
      replace('##hot-bundle-js##', function handleReplace(match) {
        match = isProd ? './js/main.min.js' : './hot-bundle.js'
        return match
      }),
      replace('##hash##', Date.now()),
      dest(PATH_TO.build.root)
  )
}
