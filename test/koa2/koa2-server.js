/**
 * just test express add route-scanner
 * @type {*|createApplication}
 */
const Koa = require('koa'),
    app = new Koa(),
    path = require('path'),
    scanner=require('../../index'),
    port=3000;

//  load routers
scanner(app,{
    debug:true,
    framework:'koa2',
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