var appSubDirs = require("./appSubDir");
var entry = {};
appSubDirs.forEach((filename)=>{
    entry[filename] = `./app/${filename}/${filename}.js`
});
// let entry = {
//     demo0:"./app/demo0/demo0.js",
//     demo1:"./app/demo1/demo1.js"
// }

module.exports = entry;