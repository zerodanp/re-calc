<template>
  <q-card>
    <q-card-section class="row">
      <div class="text-h6">Edit</div>
      <q-space />
      <q-btn
        flat
        round
        v-close-popup
        icon="close" />
    </q-card-section>
    <q-card-section>
      <q-tabs
      v-model="tab"
      animated
      class="bg-primary text-white rounded-borders"
      active-color="text-grey-4"
      indicator-color="bg-secondary"
      align="justify"
      >
        <q-tab name="calcs" label="Berechnung" />
        <q-tab name="params" label="Parameter" />
      </q-tabs>
    </q-card-section>
    <q-form
      @submit.prevent="onSubmit"
      @reset="onReset">
      <q-tab-panels 
      v-model="tab"
      swipeable 
      animated>
        <q-tab-panel 
        name="calcs">
          <q-card-section>
            <div class="row">
              <div class="col-12 col-md q-px-md">
                <q-input
                outlined
                v-model="calcToSubmit.titel"
                label="Titel"
                lazy-rules
                :rules="[ val => val && val.length > 0 && val.length <= 25 || 'Bitte einen Titel mit max. 25 Zeichen eingeben']"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md q-px-md">
                <q-input
                outlined
                v-model.number="calcToSubmit.kaufpreis"
                label="Kaufpreis"
                lazy-rules
                :rules="[ val => val >= 0 || 'Bitte Kaufpreis eingeben']"
                />
                <!--<q-field
                  outlined
                  v-model="calcToSubmit.kaufpreis"
                  label="Kaufpreis"
                >
                  <template v-slot:control="{ id, floatingLabel, value, emitValue }">
                    <Money :id="id" class="q-field__input text-right" :value="value" @input="emitValue" v-bind="moneyFormatForComponent" v-show="floatingLabel" />
                  </template>
                </q-field> -->
              </div>
              <div class="col-12 col-md q-px-md">
                <q-input
                outlined
                :value.number="calcToSubmit.mietflaeche"
                @input="(newVal) => {calcToSubmit.mietflaeche = Number(newVal);calculatePrice() }"
                label="Mietfläche"
                lazy-rules
                :rules="[ val => val >= 0 || 'Please type something']"
                />     
              </div>
            </div> 
            <div class="row q-pb-md">
              <div class="col-12 q-px-md">
                <q-btn-toggle
                  v-model="model"
                  toggle-color="primary"
                  spread
                  no-caps
                  :options="[
                    {label: 'Jahresmiete', value: 'yearly'},
                    {label: 'Quadratmeter', value: 'qm'}
                  ]"
                />
              </div>
            </div> 
            <div class="row">
              <div class="col-12 col-md q-px-md">
                <q-input
                outlined
                :disable="disable"
                :value.number="calcToSubmit.kaltmiete_y"
                @input="(newVal) => {calcToSubmit.kaltmiete_y = Number(newVal);calculatePrice() }"
                label="Jahreskaltmiete"
                lazy-rules
                :rules="[ val => val >= 0 || 'Bitte Jahresmiete eingeben']"
                />     
              </div>
              <div class="col-12 col-md q-px-md">
                <q-input
                outlined
                :disable="!disable"
                :value.number="calcToSubmit.kaltmiete_qm"
                @input="(newVal) => {calcToSubmit.kaltmiete_qm = Number(newVal);calculatePrice() }"
                label="Quadratmetermiete"
                lazy-rules
                :rules="[ val => val >= 0 || 'Bitte Quadratmetermiete eingeben']"
                />     
              </div>
            </div>
          </q-card-section>
        </q-tab-panel>
        <q-tab-panel name="params">
          <q-card-section>
            <div class="row">
              <div class="col-12 col-md q-px-md">
                <q-input
                outlined
                v-model.number="calcToSubmit.params.Const_KNK"
                label="Kaufnebenkosten"
                lazy-rules
                :rules="[ val => val >= 0 || 'Bitte einen Titel eingeben']"
                />
              </div>
              <div class="col-12 col-md q-px-md">
                <q-input
                outlined
                v-model.number="calcToSubmit.params.Const_EK"
                label="Eigenkapital"
                lazy-rules
                :rules="[ val => val >= 0 || 'Bitte Kaufpreis eingeben']"
                />
              </div>
            </div>
            <div class="row">
              <div class="col-12 col-md q-px-md">
                <q-input
                outlined
                v-model.number="calcToSubmit.params.Const_ANUM"
                label="Nichtumlegbare Kosten"
                lazy-rules
                :rules="[ val => val >= 0 || 'Bitte Kaufpreis eingeben']"
                />
              </div>
            </div> 
            <div class="row">
              <div class="col-12 col-md q-px-md">
                <q-input
                outlined
                v-model.number="calcToSubmit.params.Const_AZ"
                label="Abzug anfänglicher Zinsen"
                lazy-rules
                :rules="[ val => val => val >= 0  || 'Bitte einen Titel eingeben']"
                />
              </div>
              <div class="col-12 col-md q-px-md">
                <q-input
                outlined
                v-model.number="calcToSubmit.params.Const_AAT"
                label="Abzug anfängliche Tilgung"
                lazy-rules
                :rules="[ val => val >= 0 || 'Bitte Kaufpreis eingeben']"
                />
              </div>
            </div> 
          </q-card-section>
        </q-tab-panel>
      </q-tab-panels>
      <q-card-section>
        <div class="row">
          <q-btn label="Reset" type="reset" color="primary" flat/>
          <q-space></q-space>
          <q-btn label="Save" type="submit" color="primary"/>
        </div>
      </q-card-section>
    </q-form>
  </q-card>
</template>

<script>
import {mapActions} from 'vuex'
import {Money} from 'v-money'

export default {
  props: ['calc', 'id'],

  data () {
    return {
      calcToSubmit: {
        titel: null,
        kaufpreis: 0,
        mietflaeche: 0,
        kaltmiete_y: 0,
        kaltmiete_qm: 0,
        params: {
          Const_KNK: 0,
          Const_ANUM: 0,
          Const_EK: 0,
          Const_AZ: 0,
          Const_AAT: 0
        }
      },
      model: 'yearly',
      disable: false,
      tab: 'calcs',
      moneyFormatForComponent: {
          decimal: ',',
          thousands: '.',
          prefix: '€ ',
          suffix: '',
          precision: 2,
          masked: true /* doesn't work with directive */
        }
    }
  },
  components: {Money},
  computed: {
  },
  filters: {
    toCurrency(value) {
      if (typeof value !== "number") {
        return value;
    }
    var formatter = new Intl.NumberFormat('de-DE', {
        style: 'currency',
        currency: 'EUR',
        minimumFractionDigits: 0
    });
    return formatter.format(value);
    }
  },
  methods: {
    ...mapActions('storeCalculation', ['updateCalculation']),

    calculatePrice () {
      if (this.model == 'yearly'){
        this.calcToSubmit.kaltmiete_qm = Number(((this.calcToSubmit.kaltmiete_y / 12) / this.calcToSubmit.mietflaeche).toFixed(2)) 
      }
      else {
        this.calcToSubmit.kaltmiete_y = Number(this.calcToSubmit.mietflaeche * this.calcToSubmit.kaltmiete_qm * 12)
      }
    },
    onSubmit () {
      this.$q.notify({
        color: 'positive',
        position: 'top',
        textColor: 'white',
        icon: 'cloud_done',
        message: 'Submitted'
      })
      this.submitCalculationToStore()
      this.$emit('close')
    },
    onReset () {
      this.calcToSubmit = Object.assign({}, this.calc)
    },
    submitCalculationToStore() {
      this.updateCalculation({
          id: this.id,
          updates: this.calcToSubmit
        })
    },
  },
  mounted() {
    this.calcToSubmit = Object.assign({}, this.calc)
  },
  updated: function() {
    if (this.model == 'yearly'){
      this.disable = false;
    }
    else {
      this.disable = true;
    }
  }
}
</script>

<style>

</style>
