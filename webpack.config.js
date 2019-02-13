const webpack = require('webpack');
const ManifestPlugin = require('webpack-manifest-plugin');
const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require('terser-webpack-plugin');
const devMode = process.env.NODE_ENV !== 'prod'

const plugins = [
    new ManifestPlugin({
        fileName: 'manifest.json',
        publicPath: 'build/',
        basePath: 'build/'
    }),
    new CleanWebpackPlugin(path.resolve(__dirname, 'public/build'), {watch: false}),
    new MiniCssExtractPlugin({
        filename: 'css/app.css'
    }),
    new webpack.ProvidePlugin({
        "React": "react",
    })
];

module.exports = {
    mode: devMode ? 'development' : 'production',
    cache: true,
    node: { __filename: true },
    entry: {
        app: path.resolve(__dirname, 'assets/js/app.js')
    },
    output: {
        filename: 'js/[name].js',
        path: path.resolve(__dirname, 'public/build')
    },
    resolve: {
        extensions: [".js", ".json"],
        alias: {
            assets: path.resolve(__dirname, 'assets')
        }
    },
    performance: {
        maxEntrypointSize: 800000,
        maxAssetSize: 800000
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                loader: 'babel-loader'
            },
            {
                test: /\.js?$/,
                loader: 'imports-loader?define=>false'
            },
            {
                test: /\.css$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.scss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
            },
            {
                test: /\.png/,
                loader: "url-loader"
            },
            {
                test: /\.jpg/,
                loader: "url-loader"
            },
            {
                test: /\.svg/,
                loader: "url-loader"
            },
            {
                test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    }
                }]
            }
        ],
    },
    optimization: {
        minimizer: [new TerserPlugin()],
        splitChunks: {
            chunks: 'all',
            cacheGroups: {
                vendors: {
                    test: /[\\/]node_modules[\\/]/,
                    filename: devMode ? 'js/vendor.js' : 'js/vendor.[hash:8].js',
                    chunks: "all",
                    priority: 1
                }
            }
        }
    },
    plugins: plugins
};
