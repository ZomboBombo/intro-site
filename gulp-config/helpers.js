/* eslint no-undef: "error" */
/* eslint-env node */


// --- Вспомогательные утилиты ---
const { pipeline } = require('readable-stream')

// --- Серверные утилиты ---
const browserSync = require('browser-sync').create()


export default {
  pipeline,
  server: browserSync,
}
