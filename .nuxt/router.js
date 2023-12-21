import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3e6c8eff = () => interopDefault(import('..\\pages\\cart\\index.vue' /* webpackChunkName: "pages/cart/index" */))
const _9949c2f2 = () => interopDefault(import('..\\pages\\feedbacks\\index.vue' /* webpackChunkName: "pages/feedbacks/index" */))
const _c6b4225c = () => interopDefault(import('..\\pages\\forgot-password.vue' /* webpackChunkName: "pages/forgot-password" */))
const _1076c876 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _2db890da = () => interopDefault(import('..\\pages\\orders\\index.vue' /* webpackChunkName: "pages/orders/index" */))
const _002fdcd8 = () => interopDefault(import('..\\pages\\print-bill\\index.vue' /* webpackChunkName: "pages/print-bill/index" */))
const _1a3e3e98 = () => interopDefault(import('..\\pages\\recharge\\index.vue' /* webpackChunkName: "pages/recharge/index" */))
const _62e616f0 = () => interopDefault(import('..\\pages\\tracking\\index.vue' /* webpackChunkName: "pages/tracking/index" */))
const _99d00eac = () => interopDefault(import('..\\pages\\transactions\\index.vue' /* webpackChunkName: "pages/transactions/index" */))
const _3ccb3e1c = () => interopDefault(import('..\\pages\\posts\\confirm\\index.vue' /* webpackChunkName: "pages/posts/confirm/index" */))
const _7a17fea6 = () => interopDefault(import('..\\pages\\posts\\create\\index.vue' /* webpackChunkName: "pages/posts/create/index" */))
const _3ad8965d = () => interopDefault(import('..\\pages\\services\\create.vue' /* webpackChunkName: "pages/services/create" */))
const _3460104c = () => interopDefault(import('..\\pages\\posts\\confirm\\_id.vue' /* webpackChunkName: "pages/posts/confirm/_id" */))
const _580b9700 = () => interopDefault(import('..\\pages\\orders\\_id\\index.vue' /* webpackChunkName: "pages/orders/_id/index" */))
const _0f96b9b8 = () => interopDefault(import('..\\pages\\posts\\_id\\index.vue' /* webpackChunkName: "pages/posts/_id/index" */))
const _0b9fb139 = () => interopDefault(import('..\\pages\\services\\_id\\index.vue' /* webpackChunkName: "pages/services/_id/index" */))
const _b8e95ad8 = () => interopDefault(import('..\\pages\\posts\\_id\\edit.vue' /* webpackChunkName: "pages/posts/_id/edit" */))
const _46cf255f = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/cart",
    component: _3e6c8eff,
    name: "cart"
  }, {
    path: "/feedbacks",
    component: _9949c2f2,
    name: "feedbacks"
  }, {
    path: "/forgot-password",
    component: _c6b4225c,
    name: "forgot-password"
  }, {
    path: "/login",
    component: _1076c876,
    name: "login"
  }, {
    path: "/orders",
    component: _2db890da,
    name: "orders"
  }, {
    path: "/print-bill",
    component: _002fdcd8,
    name: "print-bill"
  }, {
    path: "/recharge",
    component: _1a3e3e98,
    name: "recharge"
  }, {
    path: "/tracking",
    component: _62e616f0,
    name: "tracking"
  }, {
    path: "/transactions",
    component: _99d00eac,
    name: "transactions"
  }, {
    path: "/posts/confirm",
    component: _3ccb3e1c,
    name: "posts-confirm"
  }, {
    path: "/posts/create",
    component: _7a17fea6,
    name: "posts-create"
  }, {
    path: "/services/create",
    component: _3ad8965d,
    name: "services-create"
  }, {
    path: "/posts/confirm/:id",
    component: _3460104c,
    name: "posts-confirm-id"
  }, {
    path: "/orders/:id",
    component: _580b9700,
    name: "orders-id"
  }, {
    path: "/posts/:id",
    component: _0f96b9b8,
    name: "posts-id"
  }, {
    path: "/services/:id",
    component: _0b9fb139,
    name: "services-id"
  }, {
    path: "/posts/:id?/edit",
    component: _b8e95ad8,
    name: "posts-id-edit"
  }, {
    path: "/",
    component: _46cf255f,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
