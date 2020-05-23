import { ActionTree } from 'vuex'
import { StoreInterface } from '../index'
import { CalcStateInterface } from './state'

const actions: ActionTree<CalcStateInterface, StoreInterface> = {
  someAction (/* context */) {
    // your code
  }
}

export default actions
