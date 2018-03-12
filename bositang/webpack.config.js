var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = new Promise((resolve, reject) => {
    var glob = require('glob');
    var fs = require('fs');

    glob('pages/**/*.html', (err, files) => {
        resolve(
            {
                entry: './src/main.entry.js',
                output: {
                    publicPath: '/',
                    filename: './res/js/[name].[chunkhash].js',
                   /* publicPath: 'http://127.0.0.1:8020/bositang/dist/',
                    filename: 'res/js/[name].[chunkhash].js',*/
                    path: path.resolve(__dirname, 'dist'),
                },
                devServer: {
                    contentBase: false,
                    proxy: {
                        '/api': {
                            changeOrigin: true,
                            target: 'http://630199fd.ngrok.io',
                            secure: false
                        }
                    }
                },

                module: {
                    rules: [
                        {
                            test: /\.js$/,
                            exclude: /node_modules/,
                            use: {
                                loader: 'babel-loader',
                                options: {
                                    presets: ["es2017"],
                                    cacheDirectory: true
                                }
                            }
                        },
                        {
                            test: /\.css$/,
                            use: ['style-loader', 'css-loader']
                        },
                        {
                            test: /\.(png|jpg|gif|svg|eot|ttf|woff|woff2)$/,
                            loader: 'url-loader',
                            options: {
                                limit: 10000
                            }
                        }
                    ]
                },

                plugins: [
                    new CopyWebpackPlugin([
                        {
                            from: 'res/img',
                            to: 'res/img'
                        },
                        {
                            from: 'res/fonts',
                            to: 'res/fonts'
                        }
                    ], {})].concat(files.concat(['index.html']).map((file) => {
                    // 配置入口HTML
                    return new HtmlWebpackPlugin({
                        filename: file,
                        template: `!!raw-loader!${file}`
                    })
                }))
            });
    });
});




