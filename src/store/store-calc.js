import Vue from 'vue'
import { uid, Notify, LocalStorage } from 'quasar'

// speichert daten objekte, arrays, etc...
const state = {
  defaultParams: {
    Const_KNK: 13,
    Const_ANUM: 25,
    Const_EK: 25,
    Const_AZ: 2,
    Const_AAT: 1
  },
  params: {
    Const_KNK: 13,
    Const_ANUM: 25,
    Const_EK: 25,
    Const_AZ: 2,
    Const_AAT: 1
  },
  calcs: {
    /* 'ID0': {
      titel: 'Some Real Estate Object',
      kaufpreis: 120000,
      mietflaeche: 30,
      kaltmiete_y: 5400,
      kaltmiete_qm: 15,
      params: {
        Const_KNK: 0.02,
        Const_ANUM: 0.25,
        Const_EK: 0.25,
        Const_AZ: 0.02,
        Const_AAT: 0.01
      }
    }  */
  }
}

// nicht aysnchron
const mutations = {
  addCalculation(state, payload) {
    Vue.set(state.calcs, payload.id, payload.calculation)
  },
  updateCalculation(state, payload) {
    Object.assign(state.calcs[payload.id], payload.updates)
  },
  updateParams(state, payload) {
    Object.assign(state.params,payload.updates)
  },
  deleteCalculation(state, id) {
    Vue.delete(state.calcs, id)
  },
  setCalcs(state, tempCalcs) {
    Object.assign(state.calcs, tempCalcs)
  },
  setParams(state, tempParams) {
    Object.assign(state.params, tempParams)
  }
}

// asynchron -> Serverabfragen
const actions = {
  addCalculation({ commit, dispatch }, calculation) {
    let calcId = uid()
    if(state.params){
      Object.assign(calculation, {params: state.params})
    }
    else {
      Object.assign(calculation, {params: state.defaultParams})
    }

	  let payload = {
	  	id: calcId,
	  	calculation: calculation
    }
    //dispatch('fsAddMachine',payload)
    commit('addCalculation', payload)
    dispatch('saveCalcs')
  },
  updateCalculation({ commit, dispatch }, payload) {
    commit('updateCalculation', payload)
    dispatch('saveCalcs')
  },
  updateParams({ commit }, payload) {
    commit('updateParams', payload)
  },
  deleteCalculation({ commit, dispatch }, calcID){
    commit('deleteCalculation', calcID)
    dispatch('saveCalcs')
  },
  saveCalcs({ state }) {
    try {
      LocalStorage.set('calculations', state.calcs)
    }
    catch (e) {
      console.log(e)
    }
  },
  saveParams({ state }) {
    try {
      LocalStorage.set('parameters', state.params)
    }
    catch (e) {
      console.log(e)
    }
  },
  getCalcs({ commit }) {
    try {
      let tempCalcs = LocalStorage.getItem('calculations')
      if (tempCalcs) {
        commit('setCalcs', tempCalcs)
      }
    }
    catch (e) {
      console.log(e)
    }
  },
  getParams({ commit }) {
    try {
      let tempParams = LocalStorage.getItem('parameters')
      if(tempParams){
        commit('setParams', tempParams)
      }
    }
    catch (e) {
      console.log(e)
    }
  }
}

const getters = {
  getCalculations: (state) => {
    return state.calcs
  },
  getParamState: (state) => {
    return state.params
  },
  getDefaultParamState: (state) => {
    return state.defaultParams
  },
  getCount: (state) => {
    console.log('getCount:' + Object.keys(state.calcs).length)
    return (Object.keys(state.calcs).length  >= 5 )
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
