<template>
    <div id="testPage1">

        <el-card style="border-radius: 0;">
            <el-col :span="24">
                <el-form ref="form" :inline="true" :model="testForm" :label-width=formLabelWidth
                         size="medium">
                    <el-form-item label="最喜欢的食物">
                        <el-select v-model="testForm.food" clearable placeholder="请选择">
                            <el-option
                                    v-for="item in testForm.foodOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="最喜欢的运动">
                        <el-select v-model="testForm.sport" clearable placeholder="请选择">
                            <el-option
                                    v-for="item in testForm.sportOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-card>


        <el-card style="border-radius: 0; margin-top:2px;">
            <el-col :span="24">
                <ToolBar>
                    <!--<el-button type="primary" icon="el-icon-plus" size="small">添加</el-button>-->
                    <div style="float: right">
                        <el-select v-model="testForm.food" size="small" clearable placeholder="请选择食物"
                                   style="width: 140px">
                            <el-option
                                    v-for="item in testForm.foodOptions"
                                    :key="item.value"
                                    :label="item.label"
                                    :value="item.value">
                            </el-option>
                        </el-select>
                        <el-input
                                placeholder="全文搜索"
                                size="small"
                                style="width: 200px"
                                v-model="searchParams.globalSearch"
                                clearable>
                        </el-input>
                        <!--<el-button type="info" icon="el-icon-search" size="small" @click="refresh = !refresh"></el-button>-->
                    </div>
                </ToolBar>
            </el-col>


            <el-table
                    :data="tableData1"
                    border
                    style="width: 100%">
                <el-table-column
                        prop="date"
                        label="日期"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="food"
                        label="食物"
                        width="180">
                </el-table-column>
                <el-table-column
                        prop="sport"
                        label="运动">
                </el-table-column>
                <el-table-column
                        label="操作"
                        :render-header="tableAction"
                        width="120">
                    <template slot-scope="scope">
                        <el-button @click="handleClick(scope.row)" type="info" icon="el-icon-info" size="small"
                                   circle></el-button>
                        <el-button @click="handleClick(scope.row)" type="primary" icon="el-icon-edit" size="small"
                                   circle></el-button>
                    </template>
                </el-table-column>
            </el-table>

            <!--<Paginate-->
                    <!--api="apiUrl"-->
                    <!--:params="params"-->
                    <!--:refresh="refresh"-->
                    <!--@val-change="tableData1"-->
            <!--&gt;-->
            <!--</Paginate>-->


        </el-card>
    </div>
</template>

<script>
    let Utils = require('../../utils/common/utils')
    let Config = require('../../config/index')
    import ToolBar from '~/components/ToolBar/ToolBar.vue'
    import HelpHint from '~/components/HelpHint/HelpHint.vue'
    import Paginate from '~/components/Pagination/Paginate.vue'

    export default {
        data() {
            return {
                Options: {
                    data: {},
                },
                pagination: {
                    total: 0,
                    currentPage: 1,
                    pageSize: 20,
                },
                tableSortBy: '',
                tableSortOrder: '',
                tableLoading: false,
                formLabelWidth: '120px',
                testForm: {
                    food: '',
                    foodOptions: [{
                        label: "日料",
                        value: "f1"
                    }, {
                        label: "捞王",
                        value: "f2"
                    }],
                    sport: '',
                    sportOptions: [{
                        label: "篮球",
                        value: "s1"
                    }, {
                        label: "睡觉",
                        value: "s2"
                    }]
                },
                tableData1: [
                    {
                        date: "2019-03-11",
                        food: "xxx",
                        sport: "xxx"
                    },
                    {
                        date: "2019-03-12",
                        food: "xxx2",
                        sport: "xxx2"
                    },
                    {
                        date: "2019-03-12",
                        food: "xxx2",
                        sport: "xxx2"
                    },
                    {
                        date: "2019-03-12",
                        food: "xxx2",
                        sport: "xxx2"
                    },
                    {
                        date: "2019-03-12",
                        food: "xxx2",
                        sport: "xxx2"
                    },
                    {
                        date: "2019-03-12",
                        food: "xxx2",
                        sport: "xxx2"
                    }
                ],
                searchParams: {
                    globalSearch: "",
                },
                params: {},
                refresh: false,
                apiRes: {
                    Total: 384,
                }
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
            tableAction(){
                return this.$createElement('HelpHint',{
                    props:{
                        content:'查看 / 编辑 '
                    }
                },'操作');
            },
            handleClick(row){
                console.log(row)
            },

            init() {
                let _self = this

            }
        }
        ,
        components: {
            ToolBar, Paginate, HelpHint
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