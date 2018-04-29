# vue2-onlinestore

> vue2+node.js+mongoDB
参考慕课网的教程，前面一部分照着视频，熟悉商城架构，数据库操作，node服务接口书写方法，后面到购物车，地址，订单，用户新增都自己根据商品列表规范书写，并最终部署上线。

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

项目演示地址： [store.xiaao.xin](http://store.xiaao.xin)
用户：admin 密码：123456

### 分支
* 源码分支source
* 代码分支master

## 目录

```
.
├── build
│   ├── build.js
│   ├── check-versions.js
│   ├── logo.png
│   ├── utils.js
│   ├── vue-loader.conf.js
│   ├── webpack.base.conf.js
│   ├── webpack.dev.conf.js
│   └── webpack.prod.conf.js
├── config
│   ├── dev.env.js
│   ├── global.js
│   ├── index.js
│   └── prod.env.js
├── mockData
│   ├── dumall-goods        // 数据库备份文件
│   ├── dumall-users        // 数据库备份文件
│   ├── goods               // 数据库备份文件
│   └── package.json
├── server                  // node服务目录，严格来讲应该另起一个目录开发，实现前后端分离
│   ├── bin
│   │   └── www             // 服务
│   ├── modules             // model模型
│   │   ├── goods.js
│   │   └── users.js
│   ├── public          
│   │   ├── javascripts
│   │   │   ├── doc.js
│   │   │   └── util.js
│   │   └── stylesheets
│   │       └── style.css
│   ├── routes              // 路由
│   │   ├── goods.js        // goods路由及接口
│   │   ├── index.js        // 主路由
│   │   └── users.js        // users路由及接口
│   ├── views               // 视图
│   │  └── index.html
│   ├── app.js              // 主文件
│   ├── package.json
├── src
│   ├── assets
│   │   ├── check.png
│   │   ├── css
│   │   │   └── base.css
│   │   └── logo.png
│   ├── components          // 组件
│   │   ├── address
│   │   │   └── address.vue
│   │   ├── cart
│   │   │   └── cart.vue
│   │   ├── checkProcess
│   │   │   └── checkProcess.vue
│   │   ├── dialog
│   │   │   └── dialog.vue
│   │   ├── footer
│   │   │   └── footer.vue
│   │   ├── goodsList
│   │   │   └── goodsList.vue
│   │   ├── header
│   │   │   ├── header.vue
│   │   │   ├── logo.png
│   │   │   └── mi.jpeg
│   │   ├── navBread
│   │   │   └── navBread.vue
│   │   ├── order
│   │   │   └── order.vue
│   │   └── orderFinish
│   │       └── orderFinish.vue
│   ├── router              // 路由配置
│   │   └── index.js
│   ├── store               // vuex数据仓库
│   │   ├── index.js        // 入口文件
│   │   └── module
│   │       ├── cart.js     // 购物车参数
│   │       └── global.js   // 全局参数
│   │── util                // 工具库
│   │   ├── currency.js
│   │   └── util.js
│   ├── main.js             // 主函数
│   └── App.vue             // app.vue
├── static
│   ├── goods.json          // 本地模拟数据
│   └── img                 // 图片路径 
├── index.html
├── README.md
├── package.json
└── store.conf              // nginx配置文件
```
## 前端技术栈

### 插件

[axios](https://www.kancloud.cn/yunye/axios) 请求http

[vue-router](https://router.vuejs.org/zh-cn/essentials/getting-started.html) 前端路由，传参。

[vue-lazyload](https://www.npmjs.com/package/vue-infinite-scroll) 懒加载

[Font Awesome](http://www.fontawesome.com.cn/) 图标库使用

[Vuex数据公共管理](https://vuex.vuejs.org/zh-cn/state.html)

货币过滤器，时间格式化等工具库的使用

```js
`npm install font-awesome --save`
 // 在main.js里添加
`import 'font-awesome/css/font-awesome.css'`
```

[Element UI](http://element-cn.eleme.io/#/zh-CN/component/)  样式库

### 技术点

#### 刷新页面时使用cookies里面的数据进行登录验证

当用户登录后，用户信息存储在cookies里面，刷新页面时，系统里面的所有变量都会被init，此时从cookies里面获取用户信息，相当于重新登录，刷新之后还是原用户，使用登录拦截实现。

#### [父子组件之间相互通信](https://cn.vuejs.org/v2/guide/components.html#Prop)
* 父组件使用`v-bind:data="data"`对数据实现绑定，子组件使用`props:['data']`实现接收，如果子组件想要实时监听父组件数据的变化，可以使用watch监听
* 子组件使用`$emit('childData')`向父组件传递数据，父组件使用`v-on:childData="handle"`监听子组件传递过来的数据

#### slot插槽的使用
尤其针对于面包屑这类场景，十分有效

#### Vuex管理右上角购物车商品种类数量
登录、刷新，登录数量变化，添加购物车，删除商品数量变化

建立一个全局的数据仓库store，封装在状态树里面state，所有组件共享，所有组件都可以操作，一旦状态变化，所有组件都可以接受到变化，实现数据在组件间的实时共享。

以前使用`$emit, $on`在不同组件之间传递数据非常麻烦。

#### proxy代理实现前端跨越
在开发的过程中，如果遇到前端跨域的问题，可以考虑用代理实现前端跨越。

### 坑
#### 接口返回数据类型
使用接口请求返回来的数据类型，一般都是String类型，Number类型一般会做隐式转换，但是对于Boolean类型的数据，需要看接口怎么定义的，如果定义的是String类型的`'true' 'false'`,接收到数据要做类型转换。


## node接口技术栈

### 插件
[mongoose](http://mongoosejs.com/docs/api.html) 操作mongodb数据库

[express](http://expressjs.com/zh-cn/4x/api.html) node框架

[ejs](https://www.npmjs.com/package/ejs) 将jade转化为html

[pm2](https://www.npmjs.com/package/pm2) pm2管理服务，即使在线上也是通常使用pm2进行server管理



### 技术点

#### 刷新页面时使用cookies里面的数据进行登录验证

当用户登录后，用户信息存储在cookies里面，刷新页面时，系统里面的所有变量都会被init，此时从cookies里面获取用户信息，相当于重新登录，刷新之后还是原用户，使用登录拦截实现。

#### 购物车信息存储在数据库
有一种方案是将购物车数据不提交到数据库，存放到session中，设置session的过期时间比较久，这样不用操作数据库，速度比较快，但是安全性和存储大小的原因不推荐。
其次，存放到数据库的时候，可以使用数据库缓存，这样查询时间比较快，响应也比较快，在体验上比较友好。

#### mongoose API
实际上还是mongoDB的数据库操作的API，只是用node做了一层封装，使用起来很方便。

```js
 // 建表
  var mongoose = require('mongoose');
  var Schema = mongoose.Schema;

  var productSchema = new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
  });
```
```js
// 从sch生成一个model，针对model对数据库进行操作。
mongoose.model('Good', productSchema);
```
```lang-javascript
// 连接
mongoose.connect('mongodb://35.200.14.97:27017/store');
```
后面就是操作数据库的增删改查

#### webstorm断点调试
这个使用node开启服务，捕获断点十分有效

### 坑

#### 接口返回数据类型
使用接口请求返回来的数据类型，一般都是String类型，Number类型一般会做隐式转换，但是对于Boolean类型的数据，需要看接口怎么定义的，如果定义的是String类型的`'true' 'false'`,接收到数据要做类型转换。

#### 接口操作多层嵌套繁杂
如果遇到一个比较复杂的接口，要进行查询，更新，保存，删除等操作，需要比较进行好几次操作，西施为了防止返回错误，常规方法就是使用嵌套，多了就比较麻烦，可以把方法抽离出来。

## 部署上线
自己有域名和服务器，数据库开发的时候就是用装在服务器上的数据库操作的。

#### node服务部署
将server目录上传到服务器，cnpm install安装依赖，然后使用pm2管理服务。十分简单。

#### 前端部署

```js
npm run build
```
生成dist打包文件，里面有static 和 index.html

注意：关于build配置中的`assetsPublicPath: '/'`发布路径的配置，如果不是使用的二级域名访问的的部署方式，打包的时候加上域名访问路径，例如`http://www.xiaao.xin/store`,则打包时设置为`assetsPublicPath: '/store'`。

* 方法一：放在node服务的public当中访问，url要加路径，当然不是我想要的。
* 方法二：放在tomcat服务中，在`/webapps`路径下新建一个项目文件夹，将打包的文件丢在项目文件夹中，访问路径为：`www.xiaao.xin:8080/项目文件夹`。
* 方法三：使用nginx代理灵活配置多个项目，推荐使用。

**nginx代理**

1、将项目打包文件static和index.html上传到服务器路径`/workspace/online-store/store`下。

2、nginx代理配置

1. 在`xiaao.xin`域名解析下添加二级域名解析`store.xiaao.xin`
2. 安装nginx：```$sudo apt-get install nginx```

    [配置文件目录](https://www.jianshu.com/p/7cb1a824333e)
    `nginx.conf`在`/etc/nginx`目录下
3. 在`/etc/nginx`目录下新建一个`vhost`文件夹，用于存放不同的项目host配置文件。
4. 在`/etc/nginx`目录下找到`nginx.conf`文件。
    ```
    // 在http配置最后添加一行，将vhost中的配置文件包含进去
    http{
         include /etc/nginx/vhost/*.conf;
    }
    ```
5. 在`vhost`目录下新建配置文件`store.conf`
    ```
    server {
        listen 80;
        server_name *.xiaao.xin;
        root /workspace/online-store/store;
        index index.php index.html index.htm;
    
        location /users {
        	proxy_set_header X-Real-IP $remote_addr;
        	proxy_pass http://127.0.0.1:3000/users;
    
         }
        location /goods {
            proxy_set_header X-Real-IP $remote_addr;
            proxy_pass http://127.0.0.1:3000/goods;
        }
    }

    ```
    添加配置：尤其是在此项目中，nginx代理的是80端口，node服务使用的3000端口，所有要进行跨越处理，一般使用jsonp或者CORS跨域，但是这里使用代理，将访问/users的接口转发到`http://127.0.0.1:3000/users`进行处理，具体写几个转发配置视项目接口。

    注意：每次配置了nginx，都要重启nginx：`nginx -s reload`
6. 访问`store.xiaao.xin`

**注意：** 关于前端跨域的解决，着实花了不少功夫，照着网上的解决方案尝试了很多种，发现都不行，最后根据自己的理解，尝试这样的路径配置。然后get请求没有问题，但是出现了post请求报400的错误，在开发的过程中没有这个问题，怎么可能单单get没事post报错，猜测可能不是nginx的问题，所以重启了node服务就解决问题，nice
