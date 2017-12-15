
window.onload = function(){
    //运行瀑布流主函数
    //PBL('wrap','box');

    var data=[];
    //模拟数据
    var warp=document.getElementById('warp');
    $.get("/foods",function (food_message) {
        for (var i = 0; i < food_message.length; i++) {
            var temp = new Object();
            temp.src = food_message[i].path;
            data.push(temp);

            var box = document.createElement('div');
            box.className = 'box';
            wrap.appendChild(box);
            //创建info
            var info = document.createElement('div');
            info.className = 'info';
            box.appendChild(info);
            //创建pic
            var pic = document.createElement('div');
            pic.className = 'pic';
            info.appendChild(pic);
            //创建img
            var img = document.createElement('img');
            img.src = 'Homepage/images/' + data[i].src;
            img.style.height = '200px';
            pic.appendChild(img);

        }
    });

    };
