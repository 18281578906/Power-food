
//* (服务器中图片保存的位置)
//
// http://gzittc.net/powerfood/api/login
//{AUTHORIZATION_TOKEN}
// http://gzittc.net/powerfood/api/menu?token={AUTHORIZATION_TOKEN}
// http://gzittc.net/powerfood/api/menu/{id}/edit?token={AUTHORIZATION_TOKEN}
// http://gzittc.net/powerfood/api//menu/{id}?token={AUTHORIZATION_TOKEN}
// http://gzittc.net/powerfood/api/cart?token={AUTHORIZATION_TOKEN}

// {AUTHORIZATION_TOKEN}

// http://gzittc.net/powerfood/api/user?token={AUTHORIZATION_TOKEN}
// http://gzittc.net/powerfood/api/ulist?token={AUTHORIZATION_TOKEN}
var string='http://gzittc.net/powerfood/public/images/';
function Register() {
    $('.btn-lg').click(function () {
        var check=$("input:eq(4)");
        if(check.is(':checked'))
        {
            console.log($("input:eq(0)").val())
            $.ajax({
                url:' http://gzittc.net/powerfood/api/register',
                type:'post',
                data:{
                    name:$("input:eq(0)").val(),
                    email:$("input:eq(1)").val(),
                    password:$("input:eq(2)").val(),
                    password_confirmation:$("input:eq(3)").val(),
        },
                success:function (data) {
                    console.log(data)
                    alert("注册成功");
                    window.location.href='login.html';
                },error:function (data) {
                    console.log(data)
                    alert("注册s失败");
                }
            })
        }else
        {
            alert("请先同意协议");
        }
    })

}
function Login() {
    $('.btn-lg').click(function () {

            $.ajax({
                url:' http://gzittc.net/powerfood/api/login',
                type:'post',
                data:{
                    name:$("input:eq(0)").val(),
                    password:$("input:eq(1)").val(),
                },
                success:function (data) {
                    console.log(data)
                    if(data.name==='admin')
                    alert("管理员登录");
                    else
                        alert("登录成功");
                    window.localStorage.setItem('name',data.name);
                    window.localStorage.setItem('role',data.role);
                    window.localStorage.setItem('token',data.token);
                    window.localStorage.setItem('userID',data.id);
                    window.location.href='ucenter.html';
                },error:function (data) {
                    console.log(data.responseText);
                    alert("登录失败");
                }
            })
        })
}
var name= window.localStorage.getItem('name');
var role= window.localStorage.getItem('role');
var token= window.localStorage.getItem('token');
var userID= window.localStorage.getItem('userID');
function Logout() {
    $.ajax({
        url:'  http://gzittc.net/powerfood/api/logout?token='+token,
        type:'get',
        success:function (data) {
            console.log(data)
            alert("注销成功");
            window.localStorage.removeItem('name');
            window.localStorage.removeItem('role');
            window.localStorage.removeItem('token');
            window.localStorage.removeItem('userID');
            $(".u-name").html('<a href="login.html" style="color: #fff;text-decoration: none">点击登录</a>');
        },error:function (data) {
            console.log(data)
            alert("注销失败");
        }
    })
}
function Ucenter() {
if(name!=='null')
    $(".u-name").html('<a href="#" style="color: #fff;text-decoration: none">'+name+'</a>');
else
    $(".u-name").html('<a href="login.html" style="color: #fff;text-decoration: none">点击登录</a>');
if(role==='admin')
    {
        $(".orders").css('display','block');
        $(".tools").css('display','block');
    }
    else if(role==='admin')
{
    $(".orders").css('display','block');
    $(".tools").css('display','none');
}
else {
    $(".orders").css('display','none');
    $(".tools").css('display','none');
}

    $.ajax({
        url:'http://gzittc.net/powerfood/api/order?token='+token,
        type:'get',
        success:function (data) {
            console.log(data);

            for(var i=0;i<data.length;i++)
            {
                for(var j=0;j<data[i].carts.length;j++)
                {

                    $(".orders").append('<div class="orders-item">\n' +
                        '                <div class="order-content">\n' +
                        '                    <img src="'+string+data[i].carts[j].food.img_path+'" alt="img">\n' +
                        '                    <div class="order-main">\n' +
                        '                        <h4>'+data[i].carts[j].food.name+'</h4>\n' +
                        '                        <p class="sub">购买于:'+data[i].created_at+'</p>\n' +
                        '                    </div>\n' +
                        '                    <div class="order-price">\n' +
                        '                        <p>￥'+data[i].carts[j].food.price+'</p>\n' +
                        '                        <p class="order-num">x'+data[i].carts[j].number+'</p>\n' +
                        '                    </div>\n' +
                        '                </div>\n' +
                        '                <div class="order-state">\n' +
                        '                    <p>一共1件商品，合计：<span>￥'+data[i].carts[j].food.price*data[i].carts[j].number+'</span></p>\n' +
                        '                </div>\n' +
                        '            </div>')
                }
            }
        },error:function (data) {
            console.log(data)
        }
    })
}
function Cart() {

        $.ajax({
            url:' http://gzittc.net/powerfood/api/cart?token='+token,
            type:'get',
            success:function (data) {
                console.log(data);
                var arr=new Array();
                var num=data.length;
                var price=0;
                for(var i=0;i<data.length;i++)
                {
                    arr.push(data[0].id);
                    price=price+data[i].food.price*data[i].number;
                    var kuncun=data[i].food.number-data[i].food.buy_number;
                    $(".cart-lists").append(' <div class="food-item">\n' +
                    '            <img src="'+string+data[i].food.img_path+'" alt="food_img">\n' +
                    '            <div class="item-content">\n' +
                    '                <h4>'+data[i].food.name+'</h4>\n' +
                    '                 <p class="sm-sub">库存'+kuncun+'件</p>\n' +
                    '                <p class="sm-sub">本月销售'+data[i].food.buy_number+'件</p>\n' +
                    '                <p class="price"><span class="icon-price">￥</span>'+data[i].food.price+'\n' +
                    '                </p>\n' +
                    '            </div>\n' +
                    '            <div class="choose">\n' +
                    '                <div class="circle remove" id="'+data[i].food.id+'" data-type="remove"></div>\n' +
                    '                <div class="buy_number'+data[i].food.id+'" id="'+data[i].food.id+'">'+data[i].number+'</div>\n' +
                    '                <div class="circle add" data-type="add" id="'+data[i].food.id+'"></div>\n' +
                    '            </div>\n' +
                    '        </div>')

                }

                window.localStorage.setItem('arr',arr);
                $(".buy-info").html('<p>一共<span class="price-count">'+num+'</span>个美食，合计：<span class="price"><span class="icon-price">￥</span>'+price+'</span></p>\n')

            },error:function (data) {
                console.log(data);
                alert("请先登录");
                window.location.href='center.html';
            }
        })

    $(".cart-lists").click(function (e) {
        var el=window.event||e;
        var src=el.srcElement||el.target;
        var id=0;
        if(src.className==='circle add')
        {
            id=src.id;
            Add(id);
        }
        if(src.className==='circle remove')
        {
            id=src.id;
            Cost(id);
        }
        if(src.className==='change'){
            id=src.id;
            window.localStorage.setItem('menu_id',id);
            window.location.href='edit.html';
        }


    })
}
function Buy() {
    var arry=window.localStorage.getItem('arr');

    $.ajax({
        url:'http://gzittc.net/powerfood/api/buy?token='+token,
        type:'post',
        data:{
        carts:arry,
        },
        success:function (data) {
            console.log(data);
            alert("结算成功");
            window.location.href='cart.html';

        },error:function (data) {
            console.log(data)
            alert("结算失败");
            window.location.href='cart.html';
        }
    })

}
function Append(data,i,j) {
    var kuncun=data[i].number-data[i].buy_number;
    if(role==='admin')
    {
        $(".food-lists").eq(j).append('    <div class="food-item">\n' +
            '            <img src="'+string+data[i].img_path+'" alt="food_img">\n' +
            '            <div class="item-content">\n' +
            '                <h4>'+data[i].name+'<a href="#" class="change" id="'+data[i].id+'">编辑</a></h4>\n' +
            '                <p class="sm-sub">库存'+kuncun+'件</p>\n' +
            '                <p class="sm-sub">本月销售'+data[i].buy_number+'件</p>\n' +
            '                <p class="price"><span class="icon-price">￥</span>'+data[i].price+'\n' +
            '                </p>\n' +
            '            </div>\n' +
            '            <div class="choose">\n' +
            '                <div class="circle remove" data-type="remove" id="'+data[i].id+'"></div>\n' +
            '                <div class="buy_number'+data[i].id+'">0</div>\n' +
            '                <div class="circle add" data-type="add" id="'+data[i].id+'"></div>\n' +
            '            </div>\n' +
            '        </div>')
    }else {

        $(".food-lists").eq(j).append('    <div class="food-item">\n' +
            '            <img src="'+string+data[i].img_path+'" alt="food_img">\n' +
            '            <div class="item-content">\n' +
            '                <h4>'+data[i].name+'</h4>\n' +
            '                <p class="sm-sub">库存'+kuncun+'件</p>\n' +
            '                <p class="sm-sub">本月销售'+data[i].buy_number+'件</p>\n' +
            '                <p class="price"><span class="icon-price">￥</span>'+data[i].price+'\n' +
            '                </p>\n' +
            '            </div>\n' +
            '            <div class="choose">\n' +
            '                <div class="circle remove" data-type="remove" id="'+data[i].id+'"></div>\n' +
            '                <div class="buy_number'+data[i].id+'">0</div>\n' +
            '                <div class="circle add" data-type="add" id="'+data[i].id+'"></div>\n' +
            '            </div>\n' +
            '        </div>')
    }

}
function Index() {
    $.ajax({
        url:'http://gzittc.net/powerfood/api/menu?token='+token,
        type:'get',

        success:function (data) {
            console.log(data);
            for(var i=0;i<data.length;i++)
            {
                if(data[i].category==='汉堡')
                    Append(data,i,0);
                if(data[i].category==='蛋糕')
                    Append(data,i,1);
                if(data[i].category==='披萨')
                    Append(data,i,2);
                if(data[i].category==='意面')
                    Append(data,i,3)
                if(data[i].category==='牛排')
                    Append(data,i,4);
            }


        },error:function (data) {
            console.log(data)

        }
    })

    //分类
    $(".c-item").each((function (index) {
        $(this).click(function () {
            $(".food-lists").css('display','none');
            $(".food-lists").removeClass('displ');
            $(".food-lists").eq(index).addClass('displ');

        })
    }))

    //seach
    $(".search").bind('keyup',function () {
        var word=$(this).val();
        if(word!=='')
        {
            $(".food-item").removeClass('flex').css('display','none');
            $(".food-item:contains("+word+")").addClass('flex');
            var row= $(".food-item:contains("+word+")").find(".item-content").find('h4');
            for(var i=0;i<row.length;i++)
            {
                var str=row[i];
                var mm=$(str).text();

                for(var j=0;j<word.length;j++)
                {
                    var index=mm.indexOf(word[j]);
                    mm=mm.replace(mm.charAt(index),'<i style="color:orangered;">'+word[j]+'</i>')
                }
                mm=mm.replace('编辑','<a class="change">编辑</a>')
                $(str).html(mm);
        }




        }
        else {
            window.location.href='index.html';
        }


    })

    $(".food-lists").click(function (e) {
        var el=window.event||e;
        var src=el.srcElement||el.target;
        var id=0;
        if(src.className==='circle add')
        {
            id=src.id;
            Add(id);
        }
        if(src.className==='circle remove')
        {
            id=src.id;
            Cost(id);
        }
        if(src.className==='change'){
            id=src.id;
            window.localStorage.setItem('menu_id',id);
            window.location.href='edit.html';
        }


    })
}
function Add(id) {
    $.ajax({
        url:'http://gzittc.net/powerfood/api/cart?token='+token,
        type:'post',
        data:{
            user_id:userID,
            menu_id:id,
            type:'add'
        },

        success:function (data) {
            console.log(data);
            var num=$(".buy_number"+id).text();
            num++;
            $(".buy_number"+id).text(num);


        },error:function (data) {
            console.log(data)

        }
    })

}
function Cost(id) {
    $.ajax({
        url:'http://gzittc.net/powerfood/api/cart?token='+token,
        type:'post',
        data:{
            user_id:userID,
            menu_id:id,
            type:'cost'
        },

        success:function (data) {
            console.log(data);
            var num=$(".buy_number"+id).text();
            num--;
            if(num>=0)
            $(".buy_number"+id).text(num);


        },error:function (data) {
            console.log(data)

        }
    })

}
function AddFood() {
    $(".btn-lg").click(function () {
        var name=$("input:eq(1)").val();
        var price=$("input:eq(2)").val();
        var number=$("input:eq(3)").val();
        var category=$("select").val();
        var description=$("textarea").val();
        var formdata=new FormData();
        formdata.append('name',name);
        formdata.append('price',price);
        formdata.append('number',number);
        formdata.append('category',category);
        formdata.append('description',description);
        formdata.append('image',$("#img")[0].files[0]);
        $.ajax({
            url:'http://gzittc.net/powerfood/api/menu?token='+token,
            type:'post',
            data:formdata,
            contentType:false,
            processData:false,
            cache:false,
            success:function (data) {
                console.log(data);
                alert("添加成功");
                window.location.href='add_food,html';

            },error:function (data) {
                console.log(data)
                alert("添加失败")

            }
        })

    })

}
function Edit() {
    var menu_id=window.localStorage.getItem('menu_id');
        $.ajax({
            url:'http://gzittc.net/powerfood/api/menu/'+menu_id+'/edit?token='+token,
            type:'get',
            success:function (data) {
                console.log(data);
                $(".uploadShow").attr('src',string+data.img_path).css('display','block');
              $("input:eq(1)").val(data.name);
           $("input:eq(2)").val(data.price);
             $("input:eq(3)").val(data.number);
           $("select").val(data.category);
               $("textarea").val(data.description);

            },error:function (data) {
                console.log(data)


            }
        })
    $(".btn-lg").click(function () {
        var img=$("#img")[0].files[0];
        var name=$("input:eq(1)").val();
        var price=$("input:eq(2)").val();
        var number=$("input:eq(3)").val();
        var category=$("select").val();
        var description=$("textarea").val();
        var formdata=new FormData();
        formdata.append('name',name);
        formdata.append('price',price);
        formdata.append('number',number);
        formdata.append('category',category);
        formdata.append('description',description);
        if(img)
        formdata.append('image',$("#img")[0].files[0]);
        formdata.append('_method',"PUT");
        $.ajax({
            url:' http://gzittc.net/powerfood/api//menu/'+menu_id+'?token='+token,
            type:'post',
            data:formdata,
            contentType:false,
            processData:false,
            cache:false,
            success:function (data) {
                console.log(data);
                alert("编辑成功");
                window.location.href='edit.html';

            },error:function (data) {
                console.log(data)
                alert("编辑失败")

            }
        })

    })
}
function Report() {
    $.ajax({
        url:'http://gzittc.net/powerfood/api/report/2018?token='+token,
        type:'get',
        success:function (data) {
            console.log(data);
            var dingdanshu=data.today.length;
            var xiaosoue=0;
            var xiaosoulian=0;
           for(var i=0;i<data.today.length;i++)
           {
                xiaosoue=xiaosoue+data.today[i].price;
               xiaosoulian=xiaosoulian+data.today[i].count;
           }
           $(".r-item:eq(0) p:eq(1)").html(xiaosoue);
           $(".r-item:eq(1) p:eq(1)").html(dingdanshu);
           $(".r-item:eq(2) p:eq(1)").html(Math.ceil(xiaosoue/dingdanshu));
           $(".r-item:eq(3) p:eq(1)").html(xiaosoue);


           for(var i=6;i<=10;i++)
           {
               var month=0;
               for(var j=data.report[i].length-1;j>=0;j--)
               {
                   month=month+data.report[i][j].price;

               }
               $(".r-lines").append(' <li><span class="sub">'+i+'月</span><span class="r-process" style="width:'+month/50+'px;"></span><span>'+month+'</span>\n' +
                   '                </li>');
           }

        },error:function (data) {
            console.log(data)

        }
    })
}
function UserList() {
    $.ajax({
        url:'http://gzittc.net/powerfood/api/ulist?token='+token,
        type:'get',
        success:function (data) {
            console.log(data);

            var mm=new Array();
            for(var j=0;j<data.length;j++)
                mm.push(0)
            for(var i=data.length-1;i>=0;i--)
            {

                var id=data[i].user_id;
                if(mm[id]===0)
                {
                    $(".u-list").append('<li class="u-item"><span>'+id+'.</span><span>'+data[i].name+'</span><span>'+data[i].login_at+'</span></li>\n')
                    mm[id]=1;
                }

            }


        },error:function (data) {
            console.log(data)

        }
    })
}

