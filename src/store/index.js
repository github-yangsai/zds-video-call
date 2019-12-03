import Vue from 'vue';
import vuex from 'vuex';

import videoBody from './modules/videoBody';
import chat from './modules/chat';

Vue.use(vuex);
let modules = {
    videoBody,
    chat
};
const Store = new vuex.Store({
    modules
});

export default Store