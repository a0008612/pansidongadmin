// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import axios from 'axios'
import VueAxios from 'vue-axios'
import qs from 'qs'
import $ from 'jquery'
import VueRouter from 'vue-router';
import {routes} from '@/router'
import iView from 'iview';
import 'iview/dist/styles/iview.css';

// import { Button, Table } from 'iview';
// import '../theme/index.less';

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
// Vue.component('Button', Button);
// Vue.component('Table', Table);
Vue.prototype.qs=qs
Vue.use(VueRouter);
Vue.use(iView);
Vue.use(VueAxios, axios)

// The routing configuration

const router = new VueRouter({
  routes: routes
});

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,

  components: { App },
  template: '<App/>'
})
