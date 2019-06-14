<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
   import basic  from '../vue.mixins/basic'
  export default {
    name: "MainUser",
    components: {},
    mixins: [ basic ],
    data() {
      return {}
    },
    mounted() {
      console.log(this.$store.state.basic)
    },
    activated() {

    },
    methods: {
      async _init_page() {

      }

    },
    watch: {
      '': {
        handler(val, olval) {

        },
        deep: true, immediate: true
      }
    },
  }
</script>
<template>
<div class="">
   个人中心
</div>
</template>
<style scoped>

</style>
