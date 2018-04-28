# vue2-onlinestore

> vue2+node.js+mongDB

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

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).


### 技术栈


### 插件

[axios](https://www.kancloud.cn/yunye/axios) 请求http

[mongoose](http://mongoosejs.com/docs/api.html) 操作mongodb数据库

[express](http://expressjs.com/zh-cn/4x/api.html) node框架

[ejs](https://www.npmjs.com/package/ejs) 将jade转化为html

[vue-lazyload](https://www.npmjs.com/package/vue-infinite-scroll) 懒加载

[Font Awesome](http://www.fontawesome.com.cn/) 图标库使用

[Vuex数据管理](https://vuex.vuejs.org/zh-cn/state.html)

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





### 坑
#### 接口返回数据类型
使用接口请求返回来的数据类型，一般都是String类型，Number类型一般会做隐式转换，但是对于Boolean类型的数据，需要看接口怎么定义的，如果定义的是String类型的`'true' 'false'`,接收到数据要做类型转换。
