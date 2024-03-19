import path from 'path';
import webpack from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';

const webpackHotMiddlewareConfig = 'webpack-hot-middleware/client?path=/__webpack_hmr&timeout=2000&reload=true&overlay=true/';
const TerserPlugin = require('terser-webpack-plugin');
const isProd = process.env.NODE_ENV === 'production';
const isDev = !isProd;

/*
  Объект с "входными точками" для компиляции
  JS-скриптов из разных источников.

  Например, может потребоваться поддержка локальных
  vendor-библиотек.
*/
const EntryPoints = {
  main: './js/main.js',
};

if (isDev) {
  /*
    Конструкция для добавления конфигурации WP-Hot-Module-Replacement (WP-HMR)
    для всех "входных точек".

    Задействуется ТОЛЬКО в dev-версии проекта.
    В prod-версию никакие файлы и настройки для WP-HMR не попадают.
  */
  Object.keys(EntryPoints).forEach(
    (entry) => (EntryPoints[entry] = [webpackHotMiddlewareConfig].concat(EntryPoints[entry]))
  );
}


module.exports = {
  context: path.resolve(__dirname, 'src/'),
  mode: 'development',
  entry: EntryPoints,
  devtool: isDev ? 'source-map' : false,
  output: {
    filename: () => {
      return isDev ? 'hot-bundle.js' : '[name].min.js';
    },
    path: path.resolve(__dirname, 'build/js'),
    publicPath: '',
    hotUpdateChunkFilename: 'hot/hot-update.js',
    hotUpdateMainFilename: 'hot/hot-update.json'
  },
  optimization: {
    minimize: isDev ? false : true,
    minimizer: [
      new TerserPlugin({
        extractComments: false,
      })
    ],
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env'],
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};
