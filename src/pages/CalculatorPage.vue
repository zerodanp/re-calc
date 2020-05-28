<template>
  <q-page class="row no-wrap">
    <div class="col q-ma-md">
      <div class="column full-height">
        <q-scroll-area class="col q-pa-sm">
          <calculation-card
            v-for="(calc, key) in getCalculations"
            :key="key"
            :id="key"
            :calc="calc" />
        </q-scroll-area>
  
        <div
        class="relative-position text-center q-mb-lg">
          <q-btn
          @click="showAddCalculation = !showAddCalculation"
          color="primary"
          icon="add"
          label="Calculation" />
        </div>
      </div>
    </div>

    <q-dialog v-model="showAddCalculation" persistent>
      <add-calculation @close="showAddCalculation = false"/>
    </q-dialog>

  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      showAddCalculation: false
    }
  },
  computed: {
    ...mapGetters('storeCalculation', ['getCalculations'])
  },
  components: {
    'calculation-card': require('components/CalculationCard.vue').default,
    'add-calculation' : require('components/AddCalculation.vue').default
  }
}
</script>

<style>
  .q-scroll-area-calc {
    display: flex;
  }
</style>
