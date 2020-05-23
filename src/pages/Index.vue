<template>
  <q-page class="q-pa-md">
   <p>Index Page</p>
    <div
      v-for="(calc) in getCalculations"
      :key="calc.id">
      {{calc.kaufpreis / calc.kaltmiete_y}}
      /
      {{calc.key}}</div>
  </q-page>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  computed: {
    ...mapGetters('storeCalculation', ['getCalculations'])
  }
}
</script>
