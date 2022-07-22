const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const { readdirSync } = require('fs');

const getAllItems = searchPath => readdirSync(searchPath).map(p => path.resolve(searchPath, p));
const getAllSubDir = searchPath => readdirSync(searchPath, { withFileTypes: true }).filter(s => s.isDirectory()).map(p => path.resolve(searchPath, p.name));

const injectedPath = path.resolve(__dirname, "..", "src", "features");

const injectedDirectories = getAllSubDir(injectedPath).map(p => path.resolve(p, "injected"));
console.log(injectedDirectories)

const injectedScripts = injectedDirectories.map(p => getAllItems(p)).flat()
console.log(injectedScripts)

const userEntries =
{
   config_setup: path.resolve(__dirname, "..", "src", "view", "config_setup.ts"),
   popup_setup: path.resolve(__dirname, "..", "src", "view", "popup_setup.ts"),
   background: path.resolve(__dirname, "..", "src", "background.ts"),
};

const entries = injectedScripts.reduce(function (obj, el) {
   obj[path.parse(el).name] = el;
   return obj
}, userEntries)

module.exports = {
   mode: "development",
   devtool: "inline-source-map",
   entry: entries,
   output: {
      path: path.join(__dirname, "../dist"),
      filename: "[name].js",
   },
   resolve: {
      extensions: [".ts", ".js"],
   },
   module: {
      rules: [
         {
            test: /\.tsx?$/,
            loader: "ts-loader",
            exclude: /node_modules/,
         },
      ],
   },
   plugins: [
      new CopyPlugin({
         patterns: [
            { from: ".", to: ".", context: "public" },
         ]
      }),
   ],
};