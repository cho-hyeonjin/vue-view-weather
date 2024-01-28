const path = require("path");
const HtmlPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");

module.exports = {
  resolve: {
    extensions: [".js", ".vue"],
    alias: {
      "~": path.resolve(__dirname, "src"),
      assets: path.resolve(__dirname, "src/assets"),
      icons: path.resolve(__dirname, "public/icons"),
    },
  },
  entry: "./src/main.js",

  output: {
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: ["vue-loader"],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/, // SVG를 인라인으로 처리하려면 ?inline을 사용
            use: "vue-svg-loader",
          },
          {
            use: ["file-loader"],
          },
        ],
      },
      {
        test: /\.s?css$/,
        use: [
          "vue-style-loader",
          "style-loader",
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: "file-loader",
      },
    ],
  },

  plugins: [
    new HtmlPlugin({
      template: "./index.html",
    }),
    new CopyPlugin({
      patterns: [{ from: "static" }],
    }),
    new VueLoaderPlugin(),
  ],

  devServer: {
    host: "localhost",
    port: 8000,
    hot: true,
  },
};
