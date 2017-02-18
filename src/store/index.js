/**
 * Created by ron on 2017/2/16.
 */
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default new Vuex.Store({
  state: {
    selectType: ALL,
    onlyContent: true,
    types:{
      POSITIVE : 0,
      NEGATIVE : 1,
      ALL : 2
    }
  },
  mutations: {
    changeType (state, type) {
      state.selectType = type
    },
    changeContent (state){
      state.onlyContent = !state.onlyContent
    }
  },
})
