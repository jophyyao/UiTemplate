/**
 * Created by jophy on 2017/7/10.
 */


let Utils = require('./utils')

class MyEcharts {
    constructor(options = {}) {
        this.ChartColor = ['#59adea', '#a0dca0', '#f78db3', '#fec3ac', '#fae395', '#91d4e5', '#60bbb6', '#8eb3e8', '#c778ee', '#b3eee3', '#eea5c5', '#d3c7ee', '#eed5cc', '#eee']
        //default set
        if (!options.hasOwnProperty('legend')) {
            options['legend'] = true
        }
        if (!options.hasOwnProperty('legendSelected')) {
            options['legendSelected'] = {}
        }
        if (!options.hasOwnProperty('tooltipZeroHide')) {
            options['tooltipZeroHide'] = false
        }
        if (!options.hasOwnProperty('tooltipSort')) {
            options['tooltipSort'] = false
        }
        if (!options.hasOwnProperty('tooltipTotaltext')) {
            options['tooltipTotaltext'] = '总量'
        }
        if (!options.hasOwnProperty('tooltipPercentageHide')) {
            options['tooltipPercentageHide'] = false
        }
        if (!options.hasOwnProperty('tooltipTotalHide')) {    //隐藏总和显示
            options['tooltipTotalHide'] = true
        }
        if (!options.hasOwnProperty('tooltipTopRow')) {    //top条数
            options['tooltipTopRow'] = 10000
        }
        if (!options.hasOwnProperty('unit')) {
            options['unit'] = ''
        }
        if (!options.hasOwnProperty('dataZoom')) {
            options['dataZoom'] = false
        }
        if (!options.hasOwnProperty('Color')) {
            options['Color'] = this.ChartColor
        }
        if (!options.hasOwnProperty('legendLeft')) {
            options['legendLeft'] = 'center'
        }
        if (!options.hasOwnProperty('XaxisInterval')) {
            options['XaxisInterval'] = 0
        }
        if (!options.hasOwnProperty('YaxisMax')) {
            options['YaxisMax'] = null
        }
        if (!options.hasOwnProperty('tooltipBarRemove')) {   //提示框移除bar的百分比显示
            options['tooltipBarRemove'] = false
        }
        if (!options.hasOwnProperty('IntervalDefaultPageValue')) {   //一屏最多显示的元素数量， INT
            options['IntervalDefaultPageValue'] = 30
        }
        if (!options.hasOwnProperty('toolbox')) {   //toolbox 是非显示
            options['toolbox'] = false
        }

        //

        this.options = options


    }

    ColumnYAxis(legendData, YaxisData, seriesData, xrotate = 0, bottomPercentage = '3%') {
        let options = this.options
        let option = {
            color: options.Color,
            toolbox: {
                show: options.toolbox,
                feature: {
                    dataView: {
                        readOnly: false
                    },
                    magicType: {
                        type: ['line', 'bar', 'stack', 'tiled']
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (param) {
                    //console.log(param)
                    let res = `<div style="text-align:center; font-size: 16px; font-weight:600; padding: 8px 2px;">${param[0].axisValue}</div>`
                    let restmp = ``
                    res += `
                <table style="width: 250px; min-width:100px;">
              `
                    let total = 0

                    if (options['tooltipSort'] == true) {
                        param.sort(Utils.arrayObjSort('desc', 'data'))
                    }

                    for (let row of param) {
                        total += row.data
                    }

                    for (let row of param) {
                        if (options.tooltipZeroHide == true) {
                            if (row.data / total * 100 == 0) {
                                continue
                            }
                        }
                        let ptg = (row.data / total * 100).toFixed(2)
                        if (ptg == 'NaN') {
                            ptg = 0
                        }
                        if (options.tooltipPercentageHide == true) {
                            ptg = ''
                        } else {
                            ptg += `%`
                        }
                        restmp += `
                  <tr>
                    <td style="padding:2px 0px 2px 4px;"><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${row.color}"></span>${row.seriesName}</td>
                    <td style="padding:2px 0px 2px 4px; text-align:right; font-family: monospace !important;">${row.data}${options.unit}</td>
                    <td style="padding:2px 0px 2px 20px;  text-align:right;">${ptg}</td>
                    <td></td>
                  </tr>
                `
                    }
                    if (param.length > 1) {
                        total = total
                        res += `
                <tr>
                  <td style="padding:2px 0px 2px 4px;"><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#eee"></span>${options.tooltipTotaltext}</td>
                  <td style="padding:2px 0px 2px 4px; text-align:right; font-family: monospace !important;">${total}${options.unit}</td>
                  <td style="padding:2px 0px 2px 20px; text-align:right;"> </td>
                </tr>
              `
                    }
                    res += restmp
                    res += `</table>`
                    return res
                }
            },
            legend: {
                show: this.options.legend,
                top: 0,
                textStyle: {
                    fontWeight: 400,
                    fontSize: 14,
                    fontStyle: 'normal',
                    color: '#000'
                },
                data: legendData,   // Array data type such as category,  [ '未用', '在用']
                center: '0%'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: bottomPercentage,
                top: '10%',
                containLabel: true
            },
            xAxis: {
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#aaa', '#eee'],
                        width: 0.4,
                        type: 'dotted'
                    }
                },
                axisLabel: {
                    formatter: '{value}' + this.options.unit,
                    rotate: xrotate
                }
            },
            yAxis: {
                type: 'category',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#aaa', '#eee'],
                        width: 0.4,
                        type: 'dotted'
                    }
                },
                axisTick: {
                    alignWithLabel: true,
                },
                axisLabel: {
                    interval: 5,
                    rotate: 0
                },
                triggerEvent: true,
                data: YaxisData    // array,  such as [ 'idc1', 'idc2' ]
            },
            /*******   example:
             let seriesData = [
             {
       'name': '未用',
       'type': 'bar',
       'stack': '总量',
       'data': []
       }
             ]
             */

            series: seriesData
        }
        return option
    }

    ColumnXAxis(legendData, XaxisData, seriesData, xrotate = 0, bottomPercentage = '3%') {
        let options = this.options

        if (options.XaxisInterval == 0) {   //zero is default value, user not set
            options.XaxisInterval = parseInt(XaxisData.length / options.IntervalDefaultPageValue)   // 一个屏幕最多30个元素
        }

        let dataZoom = []

        if (options.dataZoom == true) {
            dataZoom = [{
                "show": options.dataZoom,
                "height": 30,
                "xAxisIndex": [
                    0
                ],
                bottom: 0,
                "start": 60,
                "end": 100,
                filterMode: 'filter',
                handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                handleSize: '110%',
                handleStyle: {
                    color: "#e58edb",
                },
                textStyle: {
                    color: "#000"
                },
                borderColor: "#7e849c"
            }, {
                "type": "inside",
                "show": true,
                "height": 15,
                "start": 1,
                "end": 35
            }]
        }


        let option = {
            color: options.Color,
            toolbox: {
                show: options.toolbox,
                feature: {
                    dataView: {
                        readOnly: false
                    },
                    magicType: {
                        type: ['line', 'bar', 'stack', 'tiled']
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (param) {
                    let res = `<div style="text-align:center; font-size: 16px; font-weight:600; padding: 8px 2px;">${param[0].axisValue}${options.tooltipTopRow < 10000 ? ` (TOP${options.tooltipTopRow})` : ''}</div>`
                    let restmp = ``
                    res += `
                <table style="width: 250px; min-width:100px;">
              `
                    let total = 0

                    if (options['tooltipSort'] == true) {
                        param.sort(Utils.arrayObjSort('desc', 'data'))
                    }

                    for (let row of param) {
                        if (options.tooltipBarRemove == true) {
                            if (row.seriesType == 'bar') {
                                continue
                            }
                        }
                        total += row.data
                    }

                    let index = 1
                    for (let row of param) {
                        if (options.tooltipZeroHide == true) {
                            if (row.data / total * 100 == 0) {
                                continue
                            }
                        }


                        if (index > options.tooltipTopRow) {
                            break
                        }
                        let ptg = (row.data / total * 100).toFixed(2)
                        if (ptg == 'NaN') {
                            ptg = 0
                        }
                        if (options.tooltipPercentageHide == true) {
                            ptg = ''
                        } else {
                            ptg += `%`
                        }
                        if (options.tooltipBarRemove == true) {
                            if (row.seriesType == 'bar') {
                                ptg = ''
                            }
                        }

                        restmp += `
                  <tr>
                    <td style="padding:2px 0px 2px 4px;"><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${row.color}"></span>${row.seriesName}</td>
                    <td style="padding:2px 0px 2px 4px; text-align:right; font-family: monospace !important;">${row.data}<span style="font-family: 'Microsoft Sans Serif' , Arial, Helvetica, Verdana !important;">${options.unit}</span></td>
                    <td style="padding:2px 0px 2px 20px;  text-align:right;">${ptg}</td>
                    <td></td>
                  </tr>
                `
                        index++
                    }
                    if (param.length > 1 && options.tooltipTotalHide == true) {
                        total = total
                        res += `
                <tr>
                  <td style="padding:2px 0px 2px 4px;"><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#eee"></span>${options.tooltipTotaltext}</td>
                  <td style="padding:2px 0px 2px 4px; text-align:right; font-family: monospace !important;">${Math.floor(total) === total ? total : total.toFixed(2)}${options.unit}</td>
                  <td style="padding:2px 0px 2px 20px; text-align:right;"> </td>
                </tr>
              `
                    }
                    res += restmp
                    res += `</table>`
                    return res
                }
            },
            dataZoom: dataZoom,
            legend: {
                show: this.options.legend,
                top: 0,
                left: options.legendLeft,
                textStyle: {
                    fontWeight: 400,
                    fontSize: 12,
                    fontStyle: 'normal',
                    color: '#000'
                },
                data: legendData,   // Array data type such as category,  [ '未用', '在用']
                center: '0%',
                selected: this.options.legendSelected
                //selectedMode: 'single'
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: bottomPercentage,
                top: '10%',
                containLabel: true
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#aaa', '#eee'],
                        width: 0.4,
                        type: 'dotted'
                    }
                },
                max: options.YaxisMax,
                axisLabel: {
                    formatter: '{value}' + this.options.unit
                }
            },
            xAxis: {
                type: 'category',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#aaa', '#eee'],
                        width: 0.4,
                        type: 'dotted'
                    }
                },
                axisTick: {
                    alignWithLabel: true,
                },
                axisLabel: {
                    interval: options.XaxisInterval,
                    rotate: xrotate
                },
                triggerEvent: true,
                data: XaxisData    // array,  such as [ 'idc1', 'idc2' ]
            },
            /*******   example:
             let seriesData = [
             {
       'name': '未用',
       'type': 'bar',
       'stack': '总量',
       'data': []
       }
             ]
             */

            series: seriesData,
            animationEasing: 'elasticOut',
            animationDelayUpdate: function (idx) {
                return idx * 5;
            }
        }
        return option
    }


    // 支持柱状图+折线图， x轴为日期。
    ColumnXAxisDateFormat(legendData, XaxisData, seriesData, xrotate = 0, bottomPercentage = '3%') {
        let options = this.options

        if (options.XaxisInterval == 0) {   //zero is default value, user not set
            options.XaxisInterval = parseInt(XaxisData.length / options.IntervalDefaultPageValue)   // 一个屏幕最多30个元素
        }

        let dataZoom = []

        if (options.dataZoom == true) {
            dataZoom = [{
                "show": options.dataZoom,
                "height": 30,
                "xAxisIndex": [
                    0
                ],
                bottom: 0,
                "start": 0,
                "end": 100,
                filterMode: 'filter',
                handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                handleSize: '110%',
                handleStyle: {
                    color: "#e58edb",

                },
                textStyle: {
                    color: "#000"
                },
                borderColor: "#7e849c"
            }, {
                "type": "slider",
                "show": false,
                "height": 15,
                "start": 1,
                "end": 35
            }]
        }


        let option = {
            color: options.Color,
            toolbox: {
                show: options.toolbox,
                feature: {
                    dataView: {
                        readOnly: false
                    },
                    magicType: {
                        type: ['line', 'bar', 'stack', 'tiled']
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (param) {
                    //console.log(param)
                    let res = `<div style="text-align:center; font-size: 16px; font-weight:600; padding: 8px 2px;">${param[0].axisValue}${options.tooltipTopRow < 10000 ? ` (TOP${options.tooltipTopRow})` : ''}</div>`
                    let restmp = ``
                    res += `
                <table style="width: 250px; min-width:100px;">
              `
                    let total = 0

                    if (options['tooltipSort'] == true) {
                        param.sort(Utils.arrayObjSort('desc', 'data'))
                    }

                    for (let row of param) {
                        if (options.tooltipBarRemove == true) {
                            if (row.seriesType == 'bar') {
                                continue
                            }
                        }
                        total += row.data
                    }

                    if (total % 1 !== 0) {  // isn't int
                        total = total.toFixed(2)
                    }

                    let index = 1
                    for (let row of param) {
                        if (options.tooltipZeroHide == true) {
                            if (row.data / total * 100 == 0) {
                                continue
                            }
                        }
                        if (index > options.tooltipTopRow) {
                            break
                        }
                        let ptg = (row.data / total * 100).toFixed(2)
                        if (ptg == 'NaN') {
                            ptg = 0
                        }
                        if (options.tooltipPercentageHide == true) {
                            ptg = ''
                        } else {
                            ptg += `%`
                        }
                        if (options.tooltipBarRemove == true) {
                            if (row.seriesType == 'bar') {
                                ptg = ''
                            }
                        }
                        restmp += `
                  <tr>
                    <td style="padding:2px 0px 2px 4px;"><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${row.color}"></span>${row.seriesName}</td>
                    <td style="padding:2px 0px 2px 4px; text-align:right; font-family: monospace !important;">${row.data}<span style="font-family: 'Microsoft Sans Serif' , Arial, Helvetica, Verdana !important;">${options.unit}</span></td>
                    <td style="padding:2px 0px 2px 20px;  text-align:right;">${ptg}</td>
                    <td></td>
                  </tr>
                `
                        index++
                    }
                    if (param.length > 1 && options.tooltipTotalHide == true) {
                        total = total
                        res += `
                <tr>
                  <td style="padding:2px 0px 2px 4px;"><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#eee"></span>${options.tooltipTotaltext}</td>
                  <td style="padding:2px 0px 2px 4px; text-align:right; font-family: monospace !important;">${total}${options.unit}</td>
                  <td style="padding:2px 0px 2px 20px; text-align:right;"> </td>
                </tr>
              `
                    }
                    res += restmp
                    res += `</table>`
                    return res
                }
            },
            dataZoom: dataZoom,
            legend: {
                show: this.options.legend,
                top: 0,
                textStyle: {
                    fontWeight: 400,
                    fontSize: 14,
                    fontStyle: 'normal',
                    color: '#000'
                },
                data: legendData,   // Array data type such as category,  [ '未用', '在用']
                center: '0%',
                selected: this.options.legendSelected
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: bottomPercentage,
                top: '10%',
                containLabel: true
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#aaa', '#eee'],
                        width: 0.4,
                        type: 'dotted'
                    }
                },
                axisLabel: {
                    formatter: '{value}' + this.options.unit
                }
            },
            xAxis: {
                type: 'category',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#aaa', '#eee'],
                        width: 0.4,
                        type: 'dotted'
                    }
                },
                axisTick: {
                    alignWithLabel: true,
                },
                axisLabel: {
                    interval: options.XaxisInterval,
                    rotate: xrotate,
                    formatter: function (value, index) {
                        if (value.includes('-')) {
                            if (value.split('-').length >= 3) {
                                return value.split('-')[1] + '/' + value.split('-')[2]
                            } else {
                                return value
                            }

                        } else {
                            return value
                        }
                    }
                },
                triggerEvent: true,
                data: XaxisData    // array,  such as [ 'idc1', 'idc2' ]
            },
            /*******   example:
             let seriesData = [
             {
       'name': '未用',
       'type': 'bar',
       'stack': '总量',
       'data': []
       }
             ]
             */

            series: seriesData
        }
        return option
    }

    // 支持柱状图+折线图， x轴为日期。 双Y轴
    ColumnXAxisDateFormat_twoYaxis(legendData, XaxisData, seriesData, xrotate = 0, bottomPercentage = '3%', unit2 = '') {
        let options = this.options

        if (options.XaxisInterval == 0) {   //zero is default value, user not set
            options.XaxisInterval = parseInt(XaxisData.length / options.IntervalDefaultPageValue)   // 一个屏幕最多30个元素
        }

        let dataZoom = []

        if (options.dataZoom == true) {
            dataZoom = [{
                "show": options.dataZoom,
                "height": 30,
                "xAxisIndex": [
                    0
                ],
                bottom: 0,
                "start": 0,
                "end": 100,
                filterMode: 'filter',
                handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                handleSize: '110%',
                handleStyle: {
                    color: "#e58edb",

                },
                textStyle: {
                    color: "#000"
                },
                borderColor: "#7e849c"
            }, {
                "type": "slider",
                "show": false,
                "height": 15,
                "start": 1,
                "end": 35
            }]
        }


        let option = {
            color: options.Color,
            toolbox: {
                show: options.toolbox,
                feature: {
                    dataView: {
                        readOnly: false
                    },
                    magicType: {
                        type: ['line', 'bar', 'stack', 'tiled']
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (param) {
                    //console.log(param)
                    let res = `<div style="text-align:center; font-size: 16px; font-weight:600; padding: 8px 2px;">${param[0].axisValue}${options.tooltipTopRow < 10000 ? ` (TOP${options.tooltipTopRow})` : ''}</div>`
                    let restmp = ``
                    res += `
                <table style="width: 250px; min-width:100px;">
              `
                    let total = 0

                    if (options['tooltipSort'] == true) {
                        param.sort(Utils.arrayObjSort('desc', 'data'))
                    }

                    for (let row of param) {
                        if (options.tooltipBarRemove == true) {
                            if (row.seriesType == 'bar') {
                                continue
                            }
                        }
                        total += row.data
                    }

                    let index = 1
                    for (let row of param) {

                        if (options.tooltipZeroHide == true) {
                            if (row.data / total * 100 == 0) {
                                continue
                            }
                        }
                        if (index > options.tooltipTopRow) {
                            break
                        }
                        let ptg = (row.data / total * 100).toFixed(2)
                        if (ptg == 'NaN') {
                            ptg = 0
                        }
                        if (options.tooltipPercentageHide == true) {
                            ptg = ''
                        } else {
                            ptg += `%`
                        }
                        if (options.tooltipBarRemove == true) {
                            if (row.seriesType == 'bar') {
                                ptg = ''
                            }
                        }
                        restmp += `
                  <tr>
                    <td style="padding:2px 0px 2px 4px;"><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${row.color}"></span>${row.seriesName}</td>
                    <td style="padding:2px 0px 2px 4px; text-align:right; font-family: monospace !important;">${row.data}
                    <span style="font-family: 'Microsoft Sans Serif' , Arial, Helvetica, Verdana !important;">${row.seriesIndex == 0 ? options.unit : unit2}</span>
                    </td>
                    <td style="padding:2px 0px 2px 20px;  text-align:right;">${ptg}</td>
                    <td></td>
                  </tr>
                `
                        index++
                    }
                    if (param.length > 1 && options.tooltipTotalHide == true) {
                        total = total
                        res += `
                <tr>
                  <td style="padding:2px 0px 2px 4px;"><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#eee"></span>${options.tooltipTotaltext}</td>
                  <td style="padding:2px 0px 2px 4px; text-align:right; font-family: monospace !important;">${total}${options.unit}</td>
                  <td style="padding:2px 0px 2px 20px; text-align:right;"> </td>
                </tr>
              `
                    }
                    res += restmp
                    res += `</table>`
                    return res
                }
            },
            dataZoom: dataZoom,
            legend: {
                show: this.options.legend,
                top: 0,
                textStyle: {
                    fontWeight: 400,
                    fontSize: 14,
                    fontStyle: 'normal',
                    color: '#000'
                },
                data: legendData,   // Array data type such as category,  [ '未用', '在用']
                center: '0%',
                selected: this.options.legendSelected
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: bottomPercentage,
                top: '10%',
                containLabel: true
            },
            yAxis: [{
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#aaa', '#eee'],
                        width: 0.4,
                        type: 'dotted'
                    }
                },
                axisLabel: {
                    formatter: '{value}' + this.options.unit
                }
            }, {
                name: '',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#aaa', '#eee'],
                        width: 0.1,
                        type: 'dotted'
                    }
                },
                axisLabel: {
                    formatter: '{value}' + unit2
                },
                type: 'value'
            }],
            xAxis: {
                type: 'category',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#aaa', '#eee'],
                        width: 0.4,
                        type: 'dotted'
                    }
                },
                axisTick: {
                    alignWithLabel: true,
                },
                axisLabel: {
                    interval: options.XaxisInterval,
                    rotate: xrotate,
                    formatter: function (value, index) {
                        if (value.includes('-')) {
                            if (value.split('-').length >= 3) {
                                return value.split('-')[1] + '/' + value.split('-')[2]
                            } else {
                                return value
                            }

                        } else {
                            return value
                        }
                    }
                },
                triggerEvent: true,
                data: XaxisData    // array,  such as [ 'idc1', 'idc2' ]
            },
            /*******   example:
             let seriesData = [
             {
       'name': '未用',
       'type': 'bar',
       'stack': '总量',
       'data': []
       }
             ]
             */

            series: seriesData
        }
        return option
    }

    ColumnXAxisLegendBottom(legendData, YaxisData, seriesData) {
        let options = this.options
        let option = {
            color: options.Color,
            toolbox: {
                show: options.toolbox,
                feature: {
                    dataView: {
                        readOnly: false
                    },
                    magicType: {
                        type: ['line', 'bar', 'stack', 'tiled']
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (param, index, callback) {
                    //console.log(param)
                    let res = `<div style="text-align:center; font-size: 16px; font-weight:600; padding: 8px 2px;">${param[0].axisValue}</div>`
                    let restmp = ``
                    res += `
                <table style="width: 250px; min-width:100px;">

                 <tbody>
                
              `
                    let total = 0

                    if (options['tooltipSort'] == true) {
                        param.sort(Utils.arrayObjSort('desc', 'data'))
                    }

                    for (let row of param) {
                        total += row.data
                    }

                    for (let row of param) {
                        if (options.tooltipZeroHide == true) {
                            if (row.data / total * 100 == 0) {
                                continue
                            }
                        }
                        let ptg = (row.data / total * 100).toFixed(2)
                        if (ptg == 'NaN') {
                            ptg = 0
                        }
                        //console.log(row)

                        restmp += `
                  <tr>
                    <td style="padding:2px 0px 2px 4px;"><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${row.color}"></span>${row.seriesName}</td>
                    <td style=" font-family: monospace !important;">${row.data}<span style="font-family: 'Microsoft Sans Serif' , Arial, Helvetica, Verdana !important;">${options.unit}</span></td>
                    <td style=""></td>
                    <td></td>
                  </tr>
                `


                    }
                    if (param.length > 1 && options.tooltipTotalHide == true) {
                        total = total
                        res += `
                <tr>
                  <td style="padding:2px 0px 2px 4px;"><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#eee"></span>${options.tooltipTotaltext}</td>
                  <td style="font-family: monospace !important;">${total}${options.unit}</td>
                  <td></td>
                </tr>
              `
                    }
                    res += restmp
                    res += `</tbody></table>`
                    return res
                }
            },
            dataZoom: [{
                "show": options.dataZoom,
                "height": 30,
                "xAxisIndex": [
                    0
                ],
                bottom: 0,
                "start": 0,
                "end": 100,
                filterMode: 'filter',
                handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                handleSize: '110%',
                handleStyle: {
                    color: "#a8acd3",

                },
                textStyle: {
                    color: "#000"
                },
                borderColor: "#7e849c"
            }, {
                "type": "slider",
                "show": false,
                "height": 15,
                "start": 1,
                "end": 35
            }],
            legend: {
                show: this.options.legend,
                left: 'left',
                orient: 'vertical',
                top: 2,
                left: 2,
                bottom: 2,
                height: '95%',
                //borderWidth: 2,
                borderColor: '#8cafee',
                padding: [10, 10, 10, 10],
                textStyle: {
                    fontWeight: 400,
                    fontSize: 12,
                    fontStyle: 'normal',
                    color: '#000'
                },
                data: legendData,   // Array data type such as category,  [ '未用', '在用']
                center: '0%',
                selected: this.options.legendSelected
            },
            grid: {
                left: '18%',
                right: '4%',
                bottom: '3%',
                top: '10%',
                containLabel: true
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#aaa', '#eee'],
                        width: 0.4,
                        type: 'dotted'
                    }
                },
                axisLabel: {
                    formatter: '{value}' + this.options.unit
                }
            },
            xAxis: {
                type: 'category',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#aaa', '#eee'],
                        width: 0.4,
                        type: 'dotted'
                    }
                },
                axisTick: {
                    alignWithLabel: true,
                },
                axisLabel: {
                    interval: 0,
                    rotate: 0
                },
                triggerEvent: true,
                data: YaxisData    // array,  such as [ 'idc1', 'idc2' ]
            },
            /*******   example:
             let seriesData = [
             {
       'name': '未用',
       'type': 'bar',
       'stack': '总量',
       'data': []
       }
             ]
             */

            series: seriesData
        }
        return option
    }

    ColumnAndPie(legendData, XaxisData, seriesData, pieTitle, xrotate = 0, bottomPercentage = '5%') {
        let options = this.options
        let option = {
            color: options.Color,
            title: [{
                text: pieTitle,
                left: '83%',
                top: '0%',
                textAlign: 'center',
                textStyle: {
                    color: '#ff733f'
                }
            }],
            toolbox: {
                show: options.toolbox,
                feature: {
                    dataView: {
                        readOnly: false
                    },
                    magicType: {
                        type: ['line', 'bar', 'stack', 'tiled']
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (param) {
                    //console.log(param)
                    let res = `<div style="text-align:center; font-size: 16px; font-weight:600; padding: 8px 2px;">${param[0].axisValue}</div>`
                    let restmp = ``
                    res += `
                <table style="width: 250px; min-width:100px;">
              `
                    let total = 0

                    if (options['tooltipSort'] == true) {
                        param.sort(Utils.arrayObjSort('desc', 'data'))
                    }

                    for (let row of param) {
                        total += row.data
                    }

                    for (let row of param) {
                        if (options.tooltipZeroHide == true) {
                            if (row.data / total * 100 == 0) {
                                continue
                            }
                        }
                        let ptg = (row.data / total * 100).toFixed(2)
                        if (ptg == 'NaN') {
                            ptg = 0
                        }
                        restmp += `
                  <tr>
                    <td style="padding:2px 0px 2px 4px;"><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${row.color}"></span>${row.seriesName}</td>
                    <td style="padding:2px 0px 2px 4px; text-align:right; font-family: monospace !important;">${row.data}</td>
                    <td style="padding:2px 0px 2px 20px;  text-align:right;">${ptg}%</td>
                    <td></td>
                  </tr>
                `
                    }
                    if (param.length > 1) {
                        total = total
                        res += `
                <tr>
                  <td style="padding:2px 0px 2px 4px;"><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#eee"></span>${options.tooltipTotaltext}</td>
                  <td style="padding:2px 0px 2px 4px; text-align:right; font-family: monospace !important;">${total}</td>
                  <td style="padding:2px 0px 2px 20px; text-align:right;"> </td>
                </tr>
              `
                    }
                    res += restmp
                    res += `</table>`
                    return res
                }
            },
            legend: {
                show: this.options.legend,
                top: 0,
                textStyle: {
                    fontWeight: 400,
                    fontSize: 14,
                    fontStyle: 'normal',
                    color: '#000'
                },
                data: legendData,   // Array data type such as category,  [ '未用', '在用']
                center: '0%'
            },
            grid: {
                left: '1%',
                right: '35%',
                top: '16%',
                bottom: bottomPercentage,
                containLabel: true
            },
            yAxis: {
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#aaa', '#eee'],
                        width: 0.4,
                        type: 'dotted'
                    }
                },
                axisLabel: {
                    formatter: '{value}' + this.options.unit
                }
            },
            xAxis: {
                type: 'category',
                nameTextStyle: {
                    fontWeight: '600',
                    fontSize: '16px'
                },
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#aaa', '#eee'],
                        width: 0.4,
                        type: 'dotted'
                    }
                },
                axisTick: {
                    alignWithLabel: true,
                },
                axisLabel: {
                    interval: 0,
                    rotate: xrotate
                },
                triggerEvent: true,
                data: XaxisData
            },
            series: seriesData
        }
        return option
    }

    Pie(data, title) {
        data.sort(Utils.arrayObjSort('desc', 'value'));

        let option = {
            color: this.options.Color,
            toolbox: {
                show: this.options.toolbox,
                feature: {
                    dataView: {readOnly: false},
                    saveAsImage: {}
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c}" + this.options.unit + " ({d}%)",
                triggerEvent: true
            },
            series: [
                {
                    name: title,
                    type: 'pie',
                    radius: '70%',
                    center: ['50%', '50%'],
                    // data:[
                    //   {value:335, name:'py1'},
                    //   {value:310, name:'py2'},
                    //   {value:234, name:'py3'}
                    // ],
                    data: data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return option
    }

    PieCircle(data, title) {
        data.sort(Utils.arrayObjSort('desc', 'value'));

        let option = {
            color: this.options.Color,
            toolbox: {
                show: this.options.toolbox,
                feature: {
                    dataView: {readOnly: false},
                    saveAsImage: {}
                }
            },
            tooltip: {
                trigger: 'item',
                // formatter: " {a} <br/> {b} {c}" + this.options.unit + " ({d}%)",
                formatter: " {a} <br/> {b} {c}" + this.options.unit,
                triggerEvent: true
            },
            series: [
                {
                    name: title,
                    type:'pie',
                    radius: ['50%', '70%'],
                    avoidLabelOverlap: false,
                    // data:[
                    //   {value:335, name:'py1'},
                    //   {value:310, name:'py2'},
                    //   {value:234, name:'py3'}
                    // ],
                    data: data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        return option
    }

    ColumnXAxis_CustomMachineAssign(legendData, YaxisData, seriesData, xrotate = 0, bottomPercentage = '3%') {
        let options = this.options

        let dataZoom = []

        if (options.dataZoom == true) {
            dataZoom = [{
                "show": options.dataZoom,
                "height": 30,
                "xAxisIndex": [
                    0
                ],
                bottom: 0,
                "start": 60,
                "end": 100,
                filterMode: 'filter',
                handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
                handleSize: '110%',
                handleStyle: {
                    color: "#e58edb",

                },
                textStyle: {
                    color: "#000"
                },
                borderColor: "#7e849c"
            }, {
                "type": "inside",
                "show": true,
                "height": 15,
                "start": 1,
                "end": 35
            }]
        }


        let option = {
            color: options.Color,
            toolbox: {
                show: options.toolbox,
                feature: {
                    dataView: {
                        readOnly: false
                    },
                    magicType: {
                        type: ['line', 'bar', 'stack', 'tiled']
                    },
                    restore: {},
                    saveAsImage: {}
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                },
                formatter: function (param) {
                    //console.log(param)
                    let res = `<div style="text-align:center; font-size: 16px; font-weight:600; padding: 8px 2px;">${param[0].axisValue}${options.tooltipTopRow < 10000 ? ` (TOP${options.tooltipTopRow})` : ''}</div>`
                    let restmp = ``
                    res += `
                <table style="width: 250px; min-width:100px;">
              `
                    let total = 0

                    if (options['tooltipSort'] == true) {
                        param.sort(Utils.arrayObjSort('desc', 'data'))
                    }

                    for (let row of param) {
                        if (row.componentSubType == 'line') {
                            continue
                        }
                        total += row.data
                    }

                    // 第二条线
                    for (let row of param) {
                        if (row.componentSubType != 'line') {
                            continue
                        }
                        res += `
                 <tr>
                    <td style="padding:2px 0px 2px 4px;"><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${row.color}"></span>${row.seriesName}</td>
                    <td style="padding:2px 0px 2px 4px; text-align:right; font-family: monospace !important;">${row.data}<span style="font-family: 'Microsoft Sans Serif' , Arial, Helvetica, Verdana !important;">%</span></td>
                    <td style="padding:2px 0px 2px 20px;  text-align:right;"></td>
                    <td></td>
                  </tr>
              `
                    }
                    res += `<tr style="border-bottom: 2px dotted #ff8fd4;"><td></td><td></td><td></td><td></td></tr>`


                    let index = 1
                    for (let row of param) {
                        if (row.componentSubType == 'line') {
                            continue
                        }
                        if (options.tooltipZeroHide == true) {
                            if (row.data / total * 100 == 0) {
                                continue
                            }
                        }
                        if (index > options.tooltipTopRow) {
                            break
                        }
                        let ptg = (row.data / total * 100).toFixed(2)
                        if (ptg == 'NaN') {
                            ptg = 0
                        }
                        if (options.tooltipPercentageHide == true) {
                            ptg = ''
                        } else {
                            ptg += `%`
                        }
                        restmp += `
                  <tr>
                    <td style="padding:2px 0px 2px 4px;"><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:${row.color}"></span>${row.seriesName}</td>
                    <td style="padding:2px 0px 2px 4px; text-align:right; font-family: monospace !important;">${row.data}<span style="font-family: 'Microsoft Sans Serif' , Arial, Helvetica, Verdana !important;">${options.unit}</span></td>
                    <td style="padding:2px 0px 2px 20px;  text-align:right;">${ptg}</td>
                    <td></td>
                  </tr>
                `
                        index++
                    }
                    if (param.length > 1 && options.tooltipTotalHide == true) {
                        total = total
                        res += `
                <tr>
                  <td style="padding:2px 0px 2px 4px;"><span style="display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:#eee"></span>${options.tooltipTotaltext}</td>
                  <td style="padding:2px 0px 2px 4px; text-align:right; font-family: Microsoft Sans Serif !important;">${Math.floor(total) === total ? total : total.toFixed(2)}${options.unit}</td>
                  <td style="padding:2px 0px 2px 20px; text-align:right;"> </td>
                </tr>
              `
                    }


                    res += restmp
                    res += `</table>`
                    return res
                }
            },
            dataZoom: dataZoom,
            legend: {
                show: this.options.legend,
                top: 0,
                left: options.legendLeft,
                textStyle: {
                    fontWeight: 400,
                    fontSize: 12,
                    fontStyle: 'normal',
                    color: '#000'
                },
                data: legendData,   // Array data type such as category,  [ '未用', '在用']
                center: '0%',
                selected: this.options.legendSelected
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: bottomPercentage,
                top: '10%',
                containLabel: true
            },
            yAxis: [{
                type: 'value',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#aaa', '#eee'],
                        width: 0.4,
                        type: 'dotted'
                    }
                },
                axisLabel: {
                    formatter: '{value}' + this.options.unit
                }
            }, {
                name: 'load',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#aaa', '#eee'],
                        width: 0.1,
                        type: 'dotted'
                    }
                },
                axisLabel: {
                    formatter: '{value}' + '%'
                },
                max: 100,
                min: 0,
                type: 'value'
            }],
            xAxis: {
                type: 'category',
                splitLine: {
                    show: true,
                    lineStyle: {
                        color: ['#aaa', '#eee'],
                        width: 0.4,
                        type: 'dotted'
                    }
                },
                axisTick: {
                    alignWithLabel: true,
                },
                axisLabel: {
                    interval: 0,
                    rotate: xrotate
                },
                triggerEvent: true,
                data: YaxisData    // array,  such as [ 'idc1', 'idc2' ]
            },
            /*******   example:
             let seriesData = [
             {
       'name': '未用',
       'type': 'bar',
       'stack': '总量',
       'data': []
       }
             ]
             */

            series: seriesData
        }
        return option
    }


}

export default MyEcharts



