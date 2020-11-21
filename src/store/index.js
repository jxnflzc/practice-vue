import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

const store = new Vuex.Store({

  state: {
    // 存储token
    Authorization: sessionStorage['token'] ? sessionStorage['token'] : ''
  },

  mutations: {
    // 修改token，并将token存入localStorage
    changeLogin (state, token) {
      state.Authorization = token
      sessionStorage['token'] = token
    }
  }
})

export default store
