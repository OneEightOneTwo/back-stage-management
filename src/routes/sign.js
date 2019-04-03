var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var db = require('../public/javascripts/base');
var token = require('../lib/token');

router.post('/login', bodyParser.urlencoded({
    extended: false
}), async (req, res, next) => {
    let {
        name,
        password
    } = req.body;
    password = isNaN(password) ? password : password * 1; //一定要转为数字
    let data;
    try {
        data = await db.find('user', {
            name,
            password
        }); //获取所有商品信息
    } catch (err) {
        data = err;
    }
    res.send({
        data,
        token: token.createToken({
            name,
            password
        }, 60)
    });
});
module.exports = router;