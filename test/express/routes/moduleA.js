const express = require('express'),
    router = express.Router();

router.get('/querySomething',function(req,res,next){
    const data={
        name:'Alex',
        age:4,
        gender:'male'
    };
    return res.json(data);
});

module.exports =router;