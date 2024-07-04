import { ref } from 'vue'
import { defineStore } from 'pinia'
import dayjs from 'dayjs'
export const useStore = defineStore('store', () => {
  return {
    year: dayjs().year().toString(),
    month: dayjs().month().toString(),
  }
})
