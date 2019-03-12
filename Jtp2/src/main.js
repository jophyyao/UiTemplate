import Vue from 'vue'
import store from './store'
import ElementUI from 'element-ui'
import './theme/index.css'
import './assets/css/font-awesome.min.css'
import './assets/css/style.css'
import router from './router'
import Config from './config'
import Api from './api'
import Function from './function'

import App from './App.vue'

Vue.prototype.$Api = Api
Vue.prototype.$Config = Config
Vue.prototype.$Func = Function

Vue.use(ElementUI)

let Utils = require('./utils/common/utils')

router.beforeEach((to, from, next) => {
    // window.document.title = to.meta.title ? to.meta.title + '-' + Config.siteName : Config.siteName;

    // if (!sessionStorage.getItem(Config.tokenKey) && to.path != '/login') {
    //   next({path: '/login'});
    //
    // } else {
    //   next();
    // }
    next();
});

/* logic action */
// router.afterEach(transition => {
//     let loginAccess = Utils.getAjaxPromise({
//         url: `${Config.envdata.ApiHost}/permission/login`,
//         type: 'POST',
//         data: JSON.stringify({
//             page_name: transition.meta.title,
//             url: transition.path,
//         }),
//     });
// });


new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
})
