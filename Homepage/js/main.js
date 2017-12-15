var userinfo=Object;
var user=[];

function check_register() {
    var username=document.getElementById('user_name').value;
    var password=document.getElementById('register_password').value;
    var email=document.getElementById('email').value;

    user=[username,password,email];
    userinfo={
        "username":username,
        "password":password,
        "email":email
    };
    console.log(userinfo);
    $.ajax({
        type: 'POST',
        dataType:'json',
        data: userinfo,
        url:  'http://localhost:3000/user',
        crossDomain: true,
        success: function () {
            $(".htmleaf-container").hide();
        },
        complete: function() {
            console.log('complete');
        },
        error: function() {
            console.log('error');
        }
    });

    console.log(userinfo);
}

function check_login() {
    var email=document.getElementById('login_email').value;
    var password=document.getElementById('password').value;


    $.ajax({
        type: 'GET',
        dataType:'json',
        data:{
            "email":email,
            "password":password
        },
        url:  'http://localhost:3000/user/login',
        success: function () {
            console.log("get success!");
            $(".htmleaf-container").hide();
        },
        error: function() {
            console.log('error');
            // $(".htmleaf-container").append("该邮箱已存在!");
            alert("邮箱已存在！");
        }
    });
}



$(function(){
    $("#create").click(function(){
        check_register();
        $("#person").replaceWith("<a id=\"personal\" href=\"personal/index.html\">\n" +
            "\t\t\t\t\t\t个人中心\n" +
            "\t\t\t\t\t</a>");
        return false;
    })
    $("#login").click(function(){
        check_login();
        $("#person").replaceWith("<a id=\"personal\" href=\"personal/index.html\">\n" +
            "\t\t\t\t\t\t个人中心\n" +
            "\t\t\t\t\t</a>");
        return false;
    })
    $('.message a').click(function () {
        $('#form1').animate({
            height: 'toggle',
            opacity: 'toggle'
        }, 'slow');
        $('#form2').animate({
            height: 'toggle',
            opacity: 'toggle'
        }, 'slow');
    });
});