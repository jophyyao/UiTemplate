<template>
    <div id="testPage2">

        <el-card>
            <h2>可拖拽，放大缩小</h2>
            <grid-layout
                    :layout.sync="layout"
                    :col-num="12"
                    :row-height="20"
                    :is-draggable="true"
                    :is-resizable="true"
                    :is-mirrored="false"
                    :vertical-compact="true"
                    :margin="[10, 10]"
                    :use-css-transforms="true"
            >

                <grid-item v-for="item in layout"
                           :key="item.i"
                           :x="item.x"
                           :y="item.y"
                           :w="item.w"
                           :h="item.h"
                           :i="item.i">
                    <div class="grid-content-div" v-html="item.v"></div>
                </grid-item>


            </grid-layout>
        </el-card>

    </div>
</template>

<script>
    let Utils = require('../../utils/common/utils')
    let Config = require('../../config/index')

    import VueGridLayout from 'vue-grid-layout';

    export default {
        data() {
            return {
                layout: [
                    {"x": 0, "y": 0, "w": 3, "h": 5, "i": "0", "v": `0`},
                    {"x": 3, "y": 0, "w": 3, "h": 5, "i": "1", "v": "<img src='http://img5.imgtn.bdimg.com/it/u=1967742301,3583836572&fm=26&gp=0.jpg'></img>"},
                    {"x": 6, "y": 0, "w": 3, "h": 5, "i": "2", "v": `2`},
                    {"x": 9, "y": 0, "w": 3, "h": 5, "i": "3", "v": `3`},
                    {"x": 0, "y": 3, "w": 3, "h": 5, "i": "4", "v": `4`},
                    {"x": 3, "y": 3, "w": 3, "h": 5, "i": "5", "v": `5`},
                    {"x": 6, "y": 3, "w": 3, "h": 5, "i": "6", "v": `6`},
                    {"x": 9, "y": 3, "w": 3, "h": 5, "i": "7", "v": `7`},
                ]
            }
        },
        methods: {
            loadData() {
                let _self = this

                let getxxx = (() => {
                    _self.Options.data['getxxx'] = Utils.getAjaxPromise({
                        url: `${Config.default.envdata.ApiHost}/api/xxx`,
                    })
                });

                return {
                    getxxx: getxxx,
                    all: (() => {
                        // getxxx()
                    })
                };
            },
            init() {
                let _self = this


            }
        }
        ,
        components: {
            GridLayout: VueGridLayout.GridLayout,
            GridItem: VueGridLayout.GridItem,
        },
        mounted: function () {
            let _self = this
            _self.init()
        }
        ,
        created: function () {
            let _self = this


            _self.loadData().all()

        }
        ,

    }
</script>


<style lang="less">
    @import "../Layout/layout";
    @import "../../theme/public/button";
    @import "test";

</style>