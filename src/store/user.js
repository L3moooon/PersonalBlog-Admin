import { defineStore } from "pinia";

export const useUserStore = defineStore('User', {
  state: () => {
    return {
      name: '',
    }
  },
  actions: {
    saveInfo(data) {
      this.name = data.name
    }
  },
})