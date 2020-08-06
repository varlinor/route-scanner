const router = require('koa-router')();

router.prefix('/moduleA');

router.get('/querySomething',async (ctx, next)=>{
    ctx.body={
        name:'Alex',
        age:4,
        gender:'male'
    };
});

module.exports =router;