const router = require('koa-router')();

router.prefix('/index');

router.get('/', async (ctx, next) => {
  ctx.body='Hi route-scanner!';
});

module.exports = router;
