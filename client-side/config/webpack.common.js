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
                test: /\.css$/,
                include: helpers.root('src', 'public/app'),
                loader: 'raw-loader'
            },
            {
                test: /\.html$/,
                loader: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                loader: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\^favicon?/,
                loader: 'file-loader?name=favicon.[ext]'
            }
        ]
    },
    plugins: [
        // Workaround for angular/angular#11580
        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)@angular/,
            helpers.root('src') // location of your src
            // {} // a map of your routes
        ),

        new webpack.ContextReplacementPlugin(
            // The (\\|\/) piece accounts for path separators in *nix and Windows
            /angular(\\|\/)core(\\|\/)(esm(\\|\/)dist|dist)(\\|\/)linker/,
            helpers.root('dist') // location of your client
        ),

        new webpack.optimize.CommonsChunkPlugin({
            name: ['app', 'vendor', 'polyfills']
        }),

        new HtmlWebpackPlugin({
            template: 'src/public/index.html'
        })
    ]
}

module.exports = config;
