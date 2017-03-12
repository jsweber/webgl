var path = require("path");
var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var entry = require("./webpack.entry");

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
        // new webpack.optimize.UglifyJsPlugin({   //開發過程不建議使用
        //     compress:{
        //         warnings:false
        //     }
        // }),
        new ExtractTextPlugin('assets/[name].css'),
        new HtmlWebpackPlugin({
            filename:"demo0.html",
            template:"./app/demo0/demo0.html",
            chunks:["demo0"],
            inject:true
        }),
        new HtmlWebpackPlugin({
            filename:"demo1.html",
            template:"./app/demo1/demo1.html",
            chunks:["demo1"],
            inject:true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:"common",
            filename:"assets/common.js",
            minChunks:Infinity  //加了這個后，common.js就能自動引入頁面了
        }),
        new webpack.HotModuleReplacementPlugin(),
        // new webapck.ProvidePlugin({
        //     $:'jquery'
        // })
    ],
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

