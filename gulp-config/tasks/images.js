import { src, dest } from 'gulp'

// --- Оптимизация изображений ---
import imagemin from 'gulp-imagemin'
import webp from 'gulp-webp'
import svgstore from 'gulp-svgstore'

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

// --- Список составных путей к наборам изображений в разных форматах ---
const path_to_images_set = {
  of_all_formats: `${PATH_TO.src.img}**/*.{png,jpg,svg}`,
  of_bitmaps: `${PATH_TO.src.img}**/*.{png,jpg}`,
  of_svg_icons: `${PATH_TO.src.img}**/{logo,icon-*}.svg`,
}


// *** Оптимизация изображений ***
export const optimizeImages = () => {
  return Helpers.pipeline(
      src(path_to_images_set.of_all_formats),
      imagemin([
        imagemin.optipng(ASSETS_CONF.images.optipng),
        imagemin.mozjpeg(ASSETS_CONF.images.mozjpeg),
        imagemin.svgo({
          plugins: [ASSETS_CONF.images.svgo],
        })
      ]),
      dest(PATH_TO.build.img)
  )
}


// *** Переформатирование изображений в WebP ***
export const transformToWebp = () => {
  return Helpers.pipeline(
      src(path_to_images_set.of_bitmaps),
      webp(ASSETS_CONF.images.webp),
      dest(PATH_TO.build.img)
  )
}


// *** Сборка SVG-спрайта ***
export const sprite = () => {
  return Helpers.pipeline(
      src(path_to_images_set.of_svg_icons),
      svgstore({
        inlineSvg: true,
      }),
      rename('sprite.svg'),
      dest(PATH_TO.build.img)
  )
}

// *** Функция для ручной оптимизации изображений ***
export const imagesoptimisation = () => {
  optimizeImages()
  transformToWebp()
}
