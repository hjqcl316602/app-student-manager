<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import user  from '../vue.mixins/user'
  export default {
    name: "Login",
    components: {},
    mixins: [ user ],
    data() {

      return {
        params:{
          userName:'',pwd:''
        }
      }
    },
    mounted(){
    },
    activated() {
      this.params.userName = ( configs['HTTP_TYPE'] === 'localhost') ? 'admin' : '';
      this.params.pwd = ( configs['HTTP_TYPE'] === 'localhost') ? '123456' : '';
    },
    methods: {

      _login(){

        this.$get_user_login(this.params).then(()=>{
          sessionStorage.setItem('isLogin',true );
          let jumpPath = sessionStorage.getItem('redirect') || configs['DEFAULT_PAGE'];
          this.$router.replace({ path:jumpPath })
        })


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
<div class="vc-fluid vc-flex--center vc-bg vv-login">
  <div class="" style="width: 300px">
    <div class="vc-margin--bm">
      <el-input v-model="params.userName" placeholder="请输入您的账户名"></el-input>
    </div>
    <div class="vc-margin--bm">
      <el-input type="password" v-model="params.pwd" placeholder="请输入您的登录密码" @keyup.enter.native="_login"></el-input>
    </div>
    <div class="el-cover">
      <el-button type="primary" @click.native="_login">登录</el-button>
    </div>
  </div>
</div>

</template>
<style scoped></style>
