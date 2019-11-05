import Vue from 'vue'
import Router from 'vue-router'
import mainFrame from '@/views/mainFrame'
import caseDetail from '@/views/caseDetail'
import lossOrder from '@/views/lossOrder'
import userInfo from '@/views/userInfo'

Vue.use(Router);

export default new Router({
    mode: 'history',
    routes: [{
        path: '/',
        name: 'mainFrame',
        component: mainFrame,
        children: [{
                path: '/caseDetail',
                name: 'caseDetail',
                component: caseDetail
            },
            {
                path: '/lossOrder',
                name: 'lossOrder',
                component: lossOrder
            },
            {
                path: '/userInfo',
                name: 'userInfo',
                component: userInfo
            }
        ]
    }]
})