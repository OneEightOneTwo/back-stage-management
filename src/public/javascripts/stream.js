const http = require('http');
const fs = require('fs');
const writeStream = fs.createWriteStream('abc.png');
http.createServer((req,res) =>{
    //把流引入到本地的文件里面
    req.pipe(writeStream);
    res.end("上传成功");
}).listen(8888);