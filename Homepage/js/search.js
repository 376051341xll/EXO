/**
 * Created by only on 17-12-9.
 */
let info={type:""};
let search_input={input:""};
$(document).ready(function () {
    $('.type').on('click',function () {
        info.type=$(this).attr('id');
        console.log(info);
        $.get(`foods/type`,info,function (food) {
            $(".box").remove();
            add(food);
        });
    });
});
$(document).ready(function () {
    $('.btn').on('click',function () {
        search_input.input=$(".form-control").val();
        console.log(search_input.input);
        $.get(`foods/search`,search_input,function (food) {
            console.log(food);
            // alert(1);
            $(".box").remove();
            add(food);
        });
    });
});
function add(food_message) {
    // var count = Math.floor(food_message.length / 4);
    let data=[];
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
}