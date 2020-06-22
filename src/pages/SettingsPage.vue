<template>
  <q-page class="row">
    <div class="col q-ma-md">
      <p>Settings</p>
      <p>{{getParamState.Const_KNK}}</p>
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters('storeCalculation', ['getParamState'])
  },
}
</script>

<style>

</style>