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
                                    presets: ["es2017","es2016","es2015"],
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
                                limit:50000,   //小于50K的 都打包  
                                name:"[hash:8].[name].[ext]",  
                               // publicPath:"img/",  //替换CSS引用的图片路径 可以替换成爱拍云上的路径  
                                //outputPath:"../img/"        //生成之后存放的路径  
                            }  
                        },
	                    {
		                    test: /\.less$/,
		                    use: [{
		                        loader: "style-loader"
	                        }, {
		                        loader: "css-loader",
	                         },
	                        {
		                        loader: "less-loader"
	                        }]
	                    }
                    ]
                },

                plugins: [
                    new CopyWebpackPlugin([
                        {
                            from: 'res/images',
                            to: 'res/images'
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




