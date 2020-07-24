# route-scanner

[English](README.md) | [中文](doc/cn/readme_cn.md)

Recent version: v0.2.0

## Release History
See the [Change Log](doc/en/changelog.md)

## Introduction
This module is a tiny tool just for scan some route file in a directory, you can use it to load masses of route files fastly and conveniently.

## Quick Start
First of all, you need install `route-scanner` to your project:
```
npm i route-scanner --save
```

then, import the module and initialize it in your `app.js` just like below:
```
const routeScanner = require('route-scanner');
......

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
// other express codes to use middleware
module.exports=app;
``` 

after that, you can create any router file in directory `/routes/`, and don't write `use` sentence in `app.js`.  


## Configuration
### debug
You can set `debug:true` to open scan logs print.
```
{
    debug:true
}
```
### routerPath
Specify the root for those route files. It's an absolutly path, so you can input like this:
```
{
    routerPath: path.join(__dirname, 'routes'),
}
```

### prefix
Specify the prefix of the url, if you fill a string, then your root url turned to `http://localhost:3000/string`, and also, the empty value is possible.
```
{
    prefix:'yourProjectName'  // url is http://localhost:3000/yourProjectName
}
// or 
{
    prefix:''     // url is http://localhost:3000
}
```

### replacePaths
If you want to change a file name to an other url, you can use this option:
```
{
    replacePaths:[{
        from:'/index',
        to:'/mgr/index'
    }],
    // enter http://localhost:3000/mgr/index will directed to index.js
}
```
then, the route file `/routes/index.js` will be mapped to `/mgr/index`,
so the full url is `http://localhost:3000/mgr/index`, when you enter
this url , it will be directed to `index.js`

### extraMaps
Specify another path to load other route files, you can use it like below:
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

Just support a way to mapping file and url, you can use it easily


## License
Copyright (c) 2020 George under the [MIT License](LICENSE)


