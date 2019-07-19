动力美食
===
账号admin、密码adminpass 进行登录的是管理员角色。

项目描述
-------  

普通用户：  
1、按分类筛选美食：点击分类名称后，显示所有对应的美食名称、当月销售、库存和单价。
2、搜索美食：根据美食名称关键字进行模糊搜索美食；被搜索到的美食名称关键字匹配文本高亮显示；每次文字录入后，结果及时反馈。
3、模拟下单：将美食添加到购物车；物品库存量和购物车物品数量发生对应的变化；如果物品库存量不足，应该要制止添加到购物车。
4、模拟结账：点击购物车TAB，能够看到正确的购物清单；点击结算按钮，将清空购物车，购物车信息被归纳到点餐记录。
5、查看自己的订单记录：正确的记录、品名、购买时间、数量、单价、合计；


管理员 ：   
1、增加美食:增加的美食可以在美食列表中找到，并且信息一致；美食图片显示正确;
2、编辑美食:菜式名、单价、数量、分类、菜式简介、图片
3、查看用户数据:用户列表展示（用户名、最后一次登陆时间）
4、查看收入报表:今日数据统计正确（客单价 = 总收入 / 订单数）；最近5个月销售额统计正确，图示正确

游客：  
1、通过注册成为普通用户: 能够正常注册（数据入库）；可以使用注册信息进行登录；已登录的用户可以正确注销。
2、未登录前也可以浏览美食：点击菜品名称，能够看到菜式详情。


效果图
-------
![](https://github.com/18281578906/Power-food/blob/master/asset/home222.png) 
![](https://github.com/18281578906/Power-food/blob/master/asset/cart222.png) 
![](https://github.com/18281578906/Power-food/blob/master/asset/order222.png) 
![](https://github.com/18281578906/Power-food/blob/master/asset/admint222.png) 
![](https://github.com/18281578906/Power-food/blob/master/asset/search222.png) 
![](https://github.com/18281578906/Power-food/blob/master/asset/report222.png) 
![](https://github.com/18281578906/Power-food/blob/master/asset/shangchuan222.png) 
![](https://github.com/18281578906/Power-food/blob/master/asset/baobiao222.png) 


开发环境：
-------
```html,css,javascript,jquery,bootstrap```

所用api接口
------
•  http://localhost/powerfood/api/public/images/* (服务器中图片保存的位置)
•  http://localhost/powerfood/api/register (所有注册用户均为user角色，而admin角色已内置)
•  http://localhost/powerfood/api/login
•  http://localhost/powerfood/api/logout?token={AUTHORIZATION_TOKEN}
•  http://localhost/powerfood/api/menu?token={AUTHORIZATION_TOKEN}
•  http://localhost/powerfood/api/menu/{id}/edit?token={AUTHORIZATION_TOKEN}
•  http://localhost/powerfood/api//menu/{id}?token={AUTHORIZATION_TOKEN}
•  http://localhost/powerfood/api/cart?token={AUTHORIZATION_TOKEN}
•  http://localhost/powerfood/api/buy?token={AUTHORIZATION_TOKEN}
•  http://localhost/powerfood/api/order?token={AUTHORIZATION_TOKEN}
•  http://localhost/powerfood/api/report/{year}?token={AUTHORIZATION_TOKEN}
•  http://localhost/powerfood/api/user?token={AUTHORIZATION_TOKEN}
•  http://localhost/powerfood/api/ulist?token={AUTHORIZATION_TOKEN}

#### 接口文档
```
1.	Login 

url: api/login  
description：在客户端通过用户名和密码来获取令牌（token）  
Request method：POST  
Requested parameter:  

* Body:
* name
* password
Response result:
* If success,
* header: response status: 200
* body:
{
    "id": 1,
    "name": "XXXX",
    "email": "XXX@XXX",
    "photo": “XXXXXX”,    /*图片的名称*/
    "token": "XXXX",
    "role": "admin",     /*如果是 user 就是普通用户*/
    "created_at": "2018-10-10 00:00:00",
    "updated_at": "2018-10-10 00:00:00"
}
-	If name/password not correct or empty,
	header: response status: 401
	body:
{
    	"message": "Invalid login"
}




2.	Register
url: api/register
description：注册用户
Request method：POST
Requested parameter:
-	Body:
	name
	email
	Password 
password_confirmation  /*确认密码*/
Response result:
-	If success,
	header: response status: 200
	body:
{
    "message": "register success"
}
-	If email is exist, password not same, pssword is less than 6 letters
	header: response status: 401
	body:
{
    "message": "user cannot be register"
}




3.	logout
url: api/logout?token={AUTHORIZATION_TOKEN}
description：注销用户
Request method：GET
Requested parameter:
-	Body:
Response result:
-	If success,
	header: response status: 200
	body:
{
    "message": "logout success”
}
-	If token error:
	header: response status: 401
	body:
{
    "message": " Unauthorized user "
}




4.	Create Food
url: api/menu?token={AUTHORIZATION_TOKEN}
description：创建菜品
Request method：POST
Role:admin
Requested parameter:
-	Body:
	name
	price /*价格*/
	number
	description
	category   /*分类名*/
	image    /*file类型：一个图片文件*/

Response result:
-	If success,
	header: response status: 200
	body:
{
    "message": "Create success”
}
-	If data error:
	header: response status: 400
	body:
{
    "message": "Data cannot be process "
}




5.	Get edit Food
url: api/menu/{id}/edit?token={AUTHORIZATION_TOKEN}
description：获取编辑菜品信息
Request method：GET
Role:admin
Response result:
-	If success,
	header: response status: 200
	body:
{
    "id": 1,
    "name": "XXX",
    "price": XXX,
    "description": "something /*描述*/
    "img_path": "XXX",  /*图片名*/
    "number": 10,/*库存，即是可购买总数*/
    "buy_number": 0, /*当月已经购买数量*/
    "category": ‘cake’ /*分类*/
}
-	If token error:
	header: response status: 401
	body:
{
    "message": " Unauthorized user"
}





6.	Edit Food
url: api/menu/{id}?token={AUTHORIZATION_TOKEN}
description：编辑菜品
Request method：POST
Role:admin
Requested parameter:
-	Body:
	[name]
	[price]
	[number]
	[description]
	[category] /*分类名*/
	[image] /*file类型：一个图片文件*/
	_method:PUT

Response result:
-	If success,
	header: response status: 200
	body:
{
    "message": "Update success”
}
-	If data error:
	header: response status: 422
	body:
{
    "message": "Data cannot be update "
}




7.	Get menu
url: api/menu
description：获取菜品列表
Request method：GET
Response result:
-	If success,
	header: response status: 200
	body:
[
    {
        "id": 1,
        "name": "XXX",
        "price": 12,
        "description": "XXX",
        "img_path": "XXX",  /*图片名*/
        "number": 10,
        "buy_number": 0,
        "category": “cake”
    },
    {
        "id": 2,
        "name": "XXX",
        "price": 12,
        "description": "XXX",
        "img_path": "XXXX",
        "number": 10,
        "buy_number": 0,
        "category": “cake”
}
]




8.	Update Cart
url: api/cart?token={AUTHORIZATION_TOKEN}
description：更新购物车/添加或删除购物车
Request method：POST
Role:user
Requested parameter:
-	Body:
	user_id
menu_id  /*菜式id*/
	type --- ‘add’ or ‘cost’  /*type只接受’add’或’cost’两种值，add表示添加、cost表示减少*/
    
Response result:
-	If success,
	header: response status: 200
	body:
{
    "message": "Update success”
}
-	If data error:
	header: response status: 422
	body:
{
    "message": "Cart cannot be update"
}




 
9.	Get cart
url: api/cart?token={AUTHORIZATION_TOKEN}
description：获取当前用户购物车
Request method：GET,
Role:user
Response result:
-	If success,
	header: response status: 200
	body：
[
    {
        "id": 24,
        "number": 1,
        "food": {
            "id": 3,
            "name": "XXX",
            "price": 13,
            "description": "XXXX",
            "img_path": "XXXXX",  /*图片名*/
            "number": 120,
            "buy_number": 0,  /*当月已购买数量*/
            "category": “cake”
        }
    },
    {
        "id": 26,
        "number": 1,
        "food": {
            "id": 1,
            "name": "XXX",
            "price": 12,
            "description": “XXXX”,
            "img_path": "XXXXXX",  /*图片名*/
            "number": 10,
            "buy_number": 0, /*当月已购买数量*/
            "category": “cake”
        }
    }
]




10.	Buy 
url: api/buy?token={AUTHORIZATION_TOKEN}
description：结算购物车项
Request method：POST
Role:user
Requested parameter:
-	Body:
	carts --- array for the food id in the cart
Response result:
-	If success,
	header: response status: 200
	body:
{
    "message": "Create order success”
}
-	If cart id is error or it already bought:
	header: response status: 400
	body:
{
    "message": "Cart cannot be buy"
}




11.	Get orders
url: api/order?token={AUTHORIZATION_TOKEN}
description：获取当前用户的订单
Request method：GET
Role:user
Response result:
-	If success,
	header: response status: 200
	body:
[
    {
        "id": 4,
        "user_id": 1,
        "carts": [
            {
                "id": 9,
                "menu_id": 2, /*菜式id*/
                "number": 1, /*当前订单的当前菜式数量*/
                "food": {
                    "id": 2,
                    "name": "XXXX",
                    "price": 12,
                    "description": "XXX",
                    "img_path": "XXXXX",/*图片名*/
                    "number": 10, /*库存*/
                    "buy_number": 0, /*当月已购买数量*/
                    "category": “cake”
                }
            },
            {
                "id": 10,
                "menu_id": 3,
                "number": 1,
                "food": {
                    "id": 3,
                    "name": "XXX",
                    "price": 13,
                    "description": "XXX",
                    "img_path": "XXXX",/*图片名*/
                    "number": 120,/*库存*/
                    "buy_number": 22,/*当月已购买数量*/
                    "category": “cake”
                }
            }
        ],
        "price": 25, /*当前订单里商品的总价格/
        "count": 2, /*当前订单里商品的总数量/
        "created_at": "2018-10-10 01:12:22",
        "updated_at": "2018-10-10 01:12:22"
}
]




12.	Get report
url: api/report/{year}?token={AUTHORIZATION_TOKEN}
description：获取当前年份的订单和当天的订单
Request method：GET
Role:admin
Response result:
-	If success,
	header: response status: 200
	body:
{
    "year": "2018",
    "report": {
        "1": [],
        "2": [],
        "3": [],
        "4": [],
        "5": [
            {
                "id": 16,
                "user_id": 1, /*购买用户id*/
                "carts": [
                    {
                        "id": 24,
                        "menu_id": 3, /*菜式id*/
                        "number": 1,/*购买数量*/
                        "food": {
                            "id": 3,
                            "name": "XXX", /*菜名*/
                            "price": 13,
                            "description": "XX", /*描述*/
                            "img_path": "XXXX", /*图片名称*/
                            "number": 120, /*库存*/
                            "buy_number": 29, /*当月已购买数量*/
                            "category": “cake” /*分类名称*/
                        }
                    },
     {},
	     {},
	     {},
....

                ],
                "price": 13, /*当前订单里商品的总价格/
                "count": 1, /*当前订单里商品的总数量/
                "created_at": "2018-05-10 12:32:15",
                "updated_at": "2018-05-10 12:32:15"
            },
    {}，
{}，
{}
        ]
    },
    "today": [
        {
            "id": 16,
            "user_id": 1,
            "carts": [
                {
                    "id": 24,
                    "menu_id": 3,
                    "number": 1,
                    "food": {
                        "id": 3,
                        "name": "XXXX",
                        "price": 13,
                        "description": "XXX",
                        "img_path": "XXXX",
                        "number": 120,
                        "buy_number": 29,
                        "category": “cake”
                    }
                }
{}，
	{}，
	{}
            ],
            "price": 13,/*当前订单里商品的总价格/
            "count": 1,/*当前订单里商品的总数量/
            "created_at": "2018-10-13 12:32:15",
            "updated_at": "2018-10-13 12:32:15"
        }
    ]
}
"6": [],
"7": [],
"8": [],
"9": [],
“10”:[],
“11”:[]
“12”:[]




13.	Get ucenter
url: api/user?token={AUTHORIZATION_TOKEN}
description：获取当前用户信息和订单
Request method：GET
Role：user
Response result:
-	If success,
	header: response status: 200
	body:
{
    "user": {
        "id": 1,
        "name": "XXX", /*当前用户*/
        "email": "XXX", 
        "photo": “XXXX”, /*图片名*/
        "token": "XXX",
        "role": "admin", /*角色*/
        "created_at": "2018-10-10 06:30:57",
        "updated_at": "2018-10-13 11:32:45"
    },
    "order": [
        {
            "id": 16,
            "user_id": 1,
            "carts": [
                {
                    "id": 24,
                    "menu_id": 3,
                    "number": 1,
                    "food": {
                        "id": 3,
                        "name": "XXX", /*菜名*/
                        "price": 13, /*单价*/
                        "description": "XXXX",  /*描述*/
                        "img_path": "XXXX",/*图片名*/
                        "number": 120,/*库存*/
                        "buy_number": 29, /*当月购买数量*/
                        "category": “cake” /*分类名*/
                    }
                }
  ....
  ....
            ],
            "price": 13, /*当前订单总价*/
            "count": 1, /*当前订单商品总数量*/
            "created_at": "2018-10-13 12:32:15",
            "updated_at": "2018-10-13 12:32:15"
        }
    ]




14.	Get user list
url: api/ulist?token={AUTHORIZATION_TOKEN}
description：获取所有用户动态
Request method：GET
Role：admin
Response result:
-	If success,
	header: response status: 200
	body:
[
    {
        "id": 1,
“user_id”:”1”,
        "name": "admin",
        "login_at": "2018-10-13 11:32:45"
    },
    {
        "id": 3,
 “user_id”:”2”,
        "name": "user1",
        " login_at ": "2018-05-12 07:02:55"
    },
    {
        "id": 3,
“user_id”:”3”,
        "name": "user2",
        " login_at ": "2018-10-12 08:26:23"
    }
]


*注意
[ ] 参数为可选参数，其他均为必选参数。

```


