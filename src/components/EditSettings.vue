<template>
  
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="col q-pa-md"
    >
    <div>
      <div class="col q-ma-md">
        <div class="text-center text-h6">
            Kaufnebenkosten
        </div>
        <div class="row q-mt-md">
          <div class="col-2">
            <div class="cursor-pointer">
              <q-chip color="secondary">
                {{paramsToSubmit.Const_KNK}} %
              </q-chip>
              <q-popup-edit v-model="paramsToSubmit.Const_KNK">
                <q-input v-model="paramsToSubmit.Const_KNK"/>
              </q-popup-edit>
            </div>
          </div>
          <div class="col-10">
            <q-slider
            :value="paramsToSubmit.Const_KNK"
            @change="val => { paramsToSubmit.Const_KNK = val }"
            :min="0"
            :max="100"
            :step="1"
            color="secondary"
            label-text-color="black"
            label
            />
          </div>
        </div>
      </div>
      <div class="col q-ma-md">
        <div class="text-center text-h6">
          Eigenkapital
        </div>
        <div class="row q-mt-md">
          <div class="col-2">
            <div class="cursor-pointer">
              <q-chip color="secondary">
                {{paramsToSubmit.Const_EK}} %
              </q-chip>
              <q-popup-edit v-model="paramsToSubmit.Const_EK">
                <q-input v-model="paramsToSubmit.Const_EK"/>
              </q-popup-edit>
            </div>
          </div>
          <div class="col-10">
            <q-slider
            :value="paramsToSubmit.Const_EK"
            @change="val => { paramsToSubmit.Const_EK = val }"
            :min="0"
            :max="100"
            :step="1"
            color="secondary"
            label-text-color="black"
            label
            />
          </div>
        </div>
      </div>
      <div class="col q-ma-md">
        <div class="text-center text-h6">
          Nichtumlegbare Kosten
        </div>
        <div class="row q-mt-md">
          <div class="col-2">
            <div class="cursor-pointer">
              <q-chip color="secondary">
                {{paramsToSubmit.Const_ANUM}} %
              </q-chip>
              <q-popup-edit v-model="paramsToSubmit.Const_ANUM">
                <q-input v-model="paramsToSubmit.Const_ANUM"/>
              </q-popup-edit>
            </div>
          </div>
          <div class="col-10">
            <q-slider
            :value="paramsToSubmit.Const_ANUM"
            @change="val => { paramsToSubmit.Const_ANUM = val }"
            :min="0"
            :max="100"
            :step="1"
            color="secondary"
            label-text-color="black"
            label
            />
          </div>
        </div>
      </div>
      <div class="col q-ma-md">
        <div class="text-center text-h6">
          Abzug anfänglicher Zinsen
        </div>
        <div class="row q-mt-md">
          <div class="col-2">
            <div class="cursor-pointer">
              <q-chip color="secondary">
                {{paramsToSubmit.Const_AZ}} %
              </q-chip>
              <q-popup-edit v-model="paramsToSubmit.Const_AZ">
                <q-input v-model="paramsToSubmit.Const_AZ"/>
              </q-popup-edit>
            </div>
          </div>
          <div class="col-10">
            <q-slider
            :value="paramsToSubmit.Const_AZ"
            @change="val => { paramsToSubmit.Const_AZ = val }"
            :min="0"
            :max="100"
            :step="1"
            color="secondary"
            label-text-color="black"
            label
            />
          </div>
        </div>
      </div>
      <div class="col q-ma-md">
        <div class="text-center text-h6">
          Abzug anfängliche Tilgung
        </div>
        <div class="row q-mt-md">
          <div class="col-2">
            <div class="cursor-pointer">
              <q-chip color="secondary">
                {{paramsToSubmit.Const_AAT}} %
              </q-chip>
              <q-popup-edit v-model="paramsToSubmit.Const_AAT">
                <q-input v-model="paramsToSubmit.Const_AAT"/>
              </q-popup-edit>
            </div>
          </div>
          <div class="col-10">
            <q-slider
            :value="paramsToSubmit.Const_AAT"
            @change="val => { paramsToSubmit.Const_AAT = val }"
            :min="0"
            :max="100"
            :step="1"
            color="secondary"
            label-text-color="black"
            label
            />
          </div>
        </div>
      </div>
    </div>
    <div class="row q-pa-lg absolute-bottom">
      <q-btn label="Zurücksetzen" type="reset" color="primary"/>
      <q-space />
      <q-btn label="Werkseinstellung" @click="checkDefault" outline color="primary"/>
      <q-space />
      <q-btn label="Speichern" type="submit" color="primary"/>
    </div>
  </q-form>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
      paramsToSubmit: {
        Const_KNK: 13,
        Const_ANUM: 25,
        Const_EK: 25,
        Const_AZ: 2,
        Const_AAT: 1
      },
    }
  },
  computed: {
    ...mapGetters('storeCalculation', ['getParamState','getDefaultParamState'])
  },
  methods: {
    ...mapActions('storeCalculation', ['updateParams','setDefaultParams']),

    onSubmit () {
      this.$q.notify({
        color: 'positive',
        position: 'top',
        textColor: 'white',
        icon: 'done',
        message: 'Settings saved.'
      })
      this.submitParamsToStore()
    },
    onReset () {
      this.paramsToSubmit = Object.assign({}, this.getParamState)
    },
    submitParamsToStore() {
      this.updateParams({
          updates: this.paramsToSubmit
        })
    },
    checkDefault(){
      this.paramsToSubmit = Object.assign({}, this.getDefaultParamState)
    }
  },
  mounted() {
    this.paramsToSubmit = Object.assign({}, this.getParamState)
  }
}
</script>

<style>

</style>