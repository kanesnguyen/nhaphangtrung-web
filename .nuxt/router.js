import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _52db7395 = () => interopDefault(import('..\\pages\\ads\\index.vue' /* webpackChunkName: "pages/ads/index" */))
const _45681fb7 = () => interopDefault(import('..\\pages\\feedbacks\\index.vue' /* webpackChunkName: "pages/feedbacks/index" */))
const _bd47f0bc = () => interopDefault(import('..\\pages\\forgot-password.vue' /* webpackChunkName: "pages/forgot-password" */))
const _2e7ea546 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _3658c1d2 = () => interopDefault(import('..\\pages\\posts\\index.vue' /* webpackChunkName: "pages/posts/index" */))
const _304749c9 = () => interopDefault(import('..\\pages\\ads\\create.vue' /* webpackChunkName: "pages/ads/create" */))
const _2bb0dab6 = () => interopDefault(import('..\\pages\\posts\\categories\\index.vue' /* webpackChunkName: "pages/posts/categories/index" */))
const _6634d0e6 = () => interopDefault(import('..\\pages\\services\\create.vue' /* webpackChunkName: "pages/services/create" */))
const _7d37cef0 = () => interopDefault(import('..\\pages\\users\\author.vue' /* webpackChunkName: "pages/users/author" */))
const _04377518 = () => interopDefault(import('..\\pages\\users\\manager.vue' /* webpackChunkName: "pages/users/manager" */))
const _df295186 = () => interopDefault(import('..\\pages\\ads\\_id.vue' /* webpackChunkName: "pages/ads/_id" */))
const _7bb0e78f = () => interopDefault(import('..\\pages\\libraries\\_type\\index.vue' /* webpackChunkName: "pages/libraries/_type/index" */))
const _81ac42f0 = () => interopDefault(import('..\\pages\\posts\\_id\\index.vue' /* webpackChunkName: "pages/posts/_id/index" */))
const _402ecb2e = () => interopDefault(import('..\\pages\\services\\_id\\index.vue' /* webpackChunkName: "pages/services/_id/index" */))
const _359853c4 = () => interopDefault(import('..\\pages\\posts\\_id\\edit.vue' /* webpackChunkName: "pages/posts/_id/edit" */))
const _64d7022f = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/ads",
    component: _52db7395,
    name: "ads"
  }, {
    path: "/feedbacks",
    component: _45681fb7,
    name: "feedbacks"
  }, {
    path: "/forgot-password",
    component: _bd47f0bc,
    name: "forgot-password"
  }, {
    path: "/login",
    component: _2e7ea546,
    name: "login"
  }, {
    path: "/posts",
    component: _3658c1d2,
    name: "posts"
  }, {
    path: "/ads/create",
    component: _304749c9,
    name: "ads-create"
  }, {
    path: "/posts/categories",
    component: _2bb0dab6,
    name: "posts-categories"
  }, {
    path: "/services/create",
    component: _6634d0e6,
    name: "services-create"
  }, {
    path: "/users/author",
    component: _7d37cef0,
    name: "users-author"
  }, {
    path: "/users/manager",
    component: _04377518,
    name: "users-manager"
  }, {
    path: "/ads/:id",
    component: _df295186,
    name: "ads-id"
  }, {
    path: "/libraries/:type",
    component: _7bb0e78f,
    name: "libraries-type"
  }, {
    path: "/posts/:id",
    component: _81ac42f0,
    name: "posts-id"
  }, {
    path: "/services/:id",
    component: _402ecb2e,
    name: "services-id"
  }, {
    path: "/posts/:id/edit",
    component: _359853c4,
    name: "posts-id-edit"
  }, {
    path: "/",
    component: _64d7022f,
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
