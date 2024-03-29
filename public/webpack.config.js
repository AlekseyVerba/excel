const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin').CleanWebpackPlugin;
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle-[hash].js',
  },
  resolve: {
    extensions: ['.ts','.js'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@core': path.resolve(__dirname, 'src/core/'),
      '@сomponents': path.resolve(__dirname, 'src/components/'),
      '@types': path.resolve(__dirname, 'src/types/'),
      '@redux': path.resolve(__dirname, 'src/redux/'),
    }
  },
  devtool: 'source-map',
  devServer: {
    static: {
        directory: path.join(__dirname, 'dist'),
    },
    watchFiles: ["./src"],
    compress: false,
    port: 3000,
    hot: true,
    open: true
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        enforce: 'pre',
        loader: 'ts-loader',
        options: {
          configFile: 'tsconfig.json'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              
            },
          },
          'css-loader',
          // 'postcss-loader',
          'sass-loader',
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: '**/*',
          context: path.resolve(__dirname, 'src', 'assets'),
          to: './assets',
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      filename: 'index.html',
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: 'style-[hash].css',
    }),
  ],
};