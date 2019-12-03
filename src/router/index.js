import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import index from '@/views/mainFrame'
// import caseDetail from '@/views/caseDetail'
// import lossOrder from '@/views/lossOrder'
// import userInfo from '@/views/userInfo'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
            path: '/',
            name: 'login',
            component: login,
            // children: [{
            //         path: '/caseDetail',
            //         name: 'caseDetail',
            //         component: caseDetail
            //     },
            //     {
            //         path: '/lossOrder',
            //         name: 'lossOrder',
            //         component: lossOrder
            //     },
            //     {
            //         path: '/userInfo',
            //         name: 'userInfo',
            //         component: userInfo
            //     }
            // ]
        },
        {
            path: '/index',
            name: 'index',
            component: index,
        }
    ]
})