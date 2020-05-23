import { GetterTree } from 'vuex'
import { StoreInterface } from '../index'
import { CalcStateInterface } from './state'

const getters: GetterTree<CalcStateInterface, StoreInterface> = {
  someAction (/* context */) {
    // your code
  }
}

export default getters
