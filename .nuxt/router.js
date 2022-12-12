import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _3afaabc8 = () => interopDefault(import('..\\pages\\cart\\index.vue' /* webpackChunkName: "pages/cart/index" */))
const _715a6d8a = () => interopDefault(import('..\\pages\\feedbacks\\index.vue' /* webpackChunkName: "pages/feedbacks/index" */))
const _78619922 = () => interopDefault(import('..\\pages\\forgot-password.vue' /* webpackChunkName: "pages/forgot-password" */))
const _1992bd53 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _24b458b7 = () => interopDefault(import('..\\pages\\orders\\index.vue' /* webpackChunkName: "pages/orders/index" */))
const _021a6e35 = () => interopDefault(import('..\\pages\\print-bill\\index.vue' /* webpackChunkName: "pages/print-bill/index" */))
const _41678335 = () => interopDefault(import('..\\pages\\recharge\\index.vue' /* webpackChunkName: "pages/recharge/index" */))
const _14938db6 = () => interopDefault(import('..\\pages\\tracking\\index.vue' /* webpackChunkName: "pages/tracking/index" */))
const _36b8b272 = () => interopDefault(import('..\\pages\\transactions\\index.vue' /* webpackChunkName: "pages/transactions/index" */))
const _421a0862 = () => interopDefault(import('..\\pages\\posts\\confirm\\index.vue' /* webpackChunkName: "pages/posts/confirm/index" */))
const _7a021429 = () => interopDefault(import('..\\pages\\posts\\create\\index.vue' /* webpackChunkName: "pages/posts/create/index" */))
const _0e503540 = () => interopDefault(import('..\\pages\\services\\create.vue' /* webpackChunkName: "pages/services/create" */))
const _175ba5f7 = () => interopDefault(import('..\\pages\\posts\\confirm\\_id.vue' /* webpackChunkName: "pages/posts/confirm/_id" */))
const _11814b15 = () => interopDefault(import('..\\pages\\posts\\_id\\index.vue' /* webpackChunkName: "pages/posts/_id/index" */))
const _0b89c6bc = () => interopDefault(import('..\\pages\\services\\_id\\index.vue' /* webpackChunkName: "pages/services/_id/index" */))
const _618aa197 = () => interopDefault(import('..\\pages\\posts\\_id\\edit.vue' /* webpackChunkName: "pages/posts/_id/edit" */))
const _4feb1a3c = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _3afaabc8,
    name: "cart"
  }, {
    path: "/feedbacks",
    component: _715a6d8a,
    name: "feedbacks"
  }, {
    path: "/forgot-password",
    component: _78619922,
    name: "forgot-password"
  }, {
    path: "/login",
    component: _1992bd53,
    name: "login"
  }, {
    path: "/orders",
    component: _24b458b7,
    name: "orders"
  }, {
    path: "/print-bill",
    component: _021a6e35,
    name: "print-bill"
  }, {
    path: "/recharge",
    component: _41678335,
    name: "recharge"
  }, {
    path: "/tracking",
    component: _14938db6,
    name: "tracking"
  }, {
    path: "/transactions",
    component: _36b8b272,
    name: "transactions"
  }, {
    path: "/posts/confirm",
    component: _421a0862,
    name: "posts-confirm"
  }, {
    path: "/posts/create",
    component: _7a021429,
    name: "posts-create"
  }, {
    path: "/services/create",
    component: _0e503540,
    name: "services-create"
  }, {
    path: "/posts/confirm/:id",
    component: _175ba5f7,
    name: "posts-confirm-id"
  }, {
    path: "/posts/:id",
    component: _11814b15,
    name: "posts-id"
  }, {
    path: "/services/:id",
    component: _0b89c6bc,
    name: "services-id"
  }, {
    path: "/posts/:id?/edit",
    component: _618aa197,
    name: "posts-id-edit"
  }, {
    path: "/",
    component: _4feb1a3c,
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
