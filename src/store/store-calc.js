import Vue from 'vue'
import { uid, Notify, LocalStorage } from 'quasar'

// speichert daten objekte, arrays, etc...
const state = {
  calcs: {
    'ID0': {
      titel: 'Some Real Estate Object',
      kaufpreis: 120000,
      mietflaeche: 30,
      kaltmiete_y: 5400,
      kaltmiete_qm: 15
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
  }
}

// asynchron -> Serverabfragen
const actions = {
  addCalculation({ commit }, calculation) {
	  let calcId = uid()
	  let payload = {
	  	id: calcId,
	  	calculation: calculation
    }
  //dispatch('fsAddMachine',payload)
	commit('addCalculation', payload)
  },
  updateCalculation({ commit }, payload) {
    commit('updateCalculation', payload)
  },
  deleteCalculation({ commit }, calcID){
    commit('deleteCalculation', calcID)
  }
}

const getters = {
  getCalculations: (state) => {
    return state.calcs
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
