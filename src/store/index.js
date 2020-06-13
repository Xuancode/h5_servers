import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    deviceWidth: 0,
    clickOther: false  
  },
  mutations: {
    setDeviceWidth(state, payload) {
      state.deviceWidth = payload.w
    },
    setClickOther(state) {
      state.clickOther = !state.clickOther
    }
  },
  actions: {
  },
  modules: {
  }
})
