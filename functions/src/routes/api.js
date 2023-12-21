import Router from 'koa-router';

export default function apiRouter(isEmbed = false) {
  const router = new Router({prefix: '/'});
  router.get('/', async (ctx, next) => {
    try {
      ctx.body = {
        success: true
      };
    } catch (e) {
      ctx.body = {
        success: false
      };
    }
  });
  return router;
}
