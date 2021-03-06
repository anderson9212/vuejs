import Vue from 'vue'
import VueFire from 'vuefire'
import VueRouter from 'vue-router'
import NProgress from 'nprogress'
import VueMoment from 'vue-moment'
import VModal from 'vue-js-modal'

import App from './App.vue'

import AddUser from './components/AddUser.vue'
import EditUser from './components/EditUser.vue'
import ListUser from './components/ListUser.vue'

import '../node_modules/nprogress/nprogress.css'

Vue.use(VueFire)
Vue.use(VueRouter)
Vue.use(VueMoment)
Vue.use(VModal)

Vue.config.productionTip = false

const routes = [
  {
    name: 'List',
    path: '/',
    component: ListUser
  },
  {
    name: 'Add',
    path: '/add',
    component: AddUser
  },
  {
    name: 'Edit',
    path: '/edit/:id',
    component: EditUser
  }
];

const router = new VueRouter({ mode: 'history', routes: routes })

router.beforeResolve((to, from, next) => {
  if (to.name) {
      NProgress.start()
  }
  next()
})

router.afterEach(() => {
  NProgress.done()
})

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
