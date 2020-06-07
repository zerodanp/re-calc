<template>
  <div style="min-width:150px" class="row q-pa-xs">
        <q-banner dense class="col bg-secondary info-header text-center">
          <span class="text-subtitle1"><slot /></span> 
        </q-banner>
        <div class="col no-break text-center info-border"> 
            <div 
            class="q-pa-sm text-bold"
            v-if="$props.filter === 'percentFormatDE'"> {{info | percentFormatDE}} </div>
            <div 
            class="q-pa-sm text-bold"
            v-if="$props.filter === 'toCurrency'"> {{info | toCurrency}} </div>  
            <div 
            class="q-pa-sm text-bold"
            v-if="$props.filter === 'numberFormatDE'"> {{info | numberFormatDE}} </div> 
        </div>
    </div>
</template>

<script>
export default {
    props:['info','filter'],

    filters: {
    separatedNumber (value) {
      return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')
    },
    fixedDecimal (value) {
      return value.toFixed(2)
    },
    roundDecimal(value) {
        let temp = value * 100
        temp = Math.round(temp)
        return (temp/100)
    },
    numberFormatDE(num) {
      return (
        num
          .toFixed(2) // always two decimal digits
          .replace('.', ',') // replace decimal point character with ,
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      ) // use . as a separator
    },
    percentFormatDE(num) {
      num = num*100
      return (
        num
          .toFixed(2) // always two decimal digits
          .replace('.', ',') // replace decimal point character with ,
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' %'
      ) // use . as a separator
    },
    toCurrency(num) {
      return (
        num
          .toFixed(2) // always two decimal digits
          .replace('.', ',') // replace decimal point character with ,
          .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.') + ' €'
      ) // use . as a separator
    }
  }
}

</script>

<style lang="scss">
    .no-break {
        white-space: nowrap;
    }
    .info-header {
        border-bottom-left-radius: 5px;
        border-top-left-radius: 5px;
    }
    .info-border {
        border-top-style: solid;
        border-bottom-style: solid;
        border-left-style: solid;
        border-right-style: solid;
        border-bottom-right-radius: 5px;
        border-top-right-radius: 5px;
        border-color: $secondary;
    }
</style>