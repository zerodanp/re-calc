<template>
  <q-page class="row">
      <edit-settings/>
  </q-page>
</template>

<script>
export default {  
  components: {
    'edit-settings' : require('components/EditSettings.vue').default
  }
}
</script>

<style>

</style>