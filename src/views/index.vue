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
        <div class="top">
          <div class="title">{{ item.name }}</div>
          <div style="display: flex; justify-content: space-between">
            <div>
              <span class="number">
                {{ formatNumber(item.rzye) }}
              </span>
              <span v-if="index !== 3" class="unit">亿</span>
              <span v-else class="unit">%</span>
            </div>
            <div class="compare">
              <span>
                <span class="compareText">与年初比</span>
                <span v-if="item.yncb > 0" class="percent">
                  {{ formatNumber(item.yncb) + '%' }}
                </span>
                <span v-else class="percent" style="color: #1e8e00">
                  {{ formatNumber(item.yncb) + '%' }}
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
            <div class="compareText">本年度新增</div>
            <span v-if="index === 3" class="number">
              {{ formatNumber(item.bnd) + '%' }}
            </span>
            <span v-else class="number">
              {{ formatNumber(item.bnd) }}
            </span>
            <span v-if="index !== 3" class="unit">亿</span>
          </div>
          <div>
            <div class="compareText">上年末</div>
            <span v-if="index === 3" class="number">
              {{ formatNumber(item.snm) + '%' }}
            </span>
            <span v-else class="number">
              {{ formatNumber(item.snm) }}
            </span>
            <span v-if="index !== 3" class="unit">亿</span>
          </div>
          <div>
            <div class="compareText">去年同期</div>
            <div style="display: flex; align-items: center">
              <div v-if="item.qntq > 0" class="number" style="color: #b95440">
                {{ formatNumber(item.qntq) + '%' }}
              </div>
              <div v-else class="number" style="color: #1e8e00">
                {{ formatNumber(item.qntq) + '%' }}
              </div>
              <el-icon
                v-if="item.qntq > 0"
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
        <div style="font-size: 0">
          <img src="@/assets/img/主体融资情况装饰.png" />
        </div>
        <div
          v-loading="loadingMainFinancing"
          style="
            padding: 1%;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            flex: 1;
          "
        >
          <div>
            <div class="hightCenter netIncrease">
              <i class="iconfont icon-zhuangshizuo"></i>
              净增量
            </div>
            <!-- 净增量 -->
            <div class="netIncrease-data">
              <div
                v-for="(item, index) in netIncreaseDate"
                :key="index"
                class="netIncrease-data-box hightCenter"
                :style="formatNetIncreaseBoxStyle(index)"
              >
                <!-- 此div用于设置环形进度条渐变 -->
                <div style="width: 0px; height: 0px">
                  <svg width="100%" height="100%">
                    <defs>
                      <linearGradient
                        id="write"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="0%"
                      >
                        <stop
                          offset="0%"
                          style="stop-color: rgba(214, 102, 70, 1)"
                          stop-opacity="0.8"
                        ></stop>
                        <stop
                          offset="100%"
                          style="stop-color: rgba(230, 212, 207, 1)"
                          stop-opacity="1"
                        ></stop>
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <!-- 环形进度条 -->
                <div
                  v-if="index === 3"
                  class="netIncrease-data-box-implementationRate"
                >
                  <el-progress
                    :stroke-width="10"
                    :percentage="formatNumber(item.value * 100) * 1"
                    type="circle"
                  >
                    <span
                      class="netIncrease-data-box-implementationRate-circle"
                    >
                      {{ (item.value * 100).toFixed(0) }}
                    </span>
                    <span>%</span>
                  </el-progress>
                  <div class="test">执行率</div>
                </div>
                <!-- 柱状进度条 -->
                <span v-if="index !== 3" class="netIncrease-data-box-name">
                  {{ item.name }}
                </span>
                <div v-if="index !== 3" style="flex: 1">
                  <el-progress
                    color="#D66646"
                    :stroke-width="15"
                    :percentage="formatNetIncreasePercentage(index)"
                  >
                    <span class="netIncrease-data-box-progressText">
                      {{ formatNumber(item.value / 10000) }}
                    </span>
                    <span class="netIncrease-data-box-progressUint">亿元</span>
                  </el-progress>
                </div>
              </div>
            </div>
          </div>
          <!-- 利率 -->
          <div style="display: flex">
            <!-- 平均利率 -->
            <div style="width: 50%" class="averageInterestRate">
              <span class="averageInterestRate-title hightCenter netIncrease">
                <i class="iconfont icon-zhuangshizuo"></i>
                平均利率
              </span>
              <div
                v-for="(item, index) in [
                  { name: '目标', value: averageInterestRate?.mb },
                  {
                    name: '执行',
                    value: averageInterestRate?.zx * 100,
                  },
                ]"
                :key="index"
                class="averageInterestRate-box"
              >
                <div class="averageInterestRate-box-title">{{ item.name }}</div>
                <div>
                  <span
                    style="font-family: '优设标题黑'; font-size: 36px"
                    :style="{ color: index === 1 ? '#D66646' : '#8d8e8e' }"
                  >
                    {{ formatNumber(item.value) }}
                  </span>
                  <text>%</text>
                </div>
              </div>
            </div>
            <!-- 负债率 -->
            <div style="width: 50%" class="averageInterestRate">
              <span class="averageInterestRate-title hightCenter netIncrease">
                <i class="iconfont icon-zhuangshizuo"></i>
                负债率
              </span>
              <div
                v-for="(item, index) in [
                  { name: '目标', value: liabilitiesRateDate?.mb },
                  {
                    name: '执行',
                    value: liabilitiesRateDate?.zx * 100,
                  },
                ]"
                :key="index"
                class="averageInterestRate-box"
              >
                <div class="averageInterestRate-box-title">{{ item.name }}</div>
                <div>
                  <span
                    style="font-family: '优设标题黑'; font-size: 36px"
                    :style="{ color: index === 1 ? '#D66646' : '#8d8e8e' }"
                  >
                    {{ formatNumber(item.value) }}
                  </span>
                  <text>%</text>
                </div>
              </div>
            </div>
          </div>
          <!-- 余额 -->
          <div class="balance">
            <!-- 融资余额 -->
            <div
              v-for="(item, index) in balance"
              :key="index"
              class="financing"
            >
              <div class="icon">
                <i v-if="index === 0" class="iconfont icon-yue"></i>
                <i v-if="index === 1" class="iconfont icon-zichan1"></i>
              </div>
              <div class="text">{{ item.name }}</div>
              <div style="margin-left: 5%; flex: 1">
                <div class="number">
                  <div>{{ formatNumber(item.thisYearNumber / 10000) }}</div>
                  <div style="font-size: 16px; margin-left: 2%">亿元</div>
                </div>
                <div class="proportion">
                  <div style="font-size: 16px; color: #3d3d3d">较去年同期</div>
                  <div
                    v-if="item.proportion > 0"
                    style="
                      font-size: 20px;
                      color: #d66646;
                      margin-left: 20px;
                      font-family: '优设标题黑';
                    "
                  >
                    {{ formatNumber(item.proportion) }}%
                  </div>
                  <div
                    v-if="item.proportion < 0"
                    style="
                      font-size: 20px;
                      color: #1e8e00;
                      margin-left: 20px;
                      font-family: '优设标题黑';
                    "
                  >
                    {{ formatNumber(item.proportion) }}%
                  </div>
                  <div
                    v-if="item.proportion === 0"
                    style="
                      font-size: 20px;
                      margin-left: 20px;
                      font-family: '优设标题黑';
                    "
                  >
                    {{ formatNumber(item.proportion) }}%
                  </div>
                  <el-icon
                    v-if="item.proportion > 0"
                    size="16"
                    color="#b95440"
                    style="vertical-align: -10%; margin-left: 5px"
                  >
                    <Top />
                  </el-icon>
                  <el-icon
                    v-if="item.proportion < 0"
                    size="16"
                    color="#1E8E00"
                    style="vertical-align: -10%; margin-left: 5px"
                  >
                    <Bottom />
                  </el-icon>
                </div>
              </div>
            </div>
          </div>
        </div>
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
  getAverageRateApi,
  getLiabilitiesRateApi,
  getDebtApi,
  getQntqDebtApi,
  getCjyeApi,
  getQnCjyeApi,
  getCompanyApi,
} from '@/api/index'
import type { transform } from 'typescript'
const year = ref(dayjs().year().toString())
const month = ref((dayjs().month() + 1).toString())
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
  temp1.rzye = data1.rzye / 10000
  temp1.yncb = ((data1.rzye - data1.snd) / data1.snd) * 100
  temp1.bnd = data1.bnd / 10000
  temp1.snm = data1.snd / 10000
  temp1.qntq = ((data1.rzye - data1.qntq) / data1.qntq) * 100
  cardList.value.push(temp1)

  const { data: data2 } = await getInterbankBalanceApi()
  const temp2 = {}
  temp2.name = '拆借余额'
  temp2.rzye = data2.cjye / 10000
  temp2.yncb = ((data2.cjye - data2.snm) / data2.snm) * 100
  temp2.bnd = data2.bnd / 10000
  temp2.snm = data2.snm / 10000
  temp2.qntq = ((data2.cjye - data2.qntq) / data2.qntq) * 100
  cardList.value.push(temp2)

  cardList.value.push({
    name: '总余额',
    rzye: temp1.rzye * 1 + temp2.rzye * 1,
    yncb: (+temp1.yncb * 1 + temp2.yncb * 1) / 2,
    bnd: +temp1.bnd * 1 + temp2.bnd * 1,
    snm: +temp1.snm * 1 + temp2.snm * 1,
    qntq: (+temp1.qntq * 1 + temp2.qntq * 1) / 2,
  })

  const { data: data3 } = await getFinancingRateApi()
  const temp3 = {}
  temp3.name = '融资平均利率'
  temp3.rzye = data3.rate * 100
  temp3.yncb = ((data3.rate - data3.snm) / data3.snm) * 100
  temp3.bnd = data3.bnd * 100
  temp3.snm = data3.snm * 100
  temp3.qntq = ((data3.rate - data3.qntq) / data3.qntq) * 100
  cardList.value.push(temp3)

  loadingCard.value = false
}
// 集团
const group = ref('嘉秀本级')

// 集团列表
const groupSelect = ref([])

const getCompany = async () => {
  groupSelect.value = []
  const { data } = await getCompanyApi()
  data.forEach((item) => {
    groupSelect.value.push({
      value: item.name,
      label: item.name,
    })
  })
}
getCompany()
// 更改集团
const changeGroup = () => {
  getMainFinancingDate()
}

const loadingMainFinancing = ref(false)
// 净增量
const netIncreaseDate = ref([])
// 平均利率
const averageInterestRate = ref([])
// 负债率
const liabilitiesRateDate = ref([])
// 融资余额和拆借余额数据
const balance = ref([])
// 获取主体融资情况数据
const getMainFinancingDate = async () => {
  loadingMainFinancing.value = true
  // 净增量
  netIncreaseDate.value = []
  const { data } = await getNetIncreaseApi(group.value)

  netIncreaseDate.value.push({
    name: '目标',
    value: data.jzlmb,
  })
  netIncreaseDate.value.push({
    name: '体内',
    value: data.txn,
  })
  netIncreaseDate.value.push({
    name: '执行',
    value: data.zx,
  })
  netIncreaseDate.value.push({
    name: '执行率',
    value: data.zxl,
  })
  netIncreaseDate.value.push({
    name: '体外',
    value: data.txw,
  })
  // 平均利率
  const { data: data2 } = await getAverageRateApi(group.value)
  averageInterestRate.value = data2
  // 负债率
  const { data: data3 } = await getLiabilitiesRateApi(group.value)
  liabilitiesRateDate.value = data3

  // 融资余额
  balance.value = []
  const { data: data4 } = await getDebtApi(group.value)
  const { data: data5 } = await getQntqDebtApi(group.value)
  const temp = {
    name: '融资余额',
    thisYearNumber: 0,
    lastYear: 0,
    proportion: 0,
  }
  data4.forEach((item) => {
    temp.thisYearNumber += item.rzye
  })
  data5.forEach((item) => {
    temp.lastYear += item.rzye
  })
  if (temp.thisYearNumber !== 0 && temp.lastYear !== 0) {
    temp.proportion =
      ((temp.thisYearNumber - temp.lastYear) / temp.lastYear) * 100
  }

  balance.value.push(temp)

  const { data: data6 } = await getCjyeApi(group.value)
  const { data: data7 } = await getQnCjyeApi(group.value)
  const temp2 = {
    name: '拆借余额',
    thisYearNumber: 0,
    lastYear: 0,
    proportion: 0,
  }
  data6.forEach((item) => {
    temp2.thisYearNumber += item.cjye
  })
  data7.forEach((item) => {
    temp2.lastYear += item.cjye
  })

  if (temp2.thisYearNumber !== 0 && temp2.lastYear !== 0) {
    temp2.proportion =
      ((temp2.thisYearNumber - temp2.lastYear) / temp2.lastYear) * 100
  }

  balance.value.push(temp2)

  loadingMainFinancing.value = false
}

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
            fontFamily: 'AlibabaPuHuiTi-2-55-Regular',
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
    top: '60',
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
      barWidth: 30,
      data: [80],
      barCategoryGap: 20,
      label: {
        show: true,
        align: 'right',
        formatter: (data) => {
          if (productCategory.value) {
            return (productCategory.value[0].zb * 100).toFixed(2) + '%'
          }
          return data.value.toFixed(2)
        },
        fontFamily: 'AlibabaPuHuiTi-2-55-Regular',
        fontSize: 18,
        color: '#fff',
      },
      itemStyle: {
        normal: {
          color: '#d66646',
          borderRadius: [10, 10, 10, 10],
        },
      },
      zlevel: 1,
    },
    {
      name: '进度条背景',
      type: 'bar',
      barGap: '-100%',
      barWidth: 30,
      data: [100],
      label: {
        show: true,
        formatter: (data) => {
          if (productCategory.value) {
            return (productCategory.value[1].zb * 100).toFixed(2) + '%'
          }
          return data.value.toFixed(2)
        },
        fontFamily: 'AlibabaPuHuiTi-2-55-Regular',
        fontSize: 18,
        color: '#fff',
        offset: [140, 0],
      },
      itemStyle: {
        color: '#fff',
        borderRadius: [10, 10, 10, 10],
      },
    },
    {
      name: '',
      type: 'bar',
      barWidth: 30,
      data: [80],
      color: '#8d8e8e',
      label: {
        show: true,
        align: 'right',
        formatter: (data) => {
          if (productCategory.value) {
            return '\n\n' + data.value.toFixed(2) + '亿元'
          }
          return data.value.toFixed(2)
        },
        fontFamily: 'AlibabaPuHuiTi-2-55-Regular',
        fontSize: 18,
        color: '#2C2C2C',
        offset: [10, 18],
      },
      itemStyle: {
        color: '#ffe7e1',
        borderRadius: [10, 10, 10, 10],
      },
    },
    {
      name: '',
      type: 'bar',
      barWidth: 30,
      data: [100],
      color: '#8d8e8e',
      label: {
        show: true,
        formatter: (data) => {
          if (productCategory.value) {
            return '\n\n' + data.value.toFixed(2) + '亿元'
          }
          return data.value.toFixed(2)
        },
        fontFamily: 'AlibabaPuHuiTi-2-55-Regular',
        fontSize: 18,
        color: '#2C2C2C',
        offset: [150, 18],
      },
      itemStyle: {
        color: '#b2b2b2',
        borderRadius: [10, 10, 10, 10],
        borderWidth: 2,
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
  productCategoryEchartsOption.series[0].data = [data2[0].zxs / 10000]
  productCategoryEchartsOption.series[1].data = [data2[1].zxs / 10000]
  productCategoryEchartsOption.series[2].data = [data2[0].zxs / 10000]
  productCategoryEchartsOption.series[3].data = [data2[1].zxs / 10000]
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

const formatNetIncreaseBoxStyle = (index) => {
  return {
    'margin-top': index === 0 || index === 1 || index === 3 ? '0%' : '5%',
    width: index === 3 ? '10%' : '40%',
    position: index === 3 ? 'absolute' : '',
    left: index === 3 ? '50%' : '',
    transform: index === 3 ? 'translate(-50%,-3%)' : '',
  }
}

const formatNetIncreasePercentage = (index) => {
  if (netIncreaseDate.value[index].value === 0) {
    return 0
  }
  if (netIncreaseDate.value[0].value === 0) {
    return 100
  }

  if (index === 0) {
    return 100
  } else if (index === 1 || index === 4) {
    return (
      (netIncreaseDate.value[index].value / netIncreaseDate.value[2].value) *
      100
    )
  } else {
    return (
      (netIncreaseDate.value[index].value / netIncreaseDate.value[0].value) *
      100
    )
  }
}

// 格式化数字
const formatNumber = (number) => {
  if (number && number !== 0) {
    return number.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,')
  } else {
    return number
  }
}

const render = () => {
  getCardList()
  getChartsDate()
  getMainFinancingDate()
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
      }
      .number {
        font-family: '优设标题黑';
        font-weight: 400;
        font-size: 36px;
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
      .top {
        height: 50%;
      }
      .bottom {
        height: 50%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        .number {
          font-size: 24px;
        }
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
    display: flex;
    flex-direction: column;
  }
  .rightContent {
    width: 35%;
    margin-left: 1%;
    margin-top: 1.5%;
    display: flex;
    flex-direction: column;
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
    margin-top: 20px;
    flex: 1;
    display: flex;
    .productCategoryEcharts {
      box-sizing: border-box;
      width: 90%;
      margin-left: 5%;
    }
  }
  .netIncrease {
    font-weight: 600;
    color: #3d3d3d;
    font-style: italic;
    i {
      font-size: 30px;
      margin-right: 10px;
    }
    &-data {
      position: relative;
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      margin-top: 20px;
      &-box {
        width: 40%;
        justify-content: space-around;
        &-name {
          margin-right: 3%;
          font-size: 18px;
          font-family: 'AlibabaPuHuiTi-2-55-Regular';
        }
        &-implementationRate {
          display: flex;
          flex-direction: column;
          align-items: center;
          font-size: 16px;
          color: #3d3d3d;
          font-family: 'AlibabaPuHuiTi-2-55-Regular';
          &-circle {
            font-size: 26px;
            color: #000000;
          }
          .test {
            margin-top: 10px;
            font-size: 18px;
          }
          .number {
            font-family: '优设标题黑';
            font-size: 18px;
            color: #3d3d3d;
          }
        }
        &-progressText {
          font-family: '优设标题黑';
          font-weight: 400;
          font-size: 20px;
          color: #d66646;
        }
        &-progressUint {
          font-family: 'AlibabaPuHuiTi-2-55-Regular';
          font-size: 16px;
          margin-left: 10px;
        }
      }
    }
  }
  .averageInterestRate {
    &-title {
      margin-right: 10px;
    }
    &-box {
      display: inline-block;
      width: 50%;
      margin-top: 2%;
      padding: 0 6%;
      &-title {
        font-family: 'AlibabaPuHuiTi-2-55-Regular';
        font-size: 18px;
        color: #3d3d3d;
        font-style: italic;
      }
    }
  }
  .balance {
    display: flex;
    font-family: 'AlibabaPuHuiTi-2-55-Regular';
    font-weight: 400;
    color: #3d3d3d;
    .financing {
      width: 50%;
      display: flex;
      align-items: center;
      .icon {
        width: 100px;
        height: 100px;
        border-radius: 50%;
        background-color: #ffe7e1;
        display: flex;
        align-items: center;
        justify-content: center;
        i {
          font-size: 60px;
        }
      }
      .text {
        font-family: 'AlibabaPuHuiTi-2-55-Regular';
        font-weight: 400;
        font-size: 24px;
        color: #3d3d3d;
        margin-left: 20px;
      }
      .number {
        display: flex;
        font-family: '优设标题黑';
        font-weight: 400;
        font-size: 36px;
        color: #2c2c2c;
      }
      .proportion {
        font-size: 36px;
        color: #3d3d3d;
      }
      .number,
      .proportion {
        display: flex;
        align-items: center;
      }
    }
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
:deep(.el-progress--circle .el-progress-circle) {
  width: 80px !important;
  height: 80px !important;
}
:deep(.el-progress-circle svg > path:nth-child(2)) {
  //.circle是环形el-progress取的类名 write是svg的id
  stroke: url(#write);
}
</style>
