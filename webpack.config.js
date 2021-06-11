const fs = require("fs");
const path = require("path");

const env = process.env["NODE_ENV"] || "development";

const config = {
  entry: {
    examples: "./user_modules/examples/js/index.tsx",
  },
  mode: env,
  watch: env === "development",
  devtool: "source-map",
  experiments: {
    topLevelAwait: true,
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "esbuild-loader",
        options: {
          loader: "tsx",
          target: "es2020",
        },
        exclude: /node_modules/,
      },
      {
        test: /.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: true,
              modules: true,
            },
          },
        ],
        exclude: /\.global\.css$/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        include: /\.global\.css$/,
      },
      {
        test: /\.svg$/,
        loader: "svg-sprite-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"],
  },
  externals: {
    common: "common",
    util: "util",
    ui: "ui",

    react: "react",
    "react-dom": "react-dom",
  },
  output: {
    publicPath: "/",
    filename: "js/[name].js",
    library: "[name]",
    libraryTarget: "umd",
    path: path.resolve(__dirname, "./user_modules/_public"),
  },
  plugins: [],
};

module.exports = config;
