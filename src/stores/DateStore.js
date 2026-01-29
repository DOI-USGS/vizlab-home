import { defineStore } from "pinia"

export const useDateStore = defineStore("DateStore", () => {
  const toTimestamp = (value = '') => {
    const date = new Date(value)
    return date instanceof Date && !Number.isNaN(date) ? date.getTime() : 0
  }

  return {
    toTimestamp
  }
})
