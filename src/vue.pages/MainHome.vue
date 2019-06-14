<script type="text/ecmascript-6">

  export default {
    name: "MainHome",

    mounted() {
      console.log( doms)
    },
    activated() {

      if(!this.$route.meta.isLoaded || (this.$route.meta.isLoaded && !this.$route.meta.isLoad)){
        this.$route.meta.isLoaded = true;
        this._init_page();
      }
    },
    props: {},
    data() {
      return {}
    },
    methods: {
      _init_page(loading = true){
        console.log('load - MainHome'+ loading)
      },

    },
    watch: {
      '':{
        handler(val,olval){

        },
        deep:true,immediate:true
      }
    },
  }
</script>
<template>
  <div class="vc-bg vc-padding__lg">

    <div  >
      <img src="" alt="" >
      <div class="vp-input">
      <i class="vp-input__clear iconfont icon-quxiao"></i>
      <input type="text" class="vp-input__inner" placeholder="请输入...">
    </div>
    </div>

    <div class="vp-btn">
       <div class="vp-btn__submit vp-btn--theme" >提交</div>
    </div>

    <router-link to="/Main/User">MainUser</router-link>
  </div>
</template>
<style scoped></style>
