var express = require('express');
var path  = require("path");
var fs = require("fs");
var querystring = require("querystring");
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login',function(req,res,next){
  res.render('login');
})

router.get('/login_bg.jpg',function(req,res,next){
  let fp = path.join(__dirname,"../public/images/login_bg.jpg");
  let fc = fs.readFileSync(fp);
  res.writeHead(200,{"Content_type":"image/png"});
  res.write(fc);
  res.end();
})

router.post('/getlogin',function(req,res,next){
  //读取data.json
  let fp = path.join(__dirname,"../public/javascripts/data.json");
  let fc = fs.readFileSync(fp);
  fc = fc.toString("utf8");
  //获取user信息
  fc =JSON.parse(fc);
  let userData = fc.users[0];
  let username = userData.username;
  let password = userData.password;
  //接受数据:req.body
  if(req.body.username == username && req.body.password == password){
    let str = "login success";
    str = JSON.stringify(str);
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.write(str);
    res.end();
  }else{
    let str = "用户名或密码错误";
    str = JSON.stringify(str);
    res.writeHead(200,{"Content-Type":"text/plain"});
    res.write(str);
    res.end();
  }
})

router.get("/list",function(req,res,next){
    res.render("list");
})

router.get("/getList",function(req,res,next){
  //读取data.json
  let fp = path.join(__dirname,"../public/javascripts/data.json");
  let fc = fs.readFileSync(fp);
  fc = fc.toString("utf8");
  //获取List信息
  fc =JSON.parse(fc);
  var dataList = JSON.stringify(fc.chapterList);
  res.writeHead(200,{"Content-Type":"text/plain"});
  res.write(dataList);
  res.end();
})

module.exports = router;
