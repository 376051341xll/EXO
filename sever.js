'use strict';
const express = require('express');
const bodyParser = require('body-parser');
//

const app = express();
let crypto=require('crypto');
let md5=require('md5');
app.use(express.static(__dirname+'/'));
const nodemailer = require('nodemailer');
let orm = require('orm');

app.use(bodyParser.urlencoded({ extended: true }));



//使用orm连接数据库：
orm.connect('sqlite:../food/food.db  ', function(err, db) {
    if (err) {
        return console.error('Connection error: ' + err);
    }
    else {
        console.log('success!');
    }
});

app.use(orm.express("sqlite:../food/food.db ", {
    define: function (db, models, next) {
        models.Message=db.define("MESSAGE",{
            id:{type:'number'},
            user_id:{type:'text'},
            content:{type:'text'},
            area:{type:'text'},
            type:{type:'text'},
            path:{type:'text'}
        });
        models.User=db.define("USER",{
            id:{type:'number'},
            name:{type:'text'},
            password:{type:'text'},
            email:{type:'text'}

        });
        models.Picture=db.define("Picture",{
            id:{type:"number"},
            message_id:{type:"number"},
            path:{type:"text"},
            Field4:{type:"number"}
        });
        models.Comment=db.define("Comment",{
            user_id:{type:"number"},
            content:{type:"text"}
        });


        next();
    }
}));

//加载页面
app.get('/',function (req,res) {
    res.sendFile(__dirname+"/index.html");
});


app.all('*',function (req,res,next) {
    res.header("Access-Control-Allow-Origin","*");
    res.header('Access-Control-Allow-Methods', '*');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});



//功能1：注册
//对传入的数据进行解析，然后跟数据库数据进行比较，判断是否已经注册。
//1.注册：
app.post(`/user`,function (req,res) {
    // console.log("register");
    var newRecord={};
    var countx=0;
    newRecord.name=req.body.username;
    newRecord.password = req.body.password;
    newRecord.email = req.body.email;
    newRecord.id=req.body.id;

    req.models.User.count(null, function (err, edcount) {
        countx = edcount;
        newRecord.id = countx + 1;

        req.models.User.exists({email: newRecord.email}, function (err, user) {
            if (user===true) {
                console.log("该邮箱已存在");
            }
            else {
                req.models.User.create(newRecord, function (err, user) {
                });
                res.send(newRecord);
                console.log("注册成功！");

            }
        });
    });
});

app.get("/user/login",function (req,res) {
    var getemail = req.query.email;
    var getpassword=req.query.password;
    console.log(req.query.email);
    req.models.User.find({email:getemail,password:getpassword},function (err,usr) {
        if(usr.length===0){
            console.log("不正确！");
            res.send("不正确！");
        }else {
            // res.sendFile(__dirname+"/student/index.html");
            res.send({email:getemail,password:getpassword});
            console.log("登录成功！");

        }

    });

});


//1.GET 获得所有美食信息（返回一个美食JOSN对象数组）（注意，数组转化为JOSN对象，而不是数组里的职位对象转化为JOSON对象放入数组，下同）

app.get("/foods",function(req,res){

    req.models.Picture.find(null,function (err,allfoods) {
        console.log(allfoods);
        res.json(allfoods);

    });
});
app.get("/foods/type/",function (req,res) {
    var getInfo = req.query.type;
    // console.log(getInfo);
    // var getInfo=req.headers.tags;
    if(getInfo===''){
        req.models.Picture.find(null,function (err,foods) {
            res.json(foods);
        });
    }
    else {
        req.models.Picture.find({Field4:getInfo},function (err,position) {
            res.json(position);
        })
    }
});
app.get("/foods/search",function (req,res) {
    let getRequire=req.query.input;
    if(getRequire===''){
        req.models.Message.find(null,function (err,foods) {
            res.json(foods);
        });
    }
    else{
        req.models.Message.find({or:[{id: orm.like("%"+getRequire+"%")},{user_id: orm.like("%"+getRequire+"%")},
            {content: orm.like("%"+getRequire+"%")},{area: orm.like("%"+getRequire+"%")},{type: orm.like("%"+getRequire+"%")}
            ,{path:orm.like("%"+getRequire+"%")}]},function (err,position) {
            // console.log(foods.length);
            res.json(position);
            //console.log(positions[0].id);
        });
    }
});

let server = app.listen(3000,function () {
    let host = server.address().address;
    let port = server.address().port;
    console.log("访问地址为 http://%s:%s", host, port);
});
