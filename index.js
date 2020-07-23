const path=require('path'),
    fs=require('fs');

const _def_opts={
    routerPath:'',
    prefix:'',
    exceptMap:{},
    specialMap:{}  //  add for special map
};

class RouteScanner {
    constructor(opts){
        this.options=Object.assign({},_def_opts,opts);
        this.prefix=this.options.prefix ? `/${this.options.prefix}` :'';
        this.routerPath=this.options.routerPath;
        this.exceptMap=this.options.exceptMap;
        this.specialMap=this.options.specialMap;
    }

    processRouter(app){
        if(app && typeof this.routerPath ==='string'){
            let fsList,
                map=this.exceptMap,
                speMap=this.specialMap;
            fsList=fs.readdirSync(this.routerPath,{withFileTypes :true});
            // add default redirection
            app.get('/',(req,res,next)=>{
                res.redirect(`${this.prefix}/`);
            });

            fsList.forEach((fItem)=>{
                if(fItem.isFile()){
                    let fname=fItem.name,
                        key=fname.substring(0,fname.lastIndexOf('.'));
                    if(fname.toLowerCase().endsWith('.js')){
                        let fp=path.join(this.routerPath, fname),
                            m=require(fp);
                        if(m!==undefined){
                            if(map[key]){
                                app.use(`${this.prefix}${map[key]}`,m);
                            }else{
                                app.use(`${this.prefix}/${key}`,m);
                            }
                        }else{
                            throw `${m} is not function!`;
                        }
                    }
                }
            });

            // process special map
            let {rootPath,fileMaps}=speMap;
            if(rootPath && fileMaps){
                fileMaps.map(item=>{
                    let {url,file}=item;
                    if(url && file){
                        let ffp=path.join(rootPath, file),
                            m=require(ffp);
                        app.use(url,m);
                    }
                });
            }
        }
    }
}

module.exports=function (app,opts) {
    let scanner;
    if(app && opts){
        scanner=new RouteScanner(opts);
        scanner.processRouter(app);
    }else{
        throw 'No app find!';
    }
    return scanner;
};
