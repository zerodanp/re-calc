<template>
  <q-page class="row no-wrap">
    <div class="col q-ma-md">
      <div class="column full-height">
      <p>Calculator Page</p>

      <q-scroll-area class="col q-pa-sm">
        <calculation-card
          v-for="(calc, id) in getCalculations"
          :key="id"
          :calc="calc" />
      </q-scroll-area>
  
      <div
      class="relative-position text-center q-mb-lg">
  
        <q-btn
        color="primary"
        icon="add"
        label="Calculation" />
  
      </div>
    </div>
    </div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('storeCalculation', ['getCalculations'])
  },
  components: {
    'calculation-card': require('components/CalculationCard.vue').default
  }
}
</script>

<style>
  .q-scroll-area-calc {
    display: flex;
  }
</style>
