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

// 获取目标
export const getNetIncreaseApi = (company) => {
  return request.get('/getNetIncrease', { company })
}

// 获取平均利率
export const getAverageRateApi = (company) => {
  return request.get('/getAverageRate')
}

// 获取负债率
export const getLiabilitiesRateApi = (company) => {
  return request.get('/getLiabilitiesRate')
}

// 获取当前融资余额
export const getDebtApi = (company) => {
  return request.get('/getDebt')
}

// 获取去年融资余额
export const getQntqDebtApi = (company) => {
  return request.get('/getQntqDebt')
}

// 获取当前拆借余额
export const getCjyeApi = (company) => {
  return request.get('/getCjye')
}

// 获取去年拆借余额
export const getQnCjyeApi = (company) => {
  return request.get('/getQnCjye')
}
