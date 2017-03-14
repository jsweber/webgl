var webpack = require("webpack");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var jquery = require("jquery");
var appSubDirs = require("./appSubDir");
var plugins = [];

//如果env.production存在，则是生产模式,开启压缩
//process.env.NODE_ENV === "development" ? configDev : config;
if(process.env.NODE_ENV === "production"){
    plugins.push(
        new webpack.optimize.UglifyJsPlugin({   //開發過程不建議使用
            compress:{
                warnings:false
            }
        })
    );
}

//提取公共文件
plugins.push(
    new webpack.optimize.CommonsChunkPlugin({
        name:"common",
        filename:"assets/common.js",
        minChunks:Infinity  //加了這個后，common.js就能自動引入頁面了
    })
);

plugins.push(new ExtractTextPlugin('assets/[name].css'));
plugins.push(new webpack.HotModuleReplacementPlugin());
//添加全局匹配，value（jquery）值是在alias里定义的
plugins.push(new webpack.ProvidePlugin({
  $:'jquery'
}));

//根据每一个app下的子目录调用相应的模板
appSubDirs.forEach((file)=>{
    plugins.push(
        new HtmlWebpackPlugin({
            filename:`${file}.html`,
            template:`./app/${file}/${file}.html`,
            chunks:[file],  //指定哪个entry入口调用
            inject:true
        })   
    );
});

module.exports = plugins;