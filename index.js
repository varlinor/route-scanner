const path=require('path'),
    fs=require('fs');

const _def_opts={
    debug:true,
    routerPath:'',
    prefix:'',
    replacePaths:[/*{
        from:'/index',
        to:'/'
    }*/],
    // extraMaps 用于添加额外的路由目录
    extraMaps:[{
        /*rootPath:path.join(__dirname, '/core/base-routes'),
        fileMaps:[{
            url:'/admin',
            file:'admin.js'
        }]*/
    }]
};

class Scanner {
    constructor(opts){
        this.options=Object.assign({},_def_opts,opts);
        this.debug=this.options.debug;
        this.prefix= this.options.prefix;
        this.routerPath=this.options.routerPath;
        this.extraMaps=this.options.extraMaps;
        this.replaceMap=new Map();
        this.routerMap=new Map();
    }

    processRouter(app){
        if(app && typeof this.routerPath ==='string' ){
            if(this.prefix.indexOf('/')<0){
                let repPaths=this.options.replacePaths;
                // add default redirection
                if(this.prefix){
                    this.prefix=`/${this.prefix}`;
                    app.get('/',(req,res,next)=>{
                        res.redirect(`${this.prefix}/`);
                    });
                }

                repPaths.map( ({from,to})=>{
                    // let {from,to}=item;
                    this.replaceMap.set(from,to);
                });

                //  v2
                this.scanPath(app,this.routerPath,'');

                // process extra maps
                this.extraMaps.map( map =>{
                    let {rootPath,fileMaps}=map;
                    if(rootPath && fileMaps){
                        fileMaps.map(item=>{
                            let {url,file}=item;
                            if(url && file){
                                let ffp=path.join(rootPath, file),
                                    m=require(ffp);
                                app.use(url,m);
                                this.routerMap.set(url,ffp);
                            }
                        });
                    }
                });

                //  print all route
                console.log('Registered Routers:');
                console.log(this.routerMap);
            }else{
                throw `the prefix:[${this.prefix}] is illegal! prefix can not start with '/'`;
            }
        }
    }

    registerRouter(app,dirPrefix,fname){
        let replaceMap=this.replaceMap ;
        if(fname.toLowerCase().endsWith('.js')){
            let key=fname.substring(0,fname.lastIndexOf('.')),
                fp=path.join(this.routerPath, dirPrefix, fname),
                m=require(fp);
            if(m!==undefined){
                let url=`${dirPrefix}/${key}`,
                    realK='';
                if(replaceMap.get(url)){
                    realK=replaceMap.get(url);
                }else{
                    realK=url;
                }
                realK=`${this.prefix}${realK}`;
                if(this.debug){
                    console.log(`register router [${realK}] with file :${fp}`);
                }
                app.use(realK,m);
                this.routerMap.set(realK,fp);
            }else{
                throw `${m} is not function!`;
            }
        }
    }

    scanPath(app,dir,dirPrefix){
        if(dir){
            if(this.debug){
                console.log(`scan ${dir} ; Directory prefix:${dirPrefix}`);
            }
            const curFiles=fs.readdirSync(dir,{withFileTypes :true});
            curFiles.map( fItem => {
                if(fItem.isFile()){
                    this.registerRouter(app,dirPrefix,fItem.name);
                }else if(fItem.isDirectory()){
                    let nextPrefix=`${dirPrefix}/${fItem.name}`,
                        nextPath=path.join(this.routerPath,nextPrefix);
                    this.scanPath(app,nextPath,nextPrefix);
                }
            });
            if(this.debug){
                console.log(`scan ${dir} completed!`);
            }
        }
    }

}

module.exports=function (app,opts) {
    let scanner;
    if(app && opts){
        scanner=new Scanner(opts);
        scanner.processRouter(app);
    }else{
        throw 'No app find!';
    }
    return scanner;
};