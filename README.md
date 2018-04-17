
## 下载依赖
```
npm install
```

## 打包代码

```
npm run web
```

## 启动服务

```
npm start
```

## 说明

该项目是一个基于dva的单页面应用，前端页面代码位于web目录下。后端代码位于src目录下。打包代码位于www/static/js下，静态资源存放于www/static目录下。
需要注意的是：
1.访问端口为：8088，即浏览器访问路径为： http://127.0.0.1:8088
2.路由配置文件为routerConfig.js，格式如下：
```

module.exports = [
    {
        name: '首页',
        path: '/',
        model: ['demo'],
        component: () => import('./routers/demo/demo'),
        children: [
            {
                name: '子路由',
                path: 'demo/index',
                model: ['demo'],
                component:() => import('./routers/demo/demo'),
            }
        ]
    }
]
```

3.组件存放在web/routers目录下，组件相关的状态放在web/models目录下。
4.请求发送是基于fetch封装的，发送请求的方法为sendQequest({ url, method, body, headers })，例如：
```
yield sendQequest({
                url: '/demo/demo/addDemo',
                method: 'POST',
                body:data
});
```

## 实现效果图
![image](https://github.com/windSandEye/ThinkJsDemo2/blob/master/www/static/img/%E6%95%88%E6%9E%9C%E5%9B%BE.png)
