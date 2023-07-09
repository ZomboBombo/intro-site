/*
 ** Служебные комментарии от ESLint
 ** для корректной работы require()
 */

/* eslint no-undef: "error" */
/* eslint-env node */


import { src, dest } from 'gulp';

/*
--- Импорт утилитарных модулей ---
--- ---
--- 1) с описанием путей к Файлам проекта
--- 2) модуль с константами и утилитами
*/
import PATH_TO from '../path-to';
import ASSETS_CONF from '../assets-conf';
import Helpers from '../helpers';


/*
=====================================================
------------------- ОСНОВНОЙ ТАСК -------------------
=====================================================
*/

// *** Копирование файлов ***
export default function copy() {
  return Helpers.pipeline(
      src([
        `${PATH_TO.src.fonts}**/*.{${ASSETS_CONF.fonts.extension}}`,
        `${PATH_TO.src.img}**/*.{${ASSETS_CONF.images.extension}}`,
        `${PATH_TO.src.favicons}**/*.*`,
        `!${PATH_TO.src.favicons}**/*.ico`
      ], {
        base: PATH_TO.src.root,
      }),
      dest(PATH_TO.build.root),

      src(`${PATH_TO.src.favicons}favicon.ico`),
      dest(PATH_TO.build.root)
  );
}
