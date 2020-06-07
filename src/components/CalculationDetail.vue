<template>
  <div style="min-width:450px">
    <q-card>
      <q-card-section class="row">
        <div class="text-h6">{{calc.titel}}</div>
        <q-space></q-space>
        <q-btn
        flat
        round
        v-close-popup
        icon="close" />
      </q-card-section>

      <q-card-actions>
            <div class="col text-center text-bold">Kennzahlen</div>
            <q-space />
            <q-btn
              color="grey"
              round
              flat
              dense
              :icon="expanded_first ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded_first = !expanded_first"
            />
        </q-card-actions> 

        <q-slide-transition>
           <div v-show="expanded_first">
              <q-separator inset />
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
              :info="(calc.kaltmiete_y - (calc.kaltmiete_y * (calc.params.Const_ANUM/100))) / (calc.kaufpreis * (1 + (calc.params.Const_KNK/100)))"
              :filter="'percentFormatDE'">ROI</modal-info>
            </div>
            <div class="col-12 col-md-12">
              <modal-info 
              :info="computedLiquidYear / ((calc.params.Const_EK/100)*calc.kaufpreis)"
              :filter="'percentFormatDE'">liq. EK-Rendite</modal-info> 
            </div>
            <div class="col-12 col-md-12">
              <modal-info
              :info="computedLiquidYear"
              :filter="'toCurrency'">liq. Jahresüberschuss</modal-info>
            </div>
          </div>
        </q-card-section>
          </div>
        </q-slide-transition>
       
        <q-card-actions>
            <div class="col text-center text-bold">Kaufpreis und Kaufnebenkosten</div>
            <q-space />
            <q-btn
              color="grey"
              round
              flat
              dense
              :icon="expanded_second ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded_second = !expanded_second"
            />
        </q-card-actions> 
        <q-slide-transition>
           <div v-show="expanded_second">
              <q-separator inset />
              <q-card-section>
          <div class="row">
            <div class="col-12 col-md-6">
              <modal-info
              :info="calc.kaufpreis"
              :filter="'toCurrency'">Kaufpreis</modal-info>
            </div>
            <div class="col-12 col-md-6">
              <modal-info 
              :info="calc.kaufpreis * (calc.params.Const_KNK/100)"
              :filter="'toCurrency'">KNK</modal-info> 
            </div>
            <div class="col-12 col-md-6">
              <modal-info
              :info="calc.kaufpreis * (1 + (calc.params.Const_KNK/100))"
              :filter="'toCurrency'">Bruttokaufpreis</modal-info>
            </div>
            <div class="col-12 col-md-6">
              <modal-info 
              :info="(calc.kaufpreis * (1 + (calc.params.Const_KNK/100))) * (calc.params.Const_EK/100)"
              :filter="'toCurrency'">Eigenkapital</modal-info> 
            </div>
          </div>
        </q-card-section>
          </div>
        </q-slide-transition>

        <q-card-actions>
            <div class="col text-center text-bold">Miete und Bewirtschaftung</div>
            <q-space />
            <q-btn
              color="grey"
              round
              flat
              dense
              :icon="expanded_last ? 'keyboard_arrow_up' : 'keyboard_arrow_down'"
              @click="expanded_last = !expanded_last"
            />
          </q-card-actions>


        <q-slide-transition>
          <div v-show="expanded_last">
            <q-separator inset />
            <q-card-section>
            <div class="row">
              <div class="col-12 col-md-6">
                <modal-info
                :info="calc.kaltmiete_y"
                :filter="'toCurrency'">Kaltmiete</modal-info>
              </div>
              <div class="col-12 col-md-6">
                <modal-info 
                :info="calc.kaltmiete_y * (calc.params.Const_ANUM/100)"
                :filter="'toCurrency'">NU Kosten</modal-info> 
              </div>
              <div class="col-12 col-md-6">
                <modal-info
                :info="(((this.$props.calc.kaufpreis * (1 + (this.$props.calc.params.Const_KNK/100))) - (this.$props.calc.kaufpreis * (this.$props.calc.params.Const_EK/100))) * (this.$props.calc.params.Const_AZ/100))"
                :filter="'toCurrency'">Zinsen</modal-info>
              </div>
              <div class="col-12 col-md-6">
                <modal-info 
                :info="(((this.$props.calc.kaufpreis * (1 + (this.$props.calc.params.Const_KNK/100))) - (this.$props.calc.kaufpreis * (this.$props.calc.params.Const_EK/100))) * (this.$props.calc.params.Const_AAT/100))"
                :filter="'toCurrency'">Tilgung</modal-info> 
              </div>
            </div>
          </q-card-section>
        </div>
      </q-slide-transition>
    </q-card>
  </div>
</template>

<script>
export default {
    props: ['calc', 'id'],

    data() {
      return{
        expanded_first: true,
        expanded_second: false,
        expanded_last: false
      }
    },
    computed: {
      computedLiquidYear: function () {
      // `this` points to the vm instance
      return this.$props.calc.kaltmiete_y 
        - (this.$props.calc.kaltmiete_y * (this.$props.calc.params.Const_ANUM/100)) 
        - (((this.$props.calc.kaufpreis * (1 + (this.$props.calc.params.Const_KNK/100))) - (this.$props.calc.kaufpreis * (this.$props.calc.params.Const_EK/100))) * (this.$props.calc.params.Const_AZ/100)) 
        - (((this.$props.calc.kaufpreis * (1 + (this.$props.calc.params.Const_KNK/100))) - (this.$props.calc.kaufpreis * (this.$props.calc.params.Const_EK/100))) * (this.$props.calc.params.Const_AAT/100))
    }
    },

    components: {
    'modal-info' : require('components/ModalInfo.vue').default
  }

}
</script>

<style>

</style>