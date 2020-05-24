// import { LocalStorage } from 'quasar'

// speichert daten objekte, arrays, etc...
const state = {
  params: {
    Const_KNK: 0.13,
    Const_ANUM: 0.25,
    Const_EK: 0.25,
    Const_AZ: 0.02,
    Const_AAT: 0.01
  }
}

// nicht aysnchron
const mutations = {

}

// asynchron -> Serverabfragen
const actions = {

}

const getters = {
  getParams: (state) => {
    return state.params
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
