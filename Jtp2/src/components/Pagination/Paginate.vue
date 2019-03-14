<Paginate :params="pagination"
          @transferCurrentPage="setCurrentPage"
          @transferPageSize="setPageSize">
</Paginate>

<!--
如何使用？
1.导入并添加components, import Paginate from '~/components/Pagination/Paginate.vue'
2.传入参数和处理函数会自动分页
            <Paginate :params="pagination"
                      @transferCurrentPage="setCurrentPage"
                      @transferPageSize="setPageSize">
            </Paginate>

-->

<template>
    <div class="pagination">
        <el-pagination
                background
                :current-page="params.pageCode"
                :page-sizes="[5, 10, 20, 50, 100]"
                :page-size="params.pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="params.total"
                @current-change="currentChange"
                @size-change="sizeChange">
        </el-pagination>
    </div>
</template>

<script>
    export default {
        name: "Paginate",
        props: {
            params: {},
        },
        data() {
            return {

            }
        },
        methods: {
            currentChange(page){
                let _self = this
                _self.$emit('transferCurrentPage', page)
            },
            sizeChange(size){
                let _self = this
                _self.$emit('transferPageSize', size)
            }

        },
        mounted: function () {
            let _self = this
            // console.log(_self.params)
        }
    }
</script>

<style lang="less" scoped>

    .pagination {
        padding: 7px;
        border: 1px solid #ebeef5;
        background: #fff;
        text-align: right;
    }
</style>