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
import common from "./common/utils/common.js";
import AgoraRTC from 'agora-rtc-sdk';
import 'signalr';


Vue.use(ViewUI);
Vue.use(AgoraRTC);

Vue.config.productionTip = false;
Vue.prototype.$axios = axios; // 将api挂载到vue的原型上
Vue.prototype.$api = api;
Vue.prototype.$common = common;
// Vue.prototype.signalr = signalr;



Vue.filter('transferGMT', function(value) {
    if (!value) return ''
    let timezone = 8; //目标时区时间，东八区
    let offset_GMT = new Date().getTimezoneOffset(); // 本地时间和格林威治的时间差，单位为分钟
    let nowDate = new Date(value).getTime(); // 本地时间距 1970 年 1 月 1 日午夜（GMT 时间）之间的毫秒数
    let targetDate = new Date(nowDate + offset_GMT * 60 * 1000 + timezone * 60 * 60 * 1000);
    return targetDate
})
Vue.filter('date', function(value) {
    if (!value) return ''
    let date = new Date(value);
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let min = date.getMinutes();
    let second = date.getSeconds();
    return `${year}-${month < 10 ? "0" + month : month}-${
      day < 10 ? "0" + day : day
    } ${hour < 10 ? "0" + hour : hour}:${min < 10 ? "0" + min : min}:${
      second < 10 ? "0" + second : second
    }`;
})

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    components: { App },
    template: '<App/>'
})