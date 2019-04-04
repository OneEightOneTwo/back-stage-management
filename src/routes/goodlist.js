var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
var db = require('../public/javascripts/base');

var multer = require('multer');
var storage = multer.diskStorage({
	//设置上传后文件路径，uploads文件夹会自动创建。
	destination: function(req, file, cb) {
		cb(null, './uploads')
	},
	//给上传文件重命名，获取添加后缀名
	filename: function(req, file, cb) {
		var fileFormat = (file.originalname).split(".");
		//给图片加上时间戳格式防止重名名
		//比如把 abc.jpg图片切割为数组[abc,jpg],然后用数组长度-1来获取后缀名
		cb(null, file.fieldname + '-' + Date.now() + "." + fileFormat[fileFormat.length - 1]);
	}
});

var upload = multer({
	storage: storage
});


//router.post('/addpic', upload.single('logo'), function(req, res, next) {
	// res.append("Access-Control-Allow-Origin","*");
	// console.log(req.file)
	// console.log('文件类型：%s', req.file.mimetype);
	// console.log('原始文件名：%s', req.file.originalname);
	// console.log((req.file.originalname).split("."))
	// console.log('文件大小：%s', req.file.size);
	// console.log('文件保存路径：%s', req.file.path);
	// res.send({
	// 	wscats_code: '0'
	// });
//});
router.post('/addpic',upload.single('logo'), (req, res) => {
    res.append("Access-Control-Allow-Origin","*");
	console.log(req.file)
	console.log('文件类型：%s', req.file.mimetype);
	console.log('原始文件名：%s', req.file.originalname);
	console.log((req.file.originalname).split("."))
	console.log('文件大小：%s', req.file.size);
	console.log('文件保存路径：%s', req.file.path);
	res.send({
        wscats_code: '0',
        file:req.file
	});
});



router.get('/', async (req, res) => {
    let data;
    try {
        data = await db.find('goodlist', {}, 0);
    } catch (err) {
        data = err
    }
    res.send(data);
});

router.get('/delete', async (req, res) => {
    let data;
    try {
        // console.log(req.query.canshu)
        data = await db.delete('goodlist', { 'name': req.query.canshu });
    } catch (err) {
        data = err;
    }
    res.send(data);
});

router.get('/addGood', async (req, res) => {
    let data;
    let { name, subtitle, oldPrice, newPrice, category, storage, gAttribute1, gAttribute2, gAttribute3, sta, goodDetial, PS, addTime } = req.query;
    try {
        data = await db.insert('goodlist', { name, subtitle, oldPrice, newPrice, category, storage, gAttribute1, gAttribute2, gAttribute3, sta, goodDetial, PS, addTime });
    } catch (err) {
        data = err;
    }
    res.send(data);
});

router.get('/searchName', async (req, res) => {
    let data;
    try {
        data = await db.find('goodlist', { name: req.query.canshu });
    } catch (err) {
        data = err;
    }
    res.send(data);
});

router.get('/update', async (req, res) => {
    let data;
    try {
        data = await db.update('goodlist', { name: req.query.canshu }, { sta: req.query.sta });
    } catch (err) {
        data = err;
    }
    res.send(data);
});

router.get('/touxiang', async (req, res) => {
    let data;
    try {
        data = await db.update('touxiang', { dd: "aa" }, { src: req.query.picName });
    } catch (err) {
        data = err;
    }
    res.send(data);
});

router.get('/touxiang2', async(req, res) => {
    let data;
    try {
        data = await db.find('touxiang', { dd: "aa" });
    } catch (err) {
        data = err;
    }
    res.send(data);
    // console.log("asdfghjkl");
});

router.get('/updateGood', async (req, res) => {
    let data;
    let { name, subtitle, oldPrice, newPrice, category, storage, gAttribute1, gAttribute2, gAttribute3, sta, goodDetial } = req.query;
    try {
        data = await db.update('goodlist', { name }, { name, subtitle, oldPrice, newPrice, category, storage, gAttribute1, gAttribute2, gAttribute3, sta, goodDetial });
    } catch (err) {
        data = err;
    }
    res.send(data);
});







module.exports = router;





