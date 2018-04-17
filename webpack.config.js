const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');   //样式抽取插件
var CommonsChunkPlugin = require("webpack/lib/optimize/CommonsChunkPlugin");//公共代码抽取插件

module.exports = {
    // entry 入口文件
    entry: {
        index: path.resolve(__dirname, './web/index.js'),
    },
    // output 编译后的js输出目录及名称
    output: {
        path: path.resolve(__dirname, './www/static/js'),   //指定编译后文件生成目录
        filename: '[name].bundle.js',
        chunkFilename:'[name].bundle.js',                   //未写在entry中的异步加载，将会单独打包出来，默认包名为[id].js,这里可以修改
        publicPath: "./static/js/"                          //指定html引用的虚拟目录，webpack会将未写在entry中的异步包按需自动填写到html中
    },
    resolve: {
        extensions: ['.js', '.jsx', '.less', '.css']
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /(\.js|\.jsx)$/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            'react', 'es2015', 'stage-0'
                        ],
                        "plugins": [
                            "transform-runtime",
                            "syntax-dynamic-import",
                            "transform-decorators-legacy",
                            "transform-class-properties"
                        ]
                    }
                },
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]"
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader?modules&localIdentName=[name]_[local]-[hash:base64:5]", "less-loader"]
                })
            }
        ]
    },
    plugins: [
        //样式抽取
        new ExtractTextPlugin("[name].bundle.css", { allChunks: true }),
        //公共代码抽取
        new CommonsChunkPlugin('common'),
        //全局挂载插件
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        //定义环境变量
        new webpack.DefinePlugin({
            //判断当前是否处于开发状态
            __DEV__: JSON.stringify(false),
            __SSR__: JSON.stringify(true)
        }),
        //启动热替换功能
        //    new webpack.HotModuleReplacementPlugin()

    ]
}