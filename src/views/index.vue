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
      >
        <el-option
          v-for="item in yearList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-select
        v-model="mouth"
        placeholder="Select"
        style="width: 135px"
        clearable
      >
        <el-option
          v-for="item in mouthList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </div>
    <div class="card">
      <div v-for="(item, index) in 4" :key="index" class="item">
        <div style="display: flex; justify-content: space-between">
          <div>
            <div class="title">融资余额</div>
            <div style="display: flex">
              <div class="number">3,120</div>
              <div class="unit">万</div>
            </div>
          </div>
          <div class="compare">
            <div class="compareText">与年初比</div>
            <div class="percent">2.37%</div>
            <el-icon size="20" color="#1E8E00" style="margin-bottom: 5px">
              <Top />
            </el-icon>
          </div>
        </div>
        <div class="bottom">
          <div>
            <div class="compareText">融资余额</div>
            <div style="display: flex">
              <div class="number" style="font-size: 24px">
                {{ (3120).toLocaleString() }}
              </div>
            </div>
          </div>
          <div>
            <div class="compareText">上年末</div>
            <div style="display: flex">
              <div class="number" style="font-size: 24px">
                {{ (3120).toLocaleString() }}
              </div>
            </div>
          </div>
          <div>
            <div class="compareText">去年同期</div>
            <div style="display: flex">
              <div class="number" style="font-size: 24px">
                {{ '-5.0' + '%' }}
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
        <el-table
          :header-cell-style="headerCellStyle"
          :row-style="rowStyle"
          :cell-style="cellStyle"
          :data="tableData"
          style="width: 100%"
          ail
        >
          <el-table-column prop="date" label="" width="120" align="center" />
          <el-table-column label="目标" width="180" align="center">
            <template #default="{ row }">
              <div>{{ row.target.toLocaleString() }}</div>
            </template>
          </el-table-column>

          <el-table-column label="本年度" align="center">
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

          <el-table-column
            prop="implementationRate"
            label="执行率"
            align="center"
          />
          <el-table-column prop="address" label="上年末" align="center">
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
            prop="sameTimeLastYear"
            label="去年同期"
            align="center"
          />
        </el-table>
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
import { ref, onMounted } from 'vue'

const year = ref('')
const mouth = ref('')

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
  {
    value: '2020',
    label: '2020',
  },
]

const mouthList = [
  {
    value: 'Option1',
    label: 'Option1',
  },
  {
    value: 'Option2',
    label: 'Option2',
  },
  {
    value: 'Option3',
    label: 'Option3',
  },
  {
    value: 'Option4',
    label: 'Option4',
  },
  {
    value: 'Option5',
    label: 'Option5',
  },
]

const cardList = ref([])

const group = ref()

const groupSelect = ref([
  {
    value: '梅里集团',
    label: '梅里集团',
  },
  {
    value: 'CSS',
    label: 'CSS',
  },
  {
    value: 'JavaScript',
    label: 'JavaScript',
  },
])

const tableData = [
  {
    date: '融资余额',
    target: 5500100,
    thisYear: {
      inVivo: 500000,
      inVitro: 410100,
    },
    implementationRate: '81.01%',
    LastYear: {
      inVivo: 500000,
      inVitro: 410100,
    },
    sameTimeLastYear: '5.0%',
  },
  {
    date: '拆借余额',
    target: 5500100,
    thisYear: {
      inVivo: 500000,
      inVitro: 410100,
    },
    implementationRate: '81.01%',
    LastYear: {
      inVivo: 500000,
      inVitro: 410100,
    },
    sameTimeLastYear: '5.0%',
  },
  {
    date: '总余额',
    target: 5500100,
    thisYear: {
      inVivo: 500000,
      inVitro: 410100,
    },
    implementationRate: '81.01%',
    LastYear: {
      inVivo: 500000,
      inVitro: 410100,
    },
    sameTimeLastYear: '5.0%',
  },

  {
    date: '平均利率',
    target: 5500100,
    thisYear: {
      inVivo: 500000,
      inVitro: 410100,
    },
    implementationRate: '81.01%',
    LastYear: {
      inVivo: 500000,
      inVitro: 410100,
    },
    sameTimeLastYear: '5.0%',
  },

  {
    date: '负债率',
    target: 5500100,
    thisYear: {
      inVivo: 500000,
      inVitro: 410100,
    },
    implementationRate: '81.01%',
    LastYear: {
      inVivo: 500000,
      inVitro: 410100,
    },
    sameTimeLastYear: '5.0%',
  },
]

// 表头样式
const headerCellStyle = () => {
  return {
    fontFamily: 'AlibabaPuHuiTi-2-55-Regular',
    color: '#2C2C2C',
    fontSize: '16px',
  }
}

const cellStyle = ({ row, columnIndex, column }) => {
  if (columnIndex === 0) {
    console.log(column)
    return {
      color: '#000',
    }
  }
}

const rowStyle = ({ row, rowIndex }) => {
  const style = {
    fontFamily: 'AlibabaPuHuiTi-2-55-Regular',
    color: '#2C2C2C',
    fontSize: '16px',
  }
  if (rowIndex % 2 === 0) {
    return {
      background: '#fbf0ed',
      ...style,
    }
  } else {
    return {
      background: '#ffffff',
      ...style,
    }
  }
}

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
      data: [
        { value: 1048, name: 'Search Engine' },
        { value: 735, name: 'Direct' },
        { value: 580, name: 'Email' },
        { value: 484, name: 'Union Ads' },
        { value: 300, name: 'Video Ads' },
      ],
    },
  ],
  color: ['#aa2b11', '#d05237', '#dc8f7d', '#f9c6ba'],
}
// 产品类别分析
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
        position: 'top', // 在柱状图的上方显示文字
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
        position: 'top', // 在柱状图的上方显示文字
        fontSize: 18,
        color: '#2C2C2C',
        offset: [240, 0],
      },
    },
  ],
}
const getWeek = () => {
  var datas = dayjs().day()
  var week = ['日', '一', '二', '三', '四', '五', '六']
  return '星期' + week[datas]
}
onMounted(() => {
  echarts
    .init(productCategoryEcharts.value)
    .setOption(productCategoryEchartsOption)
  echarts.init(termEcharts.value).setOption(termEchartsOption)
})
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
        font-size: 36px;
        color: #2c2c2c;
        line-height: 24px;
      }
      .unit {
        font-family: '优设标题黑';
        font-weight: 400;
        font-size: 16px;
        color: #a7a7a7;
        line-height: 30px;
      }
      .compare {
        display: flex;
        align-items: end;
        justify-content: center;
        line-height: 30px;
        .percent {
          font-family: '优设标题黑';
          font-size: 24px;
          font-weight: 600;
          color: #b95440;
          margin: 0 8px;
          display: flex;
          align-items: end;
          line-height: 30px;
        }
      }
      .compareText {
        font-family: 'Adobe黑体StdR';
        font-size: 14px;
        color: #858383;
        line-height: 30px;
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
</style>
