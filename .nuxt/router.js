import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _45681fb7 = () => interopDefault(import('..\\pages\\feedbacks\\index.vue' /* webpackChunkName: "pages/feedbacks/index" */))
const _bd47f0bc = () => interopDefault(import('..\\pages\\forgot-password.vue' /* webpackChunkName: "pages/forgot-password" */))
const _2e7ea546 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _55f1c23c = () => interopDefault(import('..\\pages\\news\\index.vue' /* webpackChunkName: "pages/news/index" */))
const _fd482238 = () => interopDefault(import('..\\pages\\partners\\index.vue' /* webpackChunkName: "pages/partners/index" */))
const _123adc8b = () => interopDefault(import('..\\pages\\products\\index.vue' /* webpackChunkName: "pages/products/index" */))
const _84212896 = () => interopDefault(import('..\\pages\\projects\\index.vue' /* webpackChunkName: "pages/projects/index" */))
const _56f5f738 = () => interopDefault(import('..\\pages\\recruitments\\index.vue' /* webpackChunkName: "pages/recruitments/index" */))
const _630ea706 = () => interopDefault(import('..\\pages\\users\\index.vue' /* webpackChunkName: "pages/users/index" */))
const _e00a5ffc = () => interopDefault(import('..\\pages\\news\\create.vue' /* webpackChunkName: "pages/news/create" */))
const _2028b022 = () => interopDefault(import('..\\pages\\products\\categories\\index.vue' /* webpackChunkName: "pages/products/categories/index" */))
const _5cd4ff93 = () => interopDefault(import('..\\pages\\products\\create.vue' /* webpackChunkName: "pages/products/create" */))
const _27b255a9 = () => interopDefault(import('..\\pages\\projects\\create.vue' /* webpackChunkName: "pages/projects/create" */))
const _a1058af4 = () => interopDefault(import('..\\pages\\recruitments\\create.vue' /* webpackChunkName: "pages/recruitments/create" */))
const _6634d0e6 = () => interopDefault(import('..\\pages\\services\\create.vue' /* webpackChunkName: "pages/services/create" */))
const _0028c3fe = () => interopDefault(import('..\\pages\\settings\\banners\\index.vue' /* webpackChunkName: "pages/settings/banners/index" */))
const _610d81f0 = () => interopDefault(import('..\\pages\\settings\\contact\\index.vue' /* webpackChunkName: "pages/settings/contact/index" */))
const _7bb0e78f = () => interopDefault(import('..\\pages\\libraries\\_type\\index.vue' /* webpackChunkName: "pages/libraries/_type/index" */))
const _ab79b8b8 = () => interopDefault(import('..\\pages\\news\\_id.vue' /* webpackChunkName: "pages/news/_id" */))
const _cb8ee122 = () => interopDefault(import('..\\pages\\products\\_id\\index.vue' /* webpackChunkName: "pages/products/_id/index" */))
const _6bb0ea85 = () => interopDefault(import('..\\pages\\projects\\_id\\index.vue' /* webpackChunkName: "pages/projects/_id/index" */))
const _553f55f0 = () => interopDefault(import('..\\pages\\recruitments\\_slug.vue' /* webpackChunkName: "pages/recruitments/_slug" */))
const _402ecb2e = () => interopDefault(import('..\\pages\\services\\_id\\index.vue' /* webpackChunkName: "pages/services/_id/index" */))
const _6de72c06 = () => interopDefault(import('..\\pages\\products\\_id\\edit.vue' /* webpackChunkName: "pages/products/_id/edit" */))
const _5c315427 = () => interopDefault(import('..\\pages\\projects\\_id\\edit.vue' /* webpackChunkName: "pages/projects/_id/edit" */))
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
    path: "/news",
    component: _55f1c23c,
    name: "news"
  }, {
    path: "/partners",
    component: _fd482238,
    name: "partners"
  }, {
    path: "/products",
    component: _123adc8b,
    name: "products"
  }, {
    path: "/projects",
    component: _84212896,
    name: "projects"
  }, {
    path: "/recruitments",
    component: _56f5f738,
    name: "recruitments"
  }, {
    path: "/users",
    component: _630ea706,
    name: "users"
  }, {
    path: "/news/create",
    component: _e00a5ffc,
    name: "news-create"
  }, {
    path: "/products/categories",
    component: _2028b022,
    name: "products-categories"
  }, {
    path: "/products/create",
    component: _5cd4ff93,
    name: "products-create"
  }, {
    path: "/projects/create",
    component: _27b255a9,
    name: "projects-create"
  }, {
    path: "/recruitments/create",
    component: _a1058af4,
    name: "recruitments-create"
  }, {
    path: "/services/create",
    component: _6634d0e6,
    name: "services-create"
  }, {
    path: "/settings/banners",
    component: _0028c3fe,
    name: "settings-banners"
  }, {
    path: "/settings/contact",
    component: _610d81f0,
    name: "settings-contact"
  }, {
    path: "/libraries/:type",
    component: _7bb0e78f,
    name: "libraries-type"
  }, {
    path: "/news/:id",
    component: _ab79b8b8,
    name: "news-id"
  }, {
    path: "/products/:id",
    component: _cb8ee122,
    name: "products-id"
  }, {
    path: "/projects/:id",
    component: _6bb0ea85,
    name: "projects-id"
  }, {
    path: "/recruitments/:slug",
    component: _553f55f0,
    name: "recruitments-slug"
  }, {
    path: "/services/:id",
    component: _402ecb2e,
    name: "services-id"
  }, {
    path: "/products/:id/edit",
    component: _6de72c06,
    name: "products-id-edit"
  }, {
    path: "/projects/:id/edit",
    component: _5c315427,
    name: "projects-id-edit"
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
