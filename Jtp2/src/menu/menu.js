let menu = {};

/**
 * 首页
 * @type {{name: string, path: string, icon: string}}
 */
menu.home = {
  name: '首页',
  // path: '/',
    path: '/',
  icon: 'fa fa-tachometer',
};

/**
 * 测试页面
 * @type {{name: string, icon: string, children: {}}}
 */
menu.testManage = {
    name: '测试页面',
    icon: 'fa fa-cloud',
    children: {}
};
let testManage = menu.testManage.children;
testManage.testPage1 = {
    name: '页面1',
    icon: 'fa fa-user-circle-o',
    path: '/test/page1',
};
testManage.testPage2 = {
    name: '页面2',
    icon: 'fa fa-user-circle-o',
    path: '/test/page2',
};









export default menu;