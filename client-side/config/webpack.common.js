var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var helpers = require('./helpers');
// var OptimizeCssAssestsPlugin = require("optimize-css-assets-webpack-plugin");

// var BUILD_DIR = path.resolve(__dirname, "../public/build");
// var PUBLIC_DIR = path.resolve(__dirname, "../public/");
process.noDeprecation = true;

var config = {
    entry: {
        'app': './src/main.ts',
        'polyfills': "./src/polyfills.ts",
        'vendor': "./src/vendor.ts"
    },
    // output: {
    //     path: BUILD_DIR,
    //     filename: "bundle.js",
    //     publicPath: "/build/"
    // },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                loaders: [
                    {
                        loader: 'awesome-typescript-loader',
                            options: { configFileName: helpers.root('src', 'tsconfig.json')}
                    } , 'angular2-template-loader'
                ]
            },
            {
                test: /\.scss$/,
                exclude: helpers.root('src', 'public/app'),
                loader: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [
                        "css-loader",
                        "sass-loader"
                    ]
                })
            },
            {
                test: /\.scss$/,
                include: helpers.root('src', 'public/app'),
                use: [{
                    loader: "style-loader" // creates style nodes from js strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "sass-loader" // compiles Sass to Css
                }]
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            }
        ]
    },
    plugins: [
        // new ExtractTextPlugin("./main.css"),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/public/index.html'
        })
    ]
}

module.exports = config;
