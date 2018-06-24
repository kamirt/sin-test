import Vue from 'vue'
import Vuex from 'vuex'
import hall from './modules/hall'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

export default new Vuex.Store({
  modules: {
    hall
  },
  strict: debug,
})
