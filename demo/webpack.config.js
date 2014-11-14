var etx = require("extract-text-webpack-plugin");

module.exports = {
  context: __dirname + "/src",
  entry: "./coffee/app.coffee",
  output: {
    path: __dirname + "/build",
    filename: "app.js"
  },
  module: {
    loaders: [
      { test: /\.coffee$/, loader: "coffee-loader" },
      { test: /\.png$/, loader: "file-loader" },
      { test: /\.gif$/, loader: "file-loader" },
      { test: /\.ttf$/, loader: "file-loader" },
      { test: /\.less$/,   loader: etx.extract("style-loader","css-loader!less-loader")},
      { test: /\.css$/,    loader: etx.extract("style-loader", "css-loader") },
      { test: /templates\/.*?\.html$/,   loader: "ng-cache?prefix=templates/fs/" },
      { test: /\.md$/, loader: "html!markdown" },
      { test: /views\/.*?\.html$/,   loader: "ng-cache?prefix=views/" }
    ]
  },
  plugins: [
    new etx("app.css", {})
  ],
  resolve: { extensions: ["", ".webpack.js", ".web.js", ".js", ".coffee", ".less"]}
};
