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
        filename:"[name].js",
        path:path.resolve(__dirname,"dist",config.name,"assets"),
        publicPath:"/"+config.name+"/assets/"
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
        new webpack.optimize.UglifyJsPlugin({
            compress:{
                warnings:false
            }
        }),
        new ExtractTextPlugin('[name].css'),
        new HtmlWebpackPlugin({
            title:config.name,
            filename:"../"+config.name+".html",
            template:"./app/"+config.name+"/"+config.name+".html",
            inject:true
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name:config.name,
            filename:config.name+".js",
            minChunks:2
        }),
        new webpack.HotModuleReplacementPlugin()
    ],
    devServer:{
        contentBase:path.join(__dirname,"dist"),
        publicPath:"/"+config.name+"/assets/",
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

