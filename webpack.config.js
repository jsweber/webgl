var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var entry = require("./webpack.entry");

var testData = require("./mockdata/testData");

module.exports = {
    entry:entry,
    output:{
        filename:"[name].js",
        path:path.resolve(__dirname,"dist","[name]","assets"),
        publicPath:"/assets/"
    },
    devtool:"cheap-module-eval-source-map",
    module:{
        rules:[{
            test:/\.css$/,
            use:ExtractTextPlugin.extract({
                use:"css-loader",
                fallback:"style-loader"
            })
        }]
    },
    plugins:[
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            }
        }),
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            filename:"../index.html",
            template:"./",
            inject:true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:"commons",
            filename:"commons.js",
            minChunks:2
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        contentBase:path.join(__dirname,"dist"),
        publicPath:"/assets/",
        historyApiFallback:true,
        hot:true,
        inline:true,
        compress:true,
        noInfo:true,
        port:9000,
        setup:function (app) {
            app.get("/api/test",function (req,res) {
                res.json(testData);
            })
        },
    }

}

