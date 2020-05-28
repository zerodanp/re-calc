<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    methods: {
      ...mapActions('storeCalculation',['getCalcs','getParams'])
    },
    mounted() {
      this.getCalcs()
      this.getParams()
    }
  }
</script>
