'use strict';
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
let crypto=require('crypto');
let md5=require('md5');
app.use(express.static(__dirname+'/'));
const nodemailer = require('nodemailer');
let orm = require('orm');

app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//使用orm连接数据库：
orm.connect('sqlite:/home/only/下载/food/food.db ', function(err, db) {
    if (err) {
        return console.error('Connection error: ' + err);
    }
    else {
        console.log('success!');
    }
});

app.use(orm.express("sqlite:/home/only/下载/food/food.db ", {
    define: function (db, models, next) {
        models.user = db.define("user",{
            id:Number,
            name:String,
            email:String,
            password:String,
        });
        models.message = db.define("message", {
            id:Number,
            user_id:Number,
            content:String,
            area:String,
            type:String,
        });
        models.picture=db.define("picture",{
            id:Number,
            message_id:Number,
            path:String,
        });
        models.comment=db.define("comment",{
            id:Number,
            user_id:Number,
            content:String,
        });
        models.cuisine=db.define("cuisine",{
            id:Number,
            content:String,
        });
        next();
    }
}));
//加载页面
app.get('/',function (req,res) {
    res.sendFile('index.html', {root: './'});
});
//使用8081端口;
let server = app.listen(8081,function () {

    let host = server.address().address;
    let port = server.address().port;

    console.log("访问地址为 http://%s:%s", host, port);
});

app.all('*',function (req,res,next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

//使用nodemailer实现QQ邮箱自动发送邮件的功能。
let transporter = nodemailer.createTransport({
    host: 'smtp.qq.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: '2017983051@qq.com',
        pass: 'etcozdixiiqrejaf'
    }
});

//功能1：注册：api可以运行
//对传入的数据进行解析，然后跟数据库数据进行比较，判断是否已经注册。
app.post(`/uesr`,function (req,res) {
    let data = req.body;
    let newRecord={
        email:data.email,
        password:data.password,//md5.update(`${data.password}`).digest('hex'),
        name:'',
    };
    // console.log(typeof newRecord.password);
    req.models.uesr.exists({email:data.email},function (err,reply) {
        if(reply===true){
            res.send("This account has been registered!");
            // console.log("This account has been registered!");
        }
        else{
            newRecord.password=crypto.createHash('md5').update(newRecord.password).digest('hex');
            req.models.parent.create(newRecord,function (err,rep) {
                if (err){
                    console.log(err);
                    res.send("sign up failed!");
                }else {
                    res.send("success");
                }
            });
        }
    });
});

//对于忘记密码发送邮件
app.get(`/sendMailForRegister`,function (req,res) {
    // console.log("send mail");
    let info=req.query;
    let mailOptions = {
        from: '"美食"<2017983051@qq.com>', // sender address
        to: `${info.email}`, // list of receivers 1844678323@qq.com
        subject: '美食网，致力于更多美食', // Subject line
        text: `     感谢您关注美食网，在这里，您可以分享您邂逅的美食，在这里，您也可以开启您的美食之旅。
        
       验证码:${info.verificationCode}.
       
        
       任何问题，您也可以与我们取得联系。`, // plain text body
    };
    // console.log(mailOptions);
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
        }
        else{
            // console.log("send email success!");
            res.send("success");
        }
    });
});

//功能2：登录api可用
app.get(`/user/login`,function (req,res) {
    // let info=req.query;
    let info=req.headers;
    req.models.user.find({email:info.email},function (err,result) {
        if(result.length===0){
            res.send("No such account ghjk!");
        }
        else {
            // console.log(info.password);
            if (crypto.createHash('md5').update(info.password).digest('hex')=== result[0].password) {
                // console.log("Login success");
                res.send("success");
            }
            else {
                // console.log("error");
                res.send("password error!");
            }
        }
    });
});

//功能3：忘记密码：
//api可用
app.put(`/user/forget`,function (req,res) {
    let data=req.body;
    // console.log(data);
    req.models.user.find({email:data.email},function (err,result) {
        if(result.length===0){
            res.send("No such account!");
        }
        else {
            result[0].password =crypto.createHash('md5').update(data.password).digest('hex');
            result[0].save();
            // console.log("alter success!");
            res.status(200).send("success");
            // res.send(result);
        }
    });
});

//功能4：显示用户信息, api可用。
app.get('/user',function (req,res) {
    // query
    req.models.user.find({email:req.headers.email},function (err,user) {
        if(err){
            res.status(300);
        }
        else {
            res.send(user);
        }
    })
});
//功能5：修改个人信息， api可用
app.put('/user/newInfo',function (req,res) {
    req.models.user.find({email:req.body.email},function (err,user) {
        if(err){
            res.status(300);
        }
        else {
            // console.log(user);
            user[0].name = req.body.name;
            user[0].save();
            res.send(user);
        }
    })
});
//功能6：按照tags进行搜索：
app.get('/cuisine/:id',function (req,res){


});


