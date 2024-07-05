import request from '@/utils/axios'

// 获取融资余额
export const getFinancingBalanceApi = () => {
  return request.get('/getFinancingBalance')
}

// 获取拆借余额
export const getInterbankBalanceApi = () => {
  return request.get('/getInterbankBalance')
}

// 获取平均利率
export const getFinancingRateApi = () => {
  return request.get('/getFinancingRate')
}

// 获取净增量
export const getNetIncreaseApi = (company) => {
  return request.get('/getNetIncrease', { company })
}

// 获取平均利率
export const getAverageRateApi = (company) => {
  return request.get('/getAverageRate', { company })
}
// 获取负债率
export const getLiabilitiesRateApi = (company) => {
  return request.get('/getLiabilitiesRate', { company })
}

// 本年融资余额
export const getDebtApi = (company) => {
  return request.get('/getDebt', { company })
}
// 去年融资余额
export const getQntqDebtApi = (company) => {
  return request.get('/getQntqDebt', { company })
}
// 本年拆借余额
export const getCjyeApi = (company) => {
  return request.get('/getCjye', { company })
}
// 去年拆借余额
export const getQnCjyeApi = (company) => {
  return request.get('/getQnCjye', { company })
}
// 获取融资期限分析
export const getFinancingPeriodApi = () => {
  return request.get('/getFinancingPeriod')
}
// 获取产品类别分析
export const getFinancingProductApi = () => {
  return request.get('/getFinancingProduct')
}

// 获取集团
export const getCompanyApi = () => {
  return request.get('/getCompany')
}
