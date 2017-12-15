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
    //模拟数据
    let warp=document.getElementById('wrap');
    let warp1=document.getElementById('wrap1');
    let wrap2=document.getElementById('wrap2');
    let wrap3=document.getElementById('wrap3');
    let wrap4=document.getElementById('wrap4');
        for (let i = 0; i < food_message.length; i=i+4 )
        {
            {
                let temp = new Object();
                temp.src = food_message[i].path;

                data.push(temp);
                let box = document.createElement('div');
                box.className = 'box';
                warp1.appendChild(box);
                //创建info
                let info = document.createElement('div');
                info.className = 'info';
                box.appendChild(info);
                //创建pic
                let pic = document.createElement('div');
                pic.className = 'pic';
                info.appendChild(pic);
                //创建img
                let img = document.createElement('img');
                img.src = 'Homepage/images/' + food_message[i].path;

                let width = img.width;
                let height = img.height;


                img.style.height = height;
                img.style.width = width;
                pic.appendChild(img);


                let box2 = document.createElement('div');
                box2.className = 'box';
                wrap2.appendChild(box2);
                //创建info
                let info2 = document.createElement('div');
                info2.className = 'info';
                box2.appendChild(info2);
                //创建pic
                let pic2 = document.createElement('div');
                pic2.className = 'pic';
                info2.appendChild(pic2);
                //创建img
                let img2 = document.createElement('img');
                img2.src = 'Homepage/images/' + food_message[i+1].path;

                width = img2.width;
                height = img2.height;


                img2.style.height = height;
                img2.style.width = width;
                pic2.appendChild(img2);


                let box3 = document.createElement('div');
                box3.className = 'box';
                wrap3.appendChild(box3);
                //创建info
                let info3 = document.createElement('div');
                info3.className = 'info';
                box3.appendChild(info3);
                //创建pic
                let pic3 = document.createElement('div');
                pic3.className = 'pic';
                info3.appendChild(pic3);
                //创建img
                let img3 = document.createElement('img');
                img3.src = 'Homepage/images/' +food_message[i+2].path;

                width = img3.width;
                height = img3.height;


                img3.style.height = height;
                img3.style.width = width;
                pic3.appendChild(img3);


                let box4 = document.createElement('div');
                box4.className = 'box';
                wrap4.appendChild(box4);
                //创建info
                let info4 = document.createElement('div');
                info4.className = 'info';
                box4.appendChild(info4);
                //创建pic
                let pic4 = document.createElement('div');
                pic4.className = 'pic';
                info4.appendChild(pic4);
                //创建img
                let img4 = document.createElement('img');
                img4.src = 'Homepage/images/' + food_message[i+3].path;

                width = img4.width;
                height = img4.height;


                img4.style.height = height;
                img4.style.width = width;
                pic4.appendChild(img4);
            }

        }

}