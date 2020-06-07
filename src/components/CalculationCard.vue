<template>
  <div>
    <transition
      appear
      enter-active-class="animated zoomIn"
      leave-active-class="animated zoomOut absolute-top"
    >
      <div class="q-pa-md cardholder row items-start q-gutter-md">
        <q-card 
        flat 
        bordered 
        >
          <q-card-section
          @click="showCalculationDetail = true"
          clickable
          class="cursor-pointer">
            <div class="row">
              <div class="text-h5 q-mt-sm q-mb-xs">{{calc.titel}}</div>
              <q-space></q-space>
              <q-btn flat round color="primary" icon="edit" @click.stop="showEditCalculation = !showEditCalculation" />
              <q-btn flat round color="primary" icon="delete" @click.stop="promptToDelete" />
            </div>
          </q-card-section>
    
          <q-card-section>
            <div class="row">
              <div class="col-12">
                <modal-info
                :info="calc.kaufpreis / calc.kaltmiete_y"
                :filter="'numberFormatDE'">Kaufpreisfaktor</modal-info>
              </div>
              <div class="col-12 col-md-6">
                <modal-info 
                :info="calc.kaltmiete_y / calc.kaufpreis"
                :filter="'percentFormatDE'">Rohrendite</modal-info> 
              </div>
              <div class="col-12 col-md-6">
                <modal-info
                :info="(calc.kaltmiete_y - (calc.kaltmiete_y * calc.params.Const_ANUM)) / (calc.kaufpreis * (1 + calc.params.Const_KNK))"
                :filter="'percentFormatDE'">ROI</modal-info>
              </div>
              <div class="col-12 col-md-6">
                <modal-info 
                :info="computedLiquidYear / (calc.params.Const_EK*calc.kaufpreis)"
                :filter="'percentFormatDE'">liq. EK-Rendite</modal-info> 
              </div>
              <div class="col-12 col-md-6">
                <modal-info
                :info="computedLiquidYear"
                :filter="'toCurrency'">liq. Jahresüberschuss</modal-info>
              </div>
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
    <q-dialog
    v-model="showCalculationDetail">
      <detail-calculation
      @close="showCalculationDetail = false"
      :id="id"
      :calc="calc">
      </detail-calculation>
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
      showCalculationDetail: false,
      //liquid_year: this.$props.calc.kaltmiete_y - (this.$props.calc.kaltmiete_y * this.$props.calc.params.Const_ANUM) - (this.$props.calc.kaufpreis * this.$props.calc.params.Const_AZ) - (this.$props.calc.kaufpreis * this.$props.calc.params.Const_AAT),
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
   computedLiquidYear: function () {
      // `this` points to the vm instance
      return this.$props.calc.kaltmiete_y 
        - (this.$props.calc.kaltmiete_y * this.$props.calc.params.Const_ANUM) 
        - (((this.$props.calc.kaufpreis * (1 + this.$props.calc.params.Const_KNK)) - (this.$props.calc.kaufpreis * this.$props.calc.params.Const_EK )) * this.$props.calc.params.Const_AZ) 
        - (((this.$props.calc.kaufpreis * (1 + this.$props.calc.params.Const_KNK)) - (this.$props.calc.kaufpreis * this.$props.calc.params.Const_EK )) * this.$props.calc.params.Const_AAT)
    }
  },
  filters: {
    separatedNumber (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    fixedDecimal (value) {
      return value.toFixed(2)
    },
    roundDecimal(value) {
        let temp = value * 100
        temp = Math.round(temp)
        return (temp/100)
    },
    numberFormatDE(num) {
      return (
        num
          .toFixed(2) // always two decimal digits
          .replace('.', ',') // replace decimal point character with ,
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      ) // use . as a separator
    },
    percentFormatDE(num) {
      num = num*100
      return (
        num
          .toFixed(2) // always two decimal digits
          .replace('.', ',') // replace decimal point character with ,
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' %'
      ) // use . as a separator
    },
    toCurrency(num) {
      return (
        num
          .toFixed(2) // always two decimal digits
          .replace('.', ',') // replace decimal point character with ,
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' €'
      ) // use . as a separator
    }
  },
  components: {
    'edit-calculation' : require('components/EditCalculation.vue').default,
    'modal-info' : require('components/ModalInfo.vue').default,
    'detail-calculation' : require('components/CalculationDetail.vue').default
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
