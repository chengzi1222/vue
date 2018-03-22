// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'element-ui/lib/theme-chalk/index.css';
import './assets/css/fontCss/demo.css';
import './assets/css/fontCss/iconfont.css';
import './assets/css/com.css';
import 'nprogress/nprogress.css';
import 'babel-polyfill';
import './directive/auth';
import 'utils/el_form_validate.js';

import Vue from 'vue';
import ElementUI from 'element-ui';
import Vuebar from 'vuebar';
import App from './App';
import router from './router';
import store from './store';

Vue.use(ElementUI);
Vue.use(Vuebar);

if (process.env.NODE_ENV != 'production') {
  Vue.config.productionTip = true;
  Vue.config.devtools = true;
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: {
    App
  }
});
