import Vue from 'vue'
import Router from 'vue-router'
import test from './test'

Vue.use(Router)


let RouteList = [
    {
        path: '/',
        component: resolve => require(['~/views/Layout/App.vue'], resolve),
        meta: {
            title: '首页',
            keepAlive: false,
        },
        children: [
            {
                path: '/',
                name: 'Dashboard',
                meta: {
                    title: '首页',
                    keepAlive: false
                },
                component: resolve => require(['~/views/Home/Index.vue'], resolve),
            },
            test.testPage1,
            test.testPage2,
        ]
    }

]


export default new Router({routes: RouteList})


