"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = apiRouter;
var _koaRouter = _interopRequireDefault(require("koa-router"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function apiRouter(isEmbed = false) {
  const router = new _koaRouter.default({
    prefix: '/'
  });
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
//# sourceMappingURL=api.js.map