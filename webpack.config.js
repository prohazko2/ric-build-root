const path = require("path");
const glob = require("glob");

const env = process.env["NODE_ENV"] || "development";

const config = {
  entry: {
    //examples: "./user_modules/examples/js/index.tsx",
  },
  mode: env,
  devtool: "source-map",

  experiments: {
    topLevelAwait: true,
  },

  resolve: {
    extensions: [".tsx", ".ts", ".js", ".css"],
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
        options: { name: "[name]_[hash]", symbolId: "[name]-[hash:6]" },
      },
      {
        test: /\.jade$/,
        loader: "pug-loader",
      },
    ],
  },
  externals: {
    /* ric internal libs - legacy */
    util: "util",
    common: "common",
    ui: "ui",

    /* ric internal libs - modern alias */
    "@rightech/ui": "@rightech/ui",
    "@rightech/ui/core": "@rightech/ui/core",
    "@rightech/ui/util": "@rightech/ui/util",

    /* runtimes */
    "jade/lib/runtime": "jade/lib/runtime",
    "core-js/stable": "core-js/stable",
    "regenerator-runtime/runtime": "regenerator-runtime/runtime",

    /* already bundled libs, 
       but you can provide your own */
    jquery: "jquery",
    slickgrid: "slickgrid",
    "popper.js": "popper",

    leaflet: "leaflet",
    "leaflet-routing-machine": "leaflet-routing-machine",

    react: "react",
    "react-dom": "react-dom",
    "prop-types": "prop-types",
    "react-select": "react-select",
    "fixed-data-table-2": "fixed-data-table-2",
    "react-markdown": "react-markdown",
    "react-virtualized": "react-virtualized",

    mobx: "mobx",
    "mobx-react": "mobx-react",
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

glob.sync("user_modules/*/js/index.{ts,tsx}").forEach((file) => {
  const full = path.resolve(__dirname, file);
  const name = path.basename(path.dirname(path.resolve(full, "..")));
  config.entry[name] = full;
});

module.exports = config;
