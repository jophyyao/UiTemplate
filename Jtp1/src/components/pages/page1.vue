<template>
  <div id="ServerDelivery">


    <section id="content_wrapper">
      <!-- Begin: Content -->
      <section id="content">


        <el-row>
          <el-col :span="24">
            <el-card class="box-card">
              <el-form ref="form" :model="form" label-width="120px">
                <el-form-item label="我最爱的食物">
                  <el-select v-model="my_favourite_food" filterable placeholder="请选择">
                    <el-option
                      v-for="item in food_options" :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label="我最爱的运动">
                  <el-select v-model="my_favourite_sports" filterable placeholder="请选择">
                    <el-option
                      v-for="item in sports_options" :key="item.value"
                      :label="item.label"
                      :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>

                <el-form-item label="时间范围">
                  <div class="block">
                    <el-date-picker
                      v-model="value4"
                      type="datetimerange"
                      :picker-options="pickerOptions2"
                      placeholder="选择时间范围"
                      align="right">
                    </el-date-picker>
                  </div>
                </el-form-item>
              </el-form>
            </el-card>

          </el-col>
        </el-row>


        <div class="admin-panels mn pn" id="panel1">
          <div class="row">

            <div class="col-md-12 col-lg-6 admin-grid">
              <div class="panel">
                <div class="panel-heading">
                  <span class="panel-title fw700 text-info">Content1</span>
                </div>
                <div class="panel-body pn bg-light">

                  <div v-bind:style="{ width: '100%', height: '275px', margin: '0 auto' }">

                      <MyTable></MyTable>
                  </div>

                </div>
              </div>
            </div>

            <div class="col-md-12 col-lg-6 admin-grid">
              <div class="panel">
                <div class="panel-heading">
                  <span class="panel-title fw700 text-info">Content2</span>
                </div>
                <div class="panel-body pn bg-light">
                  <div id="chart2" v-bind:style="{ width: '100%', height: '275px', margin: '0 auto' }"></div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </section>
      <!-- End: Content -->
    </section>


  </div>
</template>

<script>

  import Vue from 'vue'
  import * as CONFIG from '@/..//config/public.env'
  import MyTable from '@/components/pages/table'
  import VueResource from 'vue-resource'
  Vue.use(VueResource)


  export default {
    data() {
      return {
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        food_options: [{
          value: '选项1',
          label: '酸菜鱼'
        }, {
          value: '选项2',
          label: '日料'
        }, {
          value: '选项3',
          label: '麻辣烫'
        }],
        my_favourite_food: '',
        sports_options: [{
          value: 'bk',
          label: '篮球'
        }, {
          value: 'ms',
          lable: '健身'
        }],
        my_favourite_sports: '',
        pickerOptions2: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit('pick', [start, end]);
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
              picker.$emit('pick', [start, end]);
            }
          }]
        },
        value3: [new Date(2000, 10, 10, 10, 10), new Date(2000, 10, 11, 10, 10)],
        value4: ''
      }
    },
    components: {
      MyTable : MyTable
    },
    methods: {
      onSubmit() {
        console.log('submit!');
      }
    },
    mounted: function () {
      AdminPanel().init({
        'drag': true,
        'panel_id': '#panel1'
      });
    }
  }
</script>


<style>
  #ServerDelivery {
    padding-top: 60px;
  }

  .text {
    font-size: 14px;
  }

  .item {
    padding: 18px 0;
  }

  .el-row {
    margin-bottom: 20px;
  }

  .panel {
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, .12), 0 0 6px 0 rgba(0, 0, 0, .04);
  }


</style>
