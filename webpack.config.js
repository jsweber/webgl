var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var entry = require("./webpack.entry");
var plugins = require("./webpack.plugins");

var testData = require("./mockdata/testData");
var config = require("./output.config");

module.exports = {
    entry:entry,
    output:{
        filename:"assets/[name].bundle.js",  //这里可以改成assets/[name].js从而达到html和js分开的目的，当然HtmlWebpackPlugin里的filename ../要去掉
        path:path.resolve(__dirname,"dist"),
        publicPath:"/"
    },
    devtool:"inline-source-map",
    resolve:{
        alias:{
            //起初只是相对路径才没成功
            jquery$:path.resolve(__dirname,"./lib/jquery.min.js")
        }
    },
    module:{
        rules:[
            {
                test:/\.css$/,
                use:ExtractTextPlugin.extract({
                    use:"css-loader",
                    fallback:"style-loader"
                })
            },
            {
                test:/\.scss$/,
                loader: ExtractTextPlugin.extract({
                    fallbackLoader: "style-loader",
                    loader: "css-loader!sass-loader",
                }),
            },
            {
                test:/\.js$/,
                exclude:/(node_modules|bower_components)/,
                loader:'babel-loader',
                query:{
                    presets:['es2015']
                }
            }
        ]
    },
    plugins:plugins,
    devServer:{
        contentBase:path.join(__dirname,"dist"),
        publicPath:"/",
        historyApiFallback:true,
        hot:true,
        inline:true,
        // compress:true,
        noInfo:true,
        port:9000,
        setup:function (app) {
            app.get("/api/test",function (req,res) {
                res.json(testData);
            })
        },
    }

}

