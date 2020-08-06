/**
 * just test express add route-scanner
 * @type {*|createApplication}
 */
const express=require('express'),
    path = require('path'),
    scanner=require('../../index'),
    app=express(),port=3000;

//  load routers
scanner(app,{
    debug:true,
    routerPath: path.join(__dirname, 'routes'),
    prefix:'test',   //  modifier
    replacePaths:[{
        from:'/index',
        to:'/'
    }],
    extraMaps:[{
        rootPath:path.join(__dirname, 'otherRoutes'),
        fileMaps:[{
            url:'/sys',
            file:'admin.js'
        }]
    }]
});


app.listen(port,()=>{
    console.log(`Listen on port ${port}`);
});