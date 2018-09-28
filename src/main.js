// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import E from 'wangeditor'
import iView from 'iview';

import 'iview/dist/styles/iview.css';


import Layout from './components/layout'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
//import IndexPage from './pages/index'
// import LoginPage from './pages/login'
// import RegPage from './pages/register'
// import LoveWallPage from './pages/loveWall'
import TradeDetail from './pages/tradeDetail'
import UserCenter from './pages/userCenter'
import fzfpage from './pages/404page'
import VueQuillEditor from 'vue-quill-editor'
// import trade from './pages/trade'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.config.productionTip = false;

Vue.use(VueQuillEditor, /* { default global options } */)
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use(iView)
// Vue.use(E)
import axios from 'axios';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios;

//require('./mock.js');

let router = new VueRouter({
  mode: 'history',
  routes:[
    {
      path: '/',
      component: resolve => require(['@/pages/index'],resolve)
    },
    {
      path: '/login',
      component: resolve => require(['@/pages/login'], resolve)
    },
    {
      path: '/register',
      component: resolve => require(['@/pages/register'], resolve)
    },
    {
      path: '/loveWall',
      component: resolve => require(['@/pages/loveWall'], resolve)
    },
    {
      path: '/trade',
      component: resolve => require(['@/pages/trade'], resolve)
    },
    {
      path: '/discuss',
      component: resolve => require(['@/pages/discuss'], resolve)
    },
    {
      // path: '/tradeDetail',
      path: '/tradeDetail/:tradeId',
      // component: resolve => require(['@/pages/tradeDetail'], resolve)
      component: TradeDetail
    },
    {
      // path: '/tradeDetail',
      path: '/404',
      component: fzfpage,
    },
    {
      path: '/UserCenter',
      component: UserCenter
    }
  ]
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    Layout,
  },
  template: '<Layout/>'
})
