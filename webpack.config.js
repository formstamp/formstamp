var etx = require("extract-text-webpack-plugin");

module.exports = {
  context: __dirname + "/src",
  entry: "./coffee/formstamp.coffee",
  output: {
    path: __dirname + "/dist",
    filename: "formstamp.js"
  },
  module: {
    loaders: [
      { test: /\.coffee$/, loader: "coffee-loader" },
      { test: /\.less$/,   loader: etx.extract("style-loader", "css-loader!less-loader")},
      { test: /\.css$/,    loader: etx.extract("style-loader", "css-loader") },
      { test: /templates\/.*?\.html$/,   loader: "ng-cache?prefix=templates/fs/" },
      { test: /\.(png|gif|jpg)$/, loader: 'url-loader?limit=100000' }
    ]
  },
  plugins: [
    new etx("formstamp.css", {})
  ],
  resolve: { extensions: ["", ".webpack.js", ".web.js", ".js", ".coffee", ".less"]}
};
