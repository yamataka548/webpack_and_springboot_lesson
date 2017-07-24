const webpack = require('webpack');

module.exports = {
  entry: "./src/scripts/main.js",
  output: {
    filename: "app.js"
  },
  plugins: [
      // JSファイルのminifyを実行する
      new webpack.optimize.UglifyJsPlugin({
          // minify時でもソースマップを利用する
          sourceMap: true
      })
  ],
  devtool: 'source-map'
};
