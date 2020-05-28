<template>
  <div>
    <transition
      appear
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut absolute-top"
    >
      <div class="q-pa-md cardholder row items-start q-gutter-md">
        <q-card class="card" flat bordered>
          <q-card-section>
            <div class="row">
              <div class="text-h5 q-mt-sm q-mb-xs">{{calc.titel}}</div>
              <q-space></q-space>
              <q-btn flat round color="primary" icon="edit" @click.stop="showEditCalculation = !showEditCalculation" />
              <q-btn flat round color="primary" icon="delete" @click.stop="promptToDelete" />
            </div>
          </q-card-section>
    
          <q-card-section>
            <div class="row">
              <div class="col-6">Kaufpreis: {{calc.kaufpreis }}</div>
              <div class="col-6">Mietflaeche: {{calc.mietflaeche}}</div>
              <div class="col-6">Nettokaltmiete: {{calc.kaltmiete_y }}</div>
              <div class="col-6">Euro / qm: {{ calc.kaltmiete_qm }}</div>
              <div class="col-6">Bruttokaufpreis: {{calc.kaufpreis * (1 + calc.params.Const_KNK) }} </div>
              <div class="col-6">Kaufnebenkosten: {{calc.kaufpreis * calc.params.Const_KNK }}</div>
              <div class="col-12">Nicht umlegbare Kosten: {{calc.kaltmiete_y * calc.params.Const_ANUM }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>      
    </transition>
    <q-dialog 
    v-model="showEditCalculation"
    persistent>
      <edit-calculation 
      @close="showEditCalculation = false"
      :id="id"
      :calc="calc"/>
    </q-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  props: ['calc', 'id'],
  data () {
    return {
      showEditCalculation: false,
      displayCalc: {

      }
    }
  },
  methods: {
    ...mapActions('storeCalculation', ['deleteCalculation']),

    promptToDelete() {
      this.$q.dialog({
        title: 'Confirm',
        message: 'Really delete?',
        ok: {
          color: 'positive',
          push: true
        },
        cancel: {
          color: 'negative'
        },
        persistent: true
      }).onOk(() => {
        console.log(this.$props.id)
        this.deleteCalculation(this.$props.id)
      })
    } 
  },
  computed: {
    ...mapGetters('storeParam', ['getParams']),
  },
  filters: {
    separatedNumber (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    fixedDcimal (value) {
      return value.toFixed(2)
    }
  },
  components: {
    'edit-calculation' : require('components/EditCalculation.vue').default
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
