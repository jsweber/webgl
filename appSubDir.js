var path = require("path");
var fs = require("fs");
//获取app下面的目录名称
const appDir = "./app";
//同步api的写法
var dirs = fs.readdirSync(appDir);
//只有异步才会  fs.readdir(path,function(err,files){ 在里面赋值 })
module.exports = dirs;
