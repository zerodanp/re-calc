import Vue from 'vue'
import { uid, Notify, LocalStorage } from 'quasar'

// speichert daten objekte, arrays, etc...
const state = {
  params: {
    Const_KNK: 0.13,
    Const_ANUM: 0.25,
    Const_EK: 0.25,
    Const_AZ: 0.02,
    Const_AAT: 0.01
  },
  calcs: {
    'ID0': {
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
    } 
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
  deleteCalculation(state, id) {
    Vue.delete(state.calcs, id)
  },
  setCalcs(state, tempcalcs) {
    Object.assign(state.calcs, tempcalcs)
  }
}

// asynchron -> Serverabfragen
const actions = {
  addCalculation({ commit, dispatch }, calculation) {
    let calcId = uid()
    Object.assign(calculation, {params: state.params})
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
  getCalcs({ commit }){
    console.log('getCalcs action')
    try{
      let tempcalc = LocalStorage.getItem('calculations')
      if (tempcalc) {
        commit('setCalcs', tempcalc)
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
