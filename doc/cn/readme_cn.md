# route-scanner

[English](../../README.md) | [中文](readme_cn.md)

最新版本: v0.1.0

## 发布历史
&emsp;&emsp;查看[更新日志](changelog_cn.md)  

## 介绍
&emsp;&emsp;这是一个用来从指定目录扫描路由文件的小工具，你可以通过它快速且方便的加载大量的路由文件。

## 快速上手
&emsp;&emsp;首先你需要安装 `route-scanner` 这一工具到你的项目：
```
npm i route-scanner --save
```

&emsp;&emsp;接着，你需要在 `app.js` 文件中导入，并调用它，就像下面这样:
```
const routeScanner = require('route-scanner');
......
// 加载路由
routeScanner(app,{
    debug:false,
    routerPath: path.join(__dirname, 'routes'),
    prefix:'std',   //  modifier
    replacePaths:[{
        from:'/index',
        to:'/'
    }],
    extraMaps:[{
        rootPath:path.join(__dirname, '/core/base-routes'),
        fileMaps:[{
            url:'/admin',
            file:'admin.js'
        }]
    }]
});
......
// 其他 use 中间件的代码
module.exports=app;
``` 

&emsp;&emsp;在那之后，你可以在 `/routes/`目录下，创建你需要的任意名称的路由文件，而不用像往常一样在`app.js`文件中写`use`代码。  


## 配置参数
### debug
设置`debug:true`可以打开扫描日志的输出。
```
{
    debug:true
}
```
### routerPath
&emsp;&emsp;指定那些路由文件所在的目录，像express框架，默认的路由目录为`routes`，这是一个绝对路径，所以你可以像下面这种写法来配置：
```
{
    routerPath: path.join(__dirname, 'routes'),
}
```

### prefix
&emsp;&emsp;指定url的前缀，如果你配置一个字符串，你的项目原本的根url就变为了`http://localhost:3000/你配置的字符串`， 注意，该字段可为空值。  

```
{
    prefix:'yourProjectName'  // url 是 http://localhost:3000/yourProjectName
}
// or 
{
    prefix:''     // url 是 http://localhost:3000
}
```

### replacePaths
&emsp;&emsp;如果你想要改变url默认拼接方式，即识别文件名作为url一部分这种规则，你可以通过配置这个属性，来替换文件对应的url：
```
{
    replacePaths:[{
        from:'/index',
        to:'/mgr/index'
    }],
    // 进入 http://localhost:3000/mgr/index 会定向到文件index.js
}
```
&emsp;&emsp;配置后路由文件`/routes/index.js` 将会被映射成
`/mgr/index`，所以访问`http://localhost:3000/mgr/index`这一路径时，实际转向的是`index.js`文件内定义的路由。同样，配置`user:'/manager/user'`，可将原本访问`http://localhost:3000/user`的url变为：`http://localhost:3000/manager/user`。

### extraMaps
&emsp;&emsp;指定一个或多个其他路径并加载其中的路由文件，配置方式如下：
```
{
    extraMaps:[{
        rootPath:path.join(__dirname, '/another-routes-path'),
        fileMaps:[{
            url:'/admin',
            file:'admin.js'
        },{
            url:'/service',
            file:'/subdir/service.js'
        }]
    }]
}
```

&emsp;&emsp;在工程化的时候，可能会将框架部分和子系统的路由分别放在不同目录，因此该选项提供了一种直接映射路由文件和路径的方案，你可以更轻松的指定路由文件和url。例如，将框架特定的路由配置在extraMaps中，而子系统的路由均放在`routes/`目录下。


## 许可
Copyright (c) 2020 George under the [MIT License](LICENSE)
