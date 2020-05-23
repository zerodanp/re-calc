<template>
  <div class="q-pa-md cardholder row items-start q-gutter-md">
    <q-card class="card" flat bordered>

      <q-card-section>
        <div class="text-h5 q-mt-sm q-mb-xs">{{calc.titel}}</div>
        <div class="text-caption text-grey">
          {{calc.titel}}
        </div>
      </q-card-section>

      <q-card-section>
        <div class="row">
          <div class="col-6">Kaufpreis: {{calc.kaufpreis | separatedNumber}}</div>
          <div class="col-6">Mietflaeche: {{calc.mietflaeche}}</div>
          <div class="col-6">Nettokaltmiete: {{calc.kaltmiete_y | separatedNumber}}</div>
          <div class="col-6">Euro / qm: {{(calc.kaltmiete_y/calc.mietflaeche)/12 | fixedDcimal}}</div>
          <div class="col-6">Bruttokaufpreis: {{calc.kaufpreis * (1 + getParams.id.Const_KNK) | separatedNumber}} </div>
          <div class="col-6">Kaufnebenkosten: {{calc.kaufpreis * getParams.id.Const_KNK | separatedNumber}}</div>
          <div class="col-12">Nicht umlegbare Kosten: {{calc.kaltmiete_y * getParams.id.Const_ANUM | separatedNumber}}</div>
        </div>
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: ['calc','key'],
    data () {
      return {
        expanded: false,
        lorem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
    },
    computed: {
      ...mapGetters('storeParam',['getParams'])
    },
    filters: {
    separatedNumber(value){
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    },
    fixedDcimal(value){
      return value.toFixed(2);
    }
  }
}
</script>

<style scoped>
  .card{
    width: 100%;
    min-height: 100px;
  }
  .cardholder{
     min-width: 450px;
  }
</style>