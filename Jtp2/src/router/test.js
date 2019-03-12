export default {
    testPage1: {
        path: '/test/page1',
        name: 'testPage1',
        meta: {
            title: '测试页面1',
            keepAlive: false
        },
        component: resolve => require(['~/views/test/page1.vue'], resolve),
    },
    testPage2: {
        path: '/test/page2',
        name: 'testPage2',
        meta: {
            title: '测试页面2',
            keepAlive: false
        },
        component: resolve => require(['~/views/test/page2.vue'], resolve),
    }
}