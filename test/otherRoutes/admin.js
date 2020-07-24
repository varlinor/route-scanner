const express = require('express'),
    router = express.Router();

router.get('/menu',function(req,res,next){
    let data={},
        {type}=req.query;
    if(type=='top'){
        data={"code":0,"msg":null,"data":[]};
    }else{
        data={"code":0,"msg":null,"data":[{
                id:100,parentId:-1,name:'menu1',path:'/sys/moduleA'
            },{
                id:101,parentId:-1,name:'menu2',path:'/sys/moduleB'
            }]};
    }
    return res.json(data);
});

module.exports =router;