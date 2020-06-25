<template>
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
</template>

<script>
export default {

}
</script>

<style>

</style>