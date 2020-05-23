//speichert daten objekte, arrays, etc...
const state = {
    calcs: {
        'ID0': {
            titel: 'Some Real Estate Object',
            kaufpreis: 120000,
            mietflaeche: 30,
            kaltmiete_y: 5400,
        },
        'ID1':{
            titel: 'Some Real Estate Object',
            kaufpreis: 140000,
            mietflaeche: 120,
            kaltmiete_y: 16500,
        },
        'ID2':{
            titel: 'Some Real Estate Object',
            kaufpreis: 250000,
            mietflaeche: 260,
            kaltmiete_y: 42500,
        }
    }
}

//nicht aysnchron
const mutations = {

}

// asynchron -> Serverabfragen
const actions = {

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