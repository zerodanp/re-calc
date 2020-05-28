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
    <q-form
      @submit.prevent="onSubmit"
      @reset="onReset">
      <q-card-section>
        <div class="row">
          <div class="col-12 col-md q-px-md">
            <q-input
            outlined
            v-model="calcToSubmit.titel"
            label="Titel"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Bitte einen Titel eingeben']"
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
          </div>
          <div class="col-12 col-md q-px-md">
            <q-input
            outlined
            :value.number="calcToSubmit.mietflaeche"
            @input="(newVal) => {calcToSubmit.mietflaeche = newVal;calculatePrice() }"
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
            @input="(newVal) => {calcToSubmit.kaltmiete_y = newVal;calculatePrice() }"
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
            @input="(newVal) => {calcToSubmit.kaltmiete_qm = newVal;calculatePrice() }"
            label="Quadratmetermiete"
            lazy-rules
            :rules="[ val => val >= 0 || 'Bitte Quadratmetermiete eingeben']"
            />     
          </div>
        </div>
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
      disable: false
    }
  },
  computed: {
  },
  methods: {
    ...mapActions('storeCalculation', ['updateCalculation']),

    calculatePrice () {
      if (this.model == 'yearly'){
        this.calcToSubmit.kaltmiete_qm = ((this.calcToSubmit.kaltmiete_y / 12) / this.calcToSubmit.mietflaeche).toFixed(2) 
      }
      else {
        this.calcToSubmit.kaltmiete_y = this.calcToSubmit.mietflaeche * this.calcToSubmit.kaltmiete_qm * 12
      }
    },
    onSubmit () {
      this.$q.notify({
        color: 'green-4',
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
