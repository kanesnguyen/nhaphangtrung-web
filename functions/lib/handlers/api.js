"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _koa = _interopRequireDefault(require("koa"));
var _cors = _interopRequireDefault(require("@koa/cors"));
var _api = _interopRequireDefault(require("../routes/api"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
// Move this import statement up

// Initialize all demand configuration for an application
const api = new _koa.default();
api.proxy = true;

// Register all routes for the application
const router = (0, _api.default)();
api.use((0, _cors.default)());
api.use(router.allowedMethods());
api.use(router.routes());
var _default = exports.default = api;
//# sourceMappingURL=api.js.map