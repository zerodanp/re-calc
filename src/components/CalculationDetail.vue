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
              :info="(calc.kaltmiete_y - (calc.kaltmiete_y * calc.params.Const_ANUM)) / (calc.kaufpreis * (1 + calc.params.Const_KNK))"
              :filter="'percentFormatDE'">ROI</modal-info>
            </div>
            <div class="col-12 col-md-12">
              <modal-info 
              :info="computedLiquidYear / (calc.params.Const_EK*calc.kaufpreis)"
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
              :info="calc.kaufpreis * calc.params.Const_KNK"
              :filter="'toCurrency'">KNK</modal-info> 
            </div>
            <div class="col-12 col-md-6">
              <modal-info
              :info="calc.kaufpreis * (1 + calc.params.Const_KNK)"
              :filter="'toCurrency'">Bruttokaufpreis</modal-info>
            </div>
            <div class="col-12 col-md-6">
              <modal-info 
              :info="(calc.kaufpreis * (1 + calc.params.Const_KNK)) * calc.params.Const_EK"
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
                :info="calc.kaltmiete_y * calc.params.Const_ANUM"
                :filter="'toCurrency'">NU Kosten</modal-info> 
              </div>
              <div class="col-12 col-md-6">
                <modal-info
                :info="(((this.$props.calc.kaufpreis * (1 + this.$props.calc.params.Const_KNK)) - (this.$props.calc.kaufpreis * this.$props.calc.params.Const_EK )) * this.$props.calc.params.Const_AZ)"
                :filter="'toCurrency'">Zinsen</modal-info>
              </div>
              <div class="col-12 col-md-6">
                <modal-info 
                :info="(((this.$props.calc.kaufpreis * (1 + this.$props.calc.params.Const_KNK)) - (this.$props.calc.kaufpreis * this.$props.calc.params.Const_EK )) * this.$props.calc.params.Const_AAT)"
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
          - (this.$props.calc.kaltmiete_y * this.$props.calc.params.Const_ANUM) 
          - (((this.$props.calc.kaufpreis * (1 + this.$props.calc.params.Const_KNK)) - (this.$props.calc.kaufpreis * this.$props.calc.params.Const_EK )) * this.$props.calc.params.Const_AZ) 
          - (((this.$props.calc.kaufpreis * (1 + this.$props.calc.params.Const_KNK)) - (this.$props.calc.kaufpreis * this.$props.calc.params.Const_EK )) * this.$props.calc.params.Const_AAT)
      }
    },

    components: {
    'modal-info' : require('components/ModalInfo.vue').default
  }

}
</script>

<style>

</style>