// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ViewUI from 'view-design';
import "view-design/dist/styles/iview.css";
import axios from 'axios'
import store from './store';
import api from '@/common/api/index.js'
import utils from "./common/utils/utils.js";
import AgoraRTC from 'agora-rtc-sdk';


Vue.use(ViewUI);
Vue.use(AgoraRTC);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios; // 将api挂载到vue的原型上
Vue.prototype.$api = api;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})