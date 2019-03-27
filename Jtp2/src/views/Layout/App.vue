<template>
    <div class="main">
        <div class="header">
            <div class="logo" @click="toIndex()">
                <span class="big">{{ $Config.siteName }}</span>
                <span class="min">{{ $Config.minSiteMame }}</span>
            </div>
            <span class="header-btn" @click="hiddenSidebar">
        <i class="el-icon-menu"></i>
      </span>
            <div class="right">
                <!--<span class="header-btn" @click="screenfullToggle">-->
                <!--<i class="fa fa-arrows-alt"></i>-->
                <!--</span>-->

                <!--<el-dropdown>-->
                <!--<span class="header-btn">-->
                <!--<i class="el-icon-setting"></i>-->
                <!--</span>-->
                <!--<el-dropdown-menu slot="dropdown">-->
                <!--<div style="padding: 10px;text-align: center;width: 420px">-->
                <!--<div class="setting-category">-->
                <!--<el-switch-->
                <!--@change="saveSwitchTabBarVal"-->
                <!--v-model="switchTabBar"-->
                <!--active-text="开启TabBar"-->
                <!--inactive-text="关闭TabBar">-->
                <!--</el-switch>-->
                <!--<el-switch-->
                <!--@change="saveFixedTabBar"-->
                <!--v-if="switchTabBar"-->
                <!--v-model="fixedTabBar"-->
                <!--style="margin-top: 10px"-->
                <!--active-text="固定在顶部"-->
                <!--inactive-text="随页面滚动">-->
                <!--</el-switch>-->
                <!--<el-alert-->
                <!--v-if="switchTabBar"-->
                <!--style="margin-top: 10px"-->
                <!--title="导航标签超过容器时,可在导航上滚动鼠标来移动标签"-->
                <!--type="info"-->
                <!--show-icon>-->
                <!--</el-alert>-->
                <!--</div>-->
                <!--<div class="setting-category" style="display: flex;height: 80px;align-items: center">-->
                <!--<div style="width: 80px">-->
                <!--<el-button  type="primary" icon="el-icon-sort" circle @click="ToggleGrayMode" style="transform: rotate(90deg)"></el-button>-->
                <!--</div>-->
                <!--<div style="flex: 1;margin-top: -8px">-->
                <!--<el-alert-->
                <!--style="margin-top: 10px"-->
                <!--title="切换灰度模式!"-->
                <!--type="info"-->
                <!--show-icon>-->
                <!--</el-alert>-->
                <!--</div>-->
                <!--</div>-->
                <!--&lt;!&ndash;<div class="setting-category">&ndash;&gt;-->
                <!--&lt;!&ndash;下个设置块&ndash;&gt;-->
                <!--&lt;!&ndash;</div>&ndash;&gt;-->

                <!--</div>-->
                <!--</el-dropdown-menu>-->
                <!--</el-dropdown>-->

                <!--<span class="header-btn">-->
                <!--<el-badge :value="3" class="badge">-->
                <!--<i class="el-icon-bell"></i>-->
                <!--</el-badge>-->
                <!--</span>-->
                <el-dropdown>
          <span class="header-btn">
              {{loginUser || 'JophyYao'}}
              <i class="el-icon-arrow-down el-icon--right"></i>
          </span>
                    <el-dropdown-menu slot="dropdown">
                        <!--<el-dropdown-item @click.native="$router.push('/personal')"><i style="padding-right: 8px"-->
                        <!--class="fa fa-cog"></i>个人中心-->
                        <!--</el-dropdown-item>-->
                        <el-dropdown-item @click.native="logout"><i style="padding-right: 8px" class="fa fa-key"></i>退出系统
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </div>
        </div>
        <div class="app">
            <div class="aside">
                <div class="menu">
                    <el-menu
                            :default-openeds="open_list"
                            router
                            :default-active="$route.path" class="menu menu-bar-item" @open="handleOpen"
                            @close="handleClose"
                            :collapse="isCollapse">
                        <template v-for="(menu_v,menu_k) in menu">
                            <el-submenu v-if="menu_v.children" :index="menu_k">
                                <template slot="title">
                                    <i :class="menu_v.icon"></i>
                                    <span slot="title">{{ menu_v.name }}</span>
                                </template>
                                <el-menu-item v-for="(menuChildren_v,menuChildren_k) in menu_v.children"
                                              :key="menuChildren_k"
                                              :index="menuChildren_v.path">
                                    <i class="is-children fa fa-circle-o"></i>
                                    <span slot="title">{{ menuChildren_v.name }}</span>
                                </el-menu-item>
                            </el-submenu>
                            <el-menu-item v-else :index="menu_v.path">
                                <i :class="menu_v.icon"></i>
                                <span slot="title">{{ menu_v.name }}</span>
                            </el-menu-item>
                        </template>
                    </el-menu>
                </div>
                <div class="sidebar-toggle" @click="sidebarToggle">
                    <div class="icon-left">
                        <i class="el-icon-back"></i>
                    </div>
                </div>
            </div>
            <div class="app-body">
                <NavBar id="nav-bar" v-if="switchTabBar"
                        :style="fixedTabBar && switchTabBar?'position: fixed;top: 0;':''"></NavBar>
                <div v-else style="margin-top: 50px;"></div>
                <div id="mainContainer" :style="fixedTabBar && switchTabBar?'margin-top: 88px;':''"
                     class="main-container">
                    <!--<transition name="fade">-->
                    <router-view></router-view>
                    <!--</transition>-->
                </div>
                <!--<EuiFooter></EuiFooter>-->
            </div>
        </div>
    </div>
</template>

<script>
    import Screenfull from 'screenfull'
    // import EuiFooter from '~/views/Layout/Footer.vue';
    import NavBar from './NavBar.vue'
    import Menu from '~/menu/index';

    let Config = require('../../config/index')

    export default {
        data() {
            return {
                open_list: ['resourceManage', 'dataviewManage'],
                fixedTabBar: false,
                switchTabBar: true,
                siteName: this.$Config.siteName,
                isCollapse: false,
                menu: Menu,
                loginUser: '',
            };
        },
        methods: {
            getLoginUser() {
                let _self = this
                let user = this.$Func.getCookie('x_webauth_user')
                if (user != null && user.indexOf('@') > -1) {
                    _self.loginUser = user.split('@')[0]
                } else {
                    _self.loginUser = user
                    if (Config.default.env !== "dev") {
                        //window.location.href = "https://sso-op.kingnet.com/Authorize/get_token?client_id=iaas&redirect_uri=/&state=state"
                    }
                }
            },
            toIndex() {
                let _self = this
                window.location.href = '/'
            },
            NavBarWidth() {
                let navBar = document.getElementById('nav-bar');
                if (!navBar) return;
                if (!(this.fixedTabBar && this.switchTabBar)) {
                    navBar.style.width = '100%';
                    return;
                }
                let sidebarClose = document.body.classList.contains('sidebar-close')
                if (sidebarClose) {
                    navBar.style.width = '100%';
                    return;
                }
                if (this.isCollapse) navBar.style.width = 'calc(100% - 64px)';
                else navBar.style.width = 'calc(100% - 230px)';

            },
            ToggleGrayMode() {
                document.body.classList.toggle("gray-mode")
            },
            screenfullToggle() {
                if (!Screenfull.enabled) {
                    this.$message({
                        message: '你的浏览器不支持全屏！',
                        type: 'warning'
                    })
                    return false
                }
                Screenfull.toggle();
            },
            saveFixedTabBar(v) {
                v ? localStorage.setItem('fixedTabBar', v) : localStorage.removeItem('fixedTabBar');
                this.NavBarWidth();
            },
            saveSwitchTabBarVal(v) {
                let containerDom = document.getElementById('mainContainer');
                v ? containerDom.style.minHeight = 'calc(118vh - 139px)' : containerDom.style.minHeight = 'calc(100vh - 101px)';
                v ? localStorage.setItem('switchTabBar', v) : localStorage.removeItem('switchTabBar');
                this.NavBarWidth();
            },
            sidebarToggle(e) {
                e.preventDefault();
                if (this.isCollapse) {
                    document.body.classList.remove('sidebar-hidden')
                    this.siteName = this.$Config.siteName
                    this.isCollapse = false;
                } else {
                    document.body.classList.add('sidebar-hidden')
                    this.isCollapse = true;
                }
                this.NavBarWidth();

            },
            hiddenSidebar(e) {
                e.preventDefault();
                document.body.classList.toggle('sidebar-close');
                this.NavBarWidth();
            },
            logout() {
                // sessionStorage.removeItem(this.$Config.tokenKey);
                // this.$router.push({path: '/login'});
                this.$Func.eraseCookie("x_webauth_user")
                this.$Func.eraseCookie("x_webauth_token")
                // window.location.href = 'http://sso.op.kingnet.com/Authorize/get_token?client_id=ops_dns&redirect_uri=/'
                window.location.href = 'http://iaas.kyhub.cn/logout'
            },
            handleOpen(key, keyPath) {
                //console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                //关闭菜单
            }
        },
        mounted: function () {
            let _self = this
            _self.getLoginUser()

            // this.switchTabBar = localStorage.getItem('switchTabBar') ? true : false;
            this.switchTabBar = true
            this.fixedTabBar = localStorage.getItem('fixedTabBar') ? true : false;
            if (this.switchTabBar) document.getElementById('mainContainer').style.minHeight = 'calc(118vh - 139px)';

            if (!this.isCollapse) {

                document.body.classList.remove('sidebar-hidden')
                this.siteName = this.$Config.siteName
            } else {
                document.body.classList.add('sidebar-hidden')
            }

            setTimeout(() => {
                this.NavBarWidth();
            }, 1000)
        },
        components: {
            // EuiFooter,
            NavBar
        },
    }
</script>
<style lang="less">
    @import "../../theme/public/bk";
    @import "layout";

</style>
