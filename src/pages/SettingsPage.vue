<template>
  <q-page class="row">
    <div class="col q-ma-md">
      <p>Settings</p>
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
    ...mapGetters('storeCalculation', ['getParams'])
  },
}
</script>

<style>

</style>