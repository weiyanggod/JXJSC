<template>
  <div class="page">
    <img src="@/assets/img/大标题.png" />
    <div class="leftTime">
      {{
        dayjs().format('YYYY/MM/DD') +
        ' ' +
        getWeek() +
        ' ' +
        dayjs().format('HH:mm')
      }}
    </div>
    <div class="rightTime">
      <div>年度</div>
      <el-select
        v-model="year"
        placeholder="Select"
        style="width: 135px"
        clearable
        @change="changeYear"
      >
        <el-option
          v-for="item in yearList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="month"
        placeholder="Select"
        style="width: 135px"
        clearable
        @change="changeMonth"
      >
        <el-option
          v-for="item in monthList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div v-loading="loadingCard" class="card">
      <div v-for="(item, index) in cardList" :key="index" class="item">
        <div>
          <div class="title">{{ item.name }}</div>
          <div style="display: flex; justify-content: space-between">
            <div>
              <span class="number">
                {{ item.rzye }}
              </span>
              <span v-if="index !== 3" class="unit">亿</span>
              <span v-else class="unit">%</span>
            </div>
            <div class="compare">
              <span>
                <span class="compareText">与年初比</span>
                <span v-if="item.yncb > 0" class="percent">
                  {{ item.yncb + '%' }}
                </span>
                <span v-else class="percent" style="color: #1e8e00">
                  {{ item.yncb + '%' }}
                </span>
                <el-icon
                  v-if="item.yncb > 0"
                  size="16"
                  color="#b95440"
                  style="vertical-align: -10%"
                >
                  <Top />
                </el-icon>
                <el-icon
                  v-else
                  size="16"
                  color="#1E8E00"
                  style="vertical-align: -10%"
                >
                  <Bottom />
                </el-icon>
              </span>
            </div>
          </div>
        </div>
        <div class="bottom">
          <div>
            <div class="compareText">本年度</div>
            <span class="number">
              {{ item.bnd }}
            </span>
            <span v-if="index !== 3" class="unit">亿</span>
          </div>
          <div>
            <div class="compareText">上年末</div>
            <span class="number">
              {{ item.snm }}
            </span>
            <span v-if="index !== 3" class="unit">亿</span>
          </div>
          <div>
            <div class="compareText">去年同期</div>
            <div style="display: flex">
              <div v-if="item.qntq > 0" class="number">
                +{{ item.qntq + '%' }}
              </div>
              <div v-else class="number">
                {{ item.qntq + '%' }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content" style="display: flex">
      <div class="table">
        <div class="title">
          <div>主体融资情况</div>
          <el-select
            v-model="group"
            placeholder="Select"
            size="large"
            class="groupSelect"
            style="width: 135px"
            @change="changeGroup"
          >
            <el-option
              v-for="item in groupSelect"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div style="font-size: 0; margin-bottom: 1%">
          <img src="@/assets/img/主体融资情况装饰.png" />
        </div>
        <!-- <el-table
          :header-cell-style="headerCellStyle"
          :row-style="rowStyle"
          :cell-style="cellStyle"
          :data="tableData"
          style="width: 100%"
          ail
        >
          <el-table-column prop="date" label="" width="120" align="center" />
          <el-table-column label="当前" align="center">
            <template #default="{ row }">
              <div>
                {{
                  (row.thisYear.inVivo + row.thisYear.inVitro).toLocaleString()
                }}
              </div>
              <div>
                <el-tag type="info" round color="#FFF9F7">
                  <text style="color: #3d3d3d; font-style: italic">体内:</text>
                  {{ row.thisYear.inVivo.toLocaleString() }}
                </el-tag>
              </div>
              <div>
                <el-tag type="info" round color="#FFF9F7">
                  <text style="color: #3d3d3d; font-style: italic">体外:</text>
                  {{ row.thisYear.inVitro.toLocaleString() }}
                </el-tag>
              </div>
            </template>
          </el-table-column>

          <el-table-column label="净增目标" width="180" align="center">
            <template #default="{ row }">
              <div>{{ row.target.toLocaleString() }}</div>
            </template>
          </el-table-column>

          <el-table-column label="净增" align="center">
            <template #default="{ row }">
              <div>
                {{
                  (row.LastYear.inVivo + row.LastYear.inVitro).toLocaleString()
                }}
              </div>
              <div>
                <el-tag type="info" round color="#FFF9F7">
                  <text style="color: #3d3d3d; font-style: italic">体内:</text>
                  {{ row.LastYear.inVivo.toLocaleString() }}
                </el-tag>
              </div>
              <div>
                <el-tag type="info" round color="#FFF9F7">
                  <text style="color: #3d3d3d; font-style: italic">体外:</text>
                  {{ row.LastYear.inVitro.toLocaleString() }}
                </el-tag>
              </div>
            </template>
          </el-table-column>

          <el-table-column
            prop="implementationRate"
            label="执行率"
            align="center"
          />

          <el-table-column
            prop="sameTimeLastYear"
            label="去年同期"
            align="center"
          />
        </el-table> -->
      </div>
      <div class="rightContent">
        <!-- 期限分析 -->
        <div class="term">
          <div class="title">期限分析</div>
          <div style="font-size: 0">
            <img src="@/assets/img/期限分析装饰.png" />
          </div>
          <div ref="termEcharts" class="termEcharts"></div>
        </div>
        <!-- 产品类别分析 -->
        <div class="productCategory">
          <div class="title">产品类别分析</div>
          <div style="font-size: 0">
            <img src="@/assets/img/产品类别分析装饰.png" />
          </div>
          <div
            ref="productCategoryEcharts"
            class="productCategoryEcharts"
          ></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import * as echarts from 'echarts'
import dayjs from 'dayjs'
import { useStore } from '@/stores/store'
import { ref } from 'vue'
import {
  getFinancingBalanceApi,
  getInterbankBalanceApi,
  getFinancingRateApi,
  getNetIncreaseApi,
  getFinancingPeriodApi,
  getFinancingProductApi,
} from '@/api/index'
const year = ref(dayjs().year().toString())
const month = ref(dayjs().month().toString())
const storeDate = useStore()

// 年度列表
const yearList = [
  {
    value: '2024',
    label: '2024',
  },
  {
    value: '2023',
    label: '2023',
  },
  {
    value: '2022',
    label: '2022',
  },
  {
    value: '2021',
    label: '2021',
  },
]
// 月份列表
const monthList = [
  {
    value: '1',
    label: '1月',
  },
  {
    value: '2',
    label: '2月',
  },
  {
    value: '3',
    label: '3月',
  },
  {
    value: '4',
    label: '4月',
  },
  {
    value: '5',
    label: '5月',
  },
  {
    value: '6',
    label: '6月',
  },
  {
    value: '7',
    label: '7月',
  },
  {
    value: '8',
    label: '8月',
  },
  {
    value: '9',
    label: '9月',
  },
  {
    value: '10',
    label: '10月',
  },
  {
    value: '11',
    label: '11月',
  },
  {
    value: '12',
    label: '12月',
  },
]
// 更改年度
const changeYear = (val) => {
  storeDate.year = val
  if (storeDate.month) {
    render()
  }
}
// 更改月份
const changeMonth = (val) => {
  storeDate.month = val
  if (storeDate.year) {
    render()
  }
}

const loadingCard = ref(false)

// 卡片列表
const cardList = ref([])

// 获取卡片数据
const getCardList = async () => {
  cardList.value = []
  loadingCard.value = true
  const { data: data1 } = await getFinancingBalanceApi()
  const temp1 = {}
  temp1.name = '融资余额'
  temp1.rzye = (data1.rzye / 10000).toFixed(2)
  temp1.yncb = (((data1.rzye - data1.snd) / data1.snd) * 100).toFixed(2)
  temp1.bnd = (data1.bnd / 10000).toFixed(2)
  temp1.snm = (data1.snd / 10000).toFixed(2)
  temp1.qntq = ((data1.rzye - data1.qntq) / data1.qntq).toFixed(2) * 100
  cardList.value.push(temp1)

  const { data: data2 } = await getInterbankBalanceApi()
  const temp2 = {}
  temp2.name = '拆借余额'
  temp2.rzye = (data2.cjye / 10000).toFixed(2)
  temp2.yncb = (((data2.cjye - data2.snm) / data2.snm) * 100).toFixed(2)
  temp2.bnd = (data2.bnd / 10000).toFixed(2)
  temp2.snm = (data2.snm / 10000).toFixed(2)
  temp2.qntq = ((data2.cjye - data2.qntq) / data2.qntq).toFixed(2) * 100
  cardList.value.push(temp2)

  cardList.value.push({
    name: '总余额',
    rzye: (temp1.rzye * 1 + temp2.rzye * 1).toFixed(2),
    yncb: ((+temp1.yncb * 1 + temp2.yncb * 1) / 2).toFixed(2),
    bnd: (+temp1.bnd * 1 + temp2.bnd * 1).toFixed(2),
    snm: (+temp1.snm * 1 + temp2.snm * 1).toFixed(2),
    qntq: ((+temp1.qntq * 1 + temp2.qntq * 1) / 2).toFixed(2),
  })

  const { data: data3 } = await getFinancingRateApi()
  const temp3 = {}
  temp3.name = '融资平均利率'
  temp3.rzye = data3.rate.toFixed(2)
  temp3.yncb = (((data3.rate - data3.snm) / data3.snm) * 100).toFixed(2)
  temp3.bnd = data3.bnd.toFixed(2)
  temp3.snm = data3.snm.toFixed(2)
  temp3.qntq = ((data3.rate - data3.qntq) / data3.qntq).toFixed(2) * 100
  cardList.value.push(temp3)

  loadingCard.value = false
}
// 集团
const group = ref('梅里集团')

// 集团列表
const groupSelect = ref([
  {
    value: '城投集团',
    label: '城投集团',
  },
  {
    value: '嘉秀本级',
    label: '嘉秀本级',
  },
  {
    value: '盛洪集团',
    label: '盛洪集团',
  },
  {
    value: '高新控股集团',
    label: '高新控股集团',
  },
  {
    value: '交投集团',
    label: '交投集团',
  },
  {
    value: '梅里集团',
    label: '梅里集团',
  },
  {
    value: '嘉腾集团',
    label: '嘉腾集团',
  },
  {
    value: '闻川集团',
    label: '闻川集团',
  },
  {
    value: '麟湖集团',
    label: '麟湖集团',
  },
  {
    value: '秀宏集团',
    label: '秀宏集团',
  },
])

// 更改集团
const changeGroup = () => {
  getTableDate()
}

const tableData = ref([
  // {
  //   date: '融资余额',
  //   target: 5500100,
  //   thisYear: {
  //     inVivo: 500000,
  //     inVitro: 410100,
  //   },
  //   implementationRate: '81.01%',
  //   LastYear: {
  //     inVivo: 500000,
  //     inVitro: 410100,
  //   },
  //   sameTimeLastYear: '5.0%',
  // },
  // {
  //   date: '拆借余额',
  //   target: 5500100,
  //   thisYear: {
  //     inVivo: 500000,
  //     inVitro: 410100,
  //   },
  //   implementationRate: '81.01%',
  //   LastYear: {
  //     inVivo: 500000,
  //     inVitro: 410100,
  //   },
  //   sameTimeLastYear: '5.0%',
  // },
  // {
  //   date: '总余额',
  //   target: 5500100,
  //   thisYear: {
  //     inVivo: 500000,
  //     inVitro: 410100,
  //   },
  //   implementationRate: '81.01%',
  //   LastYear: {
  //     inVivo: 500000,
  //     inVitro: 410100,
  //   },
  //   sameTimeLastYear: '5.0%',
  // },
  // {
  //   date: '平均利率',
  //   target: 5500100,
  //   thisYear: {
  //     inVivo: 500000,
  //     inVitro: 410100,
  //   },
  //   implementationRate: '81.01%',
  //   LastYear: {
  //     inVivo: 500000,
  //     inVitro: 410100,
  //   },
  //   sameTimeLastYear: '5.0%',
  // },
  // {
  //   date: '负债率',
  //   target: 5500100,
  //   thisYear: {
  //     inVivo: 500000,
  //     inVitro: 410100,
  //   },
  //   implementationRate: '81.01%',
  //   LastYear: {
  //     inVivo: 500000,
  //     inVitro: 410100,
  //   },
  //   sameTimeLastYear: '5.0%',
  // },
])

// 获取表格数据
const getTableDate = async () => {
  const { data } = await getNetIncreaseApi(group.value)
  console.log(data)
  tableData.value.push({
    date: '融资余额',
    target: data.jzlmb,
    thisYear: {
      inVivo: data.txn,
      inVitro: data.txw,
    },
    implementationRate: data.zxl,
  })
  console.log(data)
}

// // 表头样式
// const headerCellStyle = () => {
//   return {
//     fontFamily: 'AlibabaPuHuiTi-2-55-Regular',
//     color: '#2C2C2C',
//     fontSize: '16px',
//   }
// }

// const cellStyle = ({ columnIndex }) => {
//   if (columnIndex === 0) {
//     return {
//       color: '#000',
//     }
//   }
// }

// const rowStyle = ({ rowIndex }) => {
//   const style = {
//     fontFamily: 'AlibabaPuHuiTi-2-55-Regular',
//     color: '#2C2C2C',
//     fontSize: '16px',
//   }
//   if (rowIndex % 2 === 0) {
//     return {
//       background: '#fbf0ed',
//       ...style,
//     }
//   } else {
//     return {
//       background: '#ffffff',
//       ...style,
//     }
//   }
// }

// 期限分析
const termEcharts = ref()

const termEchartsOption = {
  tooltip: {
    trigger: 'item',
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      padAngle: 5,
      itemStyle: {
        normal: {
          label: {
            formatter: '{b} \n\n {d}%',
            padding: [0, -80],
          },
          labelLine: {
            lineStyle: {
              color: '#A0A0A0',
            },
            length: 15,
            length2: 100,
          },
        },
      },
      data: [],
    },
  ],
  color: ['#aa2b11', '#d05237', '#dc8f7d', '#f9c6ba'],
}
// 产品类别分析
let productCategory = ref()
let productCategoryEcharts = ref()
let productCategoryEchartsOption = {
  grid: {
    top: 'center',
    left: 0,
    right: 0,
    containLabel: true,
  },
  xAxis: {
    type: 'value',
    splitLine: { show: false },
    axisLabel: { show: false },
    axisTick: { show: false },
    axisLine: { show: false },
  },
  yAxis: [
    {
      type: 'category',
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: 'black',
        fontSize: 18,
        textStyle: {
          color: '#2C2C2C',
        },
        fontFamily: 'AlibabaPuHuiTi-2-55-Regular',
      },
      data: ['标准产品'],
      inverse: true,
    },
    {
      type: 'category',
      axisTick: { show: false },
      axisLine: { show: false },
      axisLabel: {
        color: 'black',
        textStyle: {
          color: '#2C2C2C',
        },
        fontSize: 18,
        fontFamily: 'AlibabaPuHuiTi-2-55-Regular',
      },
      data: ['非标准产品'],
      inverse: true,
    },
  ],
  series: [
    {
      name: '条',
      type: 'bar',
      barWidth: 50,
      data: [80],
      barCategoryGap: 20,
      label: {
        show: true,
        formatter: (data) => {
          if (productCategory.value) {
            return (
              (productCategory.value[0].zb * 100).toFixed(0) +
              '%' +
              '\n\n\n\n' +
              data.value +
              '亿元'
            )
          }
          return data.value + '\n\n\n\n'
        },
        fontSize: 18,
        color: '#2C2C2C',
      },
      itemStyle: {
        normal: {
          color: '#d66646',
        },
      },
      zlevel: 1,
    },
    {
      name: '进度条背景',
      type: 'bar',
      barGap: '-100%',
      barWidth: 50,
      data: [100],
      color: '#8d8e8e',
      label: {
        show: true,
        formatter: (data) => {
          if (productCategory.value) {
            return (
              (productCategory.value[1].zb * 100).toFixed(0) +
              '%' +
              '\n\n\n\n' +
              data.value +
              '亿元'
            )
          }
          return data.value + '\n\n\n\n'
        },
        fontSize: 18,
        color: '#2C2C2C',
        offset: [200, 0],
      },
    },
  ],
}

const getChartsDate = async () => {
  const { data: data1 } = await getFinancingPeriodApi()
  const list1 = []
  data1.forEach((item) => {
    list1.push({
      value: item.zb,
      name: item.qj,
    })
  })
  termEchartsOption.series[0].data = list1

  const { data: data2 } = await getFinancingProductApi()
  productCategory.value = data2
  productCategoryEchartsOption.series[0].data = [
    (data2[0].zxs / 10000).toFixed(0),
  ]
  productCategoryEchartsOption.series[1].data = [
    (data2[1].zxs / 10000).toFixed(0),
  ]
  echarts
    .init(productCategoryEcharts.value)
    .setOption(productCategoryEchartsOption)
  echarts.init(termEcharts.value).setOption(termEchartsOption)
}

const getWeek = () => {
  var datas = dayjs().day()
  var week = ['日', '一', '二', '三', '四', '五', '六']
  return '星期' + week[datas]
}

const render = () => {
  getCardList()
  getChartsDate()
  getTableDate()
}
render()
</script>

<style lang="less" scoped>
.page {
  position: relative;
  width: 100vw;
  height: 100vh;
  background-color: #f6f7fa;
  .leftTime {
    position: absolute;
    top: 7%;
    left: 3%;
    font-family: 'AlibabaPuHuiTi-2-35-Thin';
    font-size: 18px;
    color: rgba(44, 44, 44, 1);
  }
  .rightTime {
    font-family: 'AlibabaPuHuiTi-2-55-Regular';
    position: absolute;
    top: 7%;
    right: 3%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    font-size: 18px;
    color: rgba(61, 61, 61, 1);
    gap: 10px;
  }
  .card {
    width: 100%;
    height: 17.5%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    .item {
      width: 23.7%;
      height: 100%;
      background-image: url('@/assets/img/头部卡片背景.png');
      background-size: 100% 100%;
      padding-top: 0.5%;
      padding-left: 1.1%;
      padding-right: 3%;
      margin-top: 1%;
      .title {
        font-family: 'AlibabaPuHuiTi-2-95-ExtraBold';
        font-weight: normal;
        font-size: 20px;
        color: #2c2c2c;
        line-height: 34px;
        margin-bottom: 10px;
      }
      .number {
        font-family: '优设标题黑';
        font-weight: 400;
        font-size: 20px;
        color: #2c2c2c;
      }
      .unit {
        font-family: '优设标题黑';
        font-weight: 400;
        font-size: 16px;
        color: #a7a7a7;
      }
      .compare {
        display: flex;
        align-items: center;
        justify-content: center;
        .percent {
          font-family: '优设标题黑';
          font-size: 20px;
          font-weight: 600;
          color: #b95440;
          margin: 0 3px;
        }
      }
      .compareText {
        font-family: 'Adobe黑体StdR';
        font-size: 14px;
        color: #858383;
      }
      .bottom {
        margin-top: 2%;
        display: flex;
        justify-content: space-between;
      }
    }
  }
  .content {
    width: 100%;
    height: 68%;
  }
  .table {
    width: 62%;
    background-color: #fff;
    margin-top: 1.5%;
    margin-left: 1%;
    padding: 20px;
  }
  .rightContent {
    width: 35%;
    margin-left: 1%;
    margin-top: 1.5%;
  }
  .term,
  .productCategory {
    height: 50%;
    background-color: #fff;
    padding: 20px;
    display: flex;
    flex-direction: column;
    .productCategoryEcharts,
    .termEcharts {
      flex: 1;
    }
  }
  .productCategory {
    height: 46%;
    margin-top: 3%;
  }
}
.title {
  font-family: '优设标题黑';
  font-weight: 400;
  font-size: 24px;
  color: #2c2c2c;
  display: flex;
}
img {
  width: 100%;
  font-size: 0;
}
:deep(.groupSelect .el-select__wrapper) {
  box-shadow: none;
}
:deep(.groupSelect .el-select__placeholder) {
  text-align: center;
  font-family: 'AlibabaPuHuiTi-2-55-Regular';
  font-weight: normal;
  color: #000;
  font-size: 18px;
  font-style: italic;
  font-weight: 600;
}
.hightCenter {
  display: flex;
  align-items: center;
}
</style>
