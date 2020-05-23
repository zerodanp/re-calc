<template>
  <q-page class="q-pa-md">
    <p>Calculator Page</p>
    <div class="q-pa-md row items-stretch">
      <calculation-card 
        v-for="(calc, key) in getCalculations"
        :key="key"
        :calc="calc" />
    </div>
    <div 
    class="relative-position text-center q-mb-lg">

      <q-btn 
      color="primary" 
      icon="add" 
      label="Calculation" />

    </div>
    
  </q-page>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: {
    ...mapGetters('storeCalculation', ['getCalculations'])
    },
    components:{
      'calculation-card' : require('components/CalculationCard.vue').default
    }
  }
</script>
