import { fileURLToPath } from "url";
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default {
  mode: "development",
  entry: {
    app: "./app/public/scripts/app/app.js",
    vendor: "./app/public/scripts/vendor/vendor.js",
  },
  output: {
    path: path.resolve(__dirname, "./app/public/scripts"),
    filename: "[name]-bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-syntax-dynamic-import"],
          },
        },
      },
    ],
  },
  resolve: {
    fallback: {
      path: ["path-browserify"],
      os: ["os-browserify"],
      crypto: ["crypto-browserify"],
      stream: ["stream-browserify"],
    },
  },
  devtool: "cheap-module-source-map",
};
