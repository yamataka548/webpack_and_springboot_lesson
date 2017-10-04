const webpack = require('webpack');

module.exports = {
    entry: "./src/scripts/main.js",
    output: {
        filename: "app.js"
    },
    module: {
        loaders: [
            {test: /\.css$/, loader: 'style-loader!css-loader'},
            {test: /\.svg$/, loader: 'url-loader?mimetype=image/svg+xml'},
            {test: /\.woff$/, loader: 'url-loader?mimetype=application/font-woff'},
            {test: /\.woff2$/, loader: 'url-loader?mimetype=application/font-woff'},
            {test: /\.eot$/, loader: 'url-loader?mimetype=application/font-woff'},
            {test: /\.ttf$/, loader: 'url-loader?mimetype=application/font-woff'}
        ]
    },
    plugins: [
        // JSファイルのminifyを実行する
        new webpack.optimize.UglifyJsPlugin({
            // minify時でもソースマップを利用する
            sourceMap: true
        }),
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        })
    ],
    devtool: 'source-map'
};
