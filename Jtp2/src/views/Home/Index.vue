<template>
    <div>
        <el-card style="border-radius: 0">
            <div slot="header">
                <span>index page</span>
            </div>
            <div id="testChart1" style="height:500px;"></div>
        </el-card>

    </div>
</template>

<script>
    import echarts from 'echarts'
    import MyEcharts from '../../utils/common/echarts'

    export default {
        data() {
            return {
                Options: {
                    data: {},
                },
                ChartObj: {},
                ChartEventObj: {},
            }
        },
        methods: {

            chart1() {
                let _self = this

                let legendData = function () {
                    let result = ['x1', 'x2']
                    return result
                }

                let XaxisData = function () {
                    let result = ["a", "b", "c"]
                    return result
                }

                let seriesData = function () {
                    let result = []
                    for (let row of legendData()) {
                        result.push({
                            'name': row,
                            'type': 'bar',
                            'stack': '在用',
                            'data': []
                        })
                    }
                    result.push(
                        {
                            'type': 'pie',
                            'center': ['83%', '53%'],
                            'radius': ['25%', '69%'],
                            'data': []
                        }
                    )

                    for (let i = 1; i<4; i++) {
                        result[0].data.push(i)
                        result[1].data.push(i)
                        result[2].data.push({
                            value: 50,
                            name: i
                        })
                    }
                    return result
                }

                let ec = new MyEcharts({})
                _self.ChartEventObj['chart1'] = echarts.init(document.getElementById("testChart1"));
                _self.ChartEventObj['chart1'].setOption(
                    ec.ColumnAndPie(legendData(), XaxisData(), seriesData(), 'xxx', 0, '0%'),
                    {
                        notMerge: true,
                        lazyUpdate: false,
                        silent: false,
                    }
                )

            },
            init() {
                let _self = this
                _self.chart1()
            }

        },
        mounted: function () {
            let _self = this
            _self.init()

        }
    }
</script>
<style lang="less">

</style>