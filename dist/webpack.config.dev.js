"use strict";

var path = require('path');

var HtmlWebpackPlugin = require('html-webpack-plugin');

var _require = require('clean-webpack-plugin'),
    CleanWebpackPlugin = _require.CleanWebpackPlugin;

var CopyPlugin = require('copy-webpack-plugin');

var MiniCssExtractPlugin = require('mini-css-extract-plugin');

var OptimazeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');

var TerserWebpackPlugin = require('terser-webpack-plugin');

var _require2 = require('webpack-bundle-analyzer'),
    BundleAnalyzerPlugin = _require2.BundleAnalyzerPlugin;

var isDev = process.env.NODE_ENV === 'development';
var isProd = !isDev;

var optimization = function optimization() {
  var config = {
    splitChunks: {
      chunks: 'all'
    }
  };

  if (isProd) {
    config.minimizer = [new OptimazeCssAssetPlugin(), new TerserWebpackPlugin()];
  }

  return config;
};

var filename = function filename(ext) {
  return isDev ? "[name].".concat(ext) : "[name].[hash].".concat(ext);
};

var cssLoaders = function cssLoaders(extra) {
  var loaders = [{
    loader: MiniCssExtractPlugin.loader,
    options: {
      hmr: isDev,
      reloadAll: true
    }
  }, 'css-loader'];

  if (extra) {
    loaders.push(extra);
  }

  return loaders;
};

var jsLoaders = function jsLoaders() {
  var loaders = [{
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env']
    }
  }]; // if (isDev) {
  //     loaders.push('eslint-loader')
  // }

  return loaders;
};

var plugins = function plugins() {
  var base = [new HtmlWebpackPlugin({
    template: './index.html',
    minify: {
      collapseWhitespace: isProd
    }
  }), new CleanWebpackPlugin(), // new CopyPlugin({
  //     patterns: [
  //         {
  //             from: path.resolve(__dirname, './src/img'),
  //             to: path.resolve(__dirname, './docs/img')
  //         },
  //     ]
  // }),
  new MiniCssExtractPlugin({
    filename: filename('css')
  })];

  if (isProd) {
    base.push(new BundleAnalyzerPlugin());
  }

  return base;
};

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.js']
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'docs')
  },
  resolve: {
    extensions: ['.js', '.json', '.png'],
    alias: {
      '@models': path.resolve(__dirname, 'src/models'),
      '@': path.resolve(__dirname, 'src')
    }
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev
  },
  devtool: isDev ? 'source-map' : '',
  plugins: plugins(),
  module: {
    rules: [{
      test: /\.css$/,
      use: cssLoaders()
    }, {
      test: /\.less$/,
      use: cssLoaders('less-loader')
    }, {
      test: /\.s[ac]ss$/,
      use: cssLoaders('sass-loader')
    }, {
      test: /\.(png|jpg|svg|gif|ico)$/,
      use: ['file-loader']
    }, {
      test: /\.(ttf|woff|woff2|eot)$/,
      use: ['file-loader']
    }, {
      test: /\.js$/,
      exclude: /node_modules/,
      use: jsLoaders()
    }]
  }
};