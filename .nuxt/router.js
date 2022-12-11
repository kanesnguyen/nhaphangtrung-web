import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _a6e8fd6a = () => interopDefault(import('..\\pages\\feedbacks\\index.vue' /* webpackChunkName: "pages/feedbacks/index" */))
const _5387b8e4 = () => interopDefault(import('..\\pages\\forgot-password.vue' /* webpackChunkName: "pages/forgot-password" */))
const _05287832 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _a065cea4 = () => interopDefault(import('..\\pages\\posts\\confirm\\index.vue' /* webpackChunkName: "pages/posts/confirm/index" */))
const _69dd412c = () => interopDefault(import('..\\pages\\posts\\create\\index.vue' /* webpackChunkName: "pages/posts/create/index" */))
const _3408f921 = () => interopDefault(import('..\\pages\\services\\create.vue' /* webpackChunkName: "pages/services/create" */))
const _4b856e96 = () => interopDefault(import('..\\pages\\posts\\confirm\\_id.vue' /* webpackChunkName: "pages/posts/confirm/_id" */))
const _3c72af74 = () => interopDefault(import('..\\pages\\posts\\_id\\index.vue' /* webpackChunkName: "pages/posts/_id/index" */))
const _5c9911fd = () => interopDefault(import('..\\pages\\services\\_id\\index.vue' /* webpackChunkName: "pages/services/_id/index" */))
const _c6889550 = () => interopDefault(import('..\\pages\\posts\\_id\\edit.vue' /* webpackChunkName: "pages/posts/_id/edit" */))
const _3b80d51b = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/feedbacks",
    component: _a6e8fd6a,
    name: "feedbacks"
  }, {
    path: "/forgot-password",
    component: _5387b8e4,
    name: "forgot-password"
  }, {
    path: "/login",
    component: _05287832,
    name: "login"
  }, {
    path: "/posts/confirm",
    component: _a065cea4,
    name: "posts-confirm"
  }, {
    path: "/posts/create",
    component: _69dd412c,
    name: "posts-create"
  }, {
    path: "/services/create",
    component: _3408f921,
    name: "services-create"
  }, {
    path: "/posts/confirm/:id",
    component: _4b856e96,
    name: "posts-confirm-id"
  }, {
    path: "/posts/:id",
    component: _3c72af74,
    name: "posts-id"
  }, {
    path: "/services/:id",
    component: _5c9911fd,
    name: "services-id"
  }, {
    path: "/posts/:id?/edit",
    component: _c6889550,
    name: "posts-id-edit"
  }, {
    path: "/",
    component: _3b80d51b,
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
