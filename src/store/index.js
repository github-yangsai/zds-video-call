import Vue from 'vue';
import vuex from 'vuex';

import videoBody from './modules/videoBody';
// import pictures from './modules/pictures';

Vue.use(vuex);
let modules = {
    videoBody
};
const Store = new vuex.Store({
    modules
});

export default Store