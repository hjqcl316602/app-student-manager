<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  //import manager  from './mixin/manager'
  export default {
    name: "Main",
    components: {},
    mixins: [],
    data() {
      return {
        nav:{
          items:[
            { value :'',name:'班级管理',open:false ,
              children:[
                { value :'',name:'班级管理',active:false ,routerName:'MainClass'},
              ]
            },
            { value :'',name:'用户管理',open:false ,
              children:[
                { value :'',name:'老师管理',active:false ,routerName:'MainTeacher'},
                { value :'',name:'家长管理',active:false ,routerName:'MainParent'},
              ]
            },
            { value :'',name:'海报栏管理',open:false ,
              children:[
                { value :'',name:'海报栏管理',active:false ,routerName:'MainBanner'},
              ]
            },
            { value :'',name:'消息管理',open:false,
              children:[
                { value :'',name:'消息管理',active:false ,routerName:'MainMessage'},
              ]
            },
            { value :'',name:'矩阵管理',open:false,
              children:[
                { value :'',name:'矩阵类型管理',active:false ,routerName:'MainMatrixType'},
                { value :'',name:'矩阵管理',active:false ,routerName:'MainMatrix'},
              ]
            },
            { value :'',name:'认证管理',open:false,
              children:[
                { value :'',name:'待审核认证',active:false ,routerName:'MainAuthenDeal'},
                { value :'',name:'已通过审核',active:false ,routerName:'MainAuthenDone'},
                { value :'',name:'认证费用设置',active:false ,routerName:'MainAuthenCost'},
              ]
            },

            { value :'',name:'推广关系表',open:false,
              children:[
                { value :'',name:'推广关系表下载',active:false ,routerName:'MainRelation'},
              ]
            },

          ]
        }
      }
    },
    mounted() {
    },
    activated() {
      if (!this.$route.meta.noLoading) {
        this._init_page();
      }
    },
    methods: {
      async _init_page() {

      },
      _back_login(){
        sessionStorage.setItem('isLogin',false );
        sessionStorage.setItem('redirect',window.location.href.split('#')[1] );
        this.$router.push({ path:'/Login' })
      },
      _open_nav(mainNav,mainNavIndex){
        this.nav.items[mainNavIndex]['open'] = !this.nav.items[mainNavIndex]['open']
      },
      _select_nav(mainNav,mainNavIndex,subNav,subNavIndex){
        this.$router.push({ name : subNav['routerName'] }) ;
      },
      _change_nav(name){
        this.nav.items.forEach((item,i)=>{
          let  index  = item['children'].findIndex((child)=>{ return child['routerName'] == name });
          item['children'].forEach((child,childIndex)=>{
            child['active'] = false ;
          });
          if(index != -1){
            item['open'] = true ;
            item['children'][index]['active'] = true;
          }
        });
      }

    },
    watch: {
      '$route': {
        handler(val, olval) {
          this._change_nav(val.name)
        },
        deep: true, immediate: true
      }
    },
  }
</script>
<template>
  <div class="vv-main">
    <div class="vv-main-header vc-padding__lg--ad vc-flex vc-content--end vc-items--center">
      <el-button type="primary" @click.native="_back_login">退出</el-button>
    </div>
    <div class="vv-main-body">
      <div class="vv-main-navigation">
        <div class="vv-nav">
          <div class="vv-nav-item" :class="{ 'open' : mainNav['open'] }" v-for="(mainNav,mainNavIndex) in nav.items">
            <div class="vv-nav-item--title" @click="_open_nav(mainNav,mainNavIndex)">
              {{ mainNav['name'] }}
              <span class="iconfont icon-iconfontadd vc-text--gray"></span>
            </div>
            <div class="vv-subnav-item">
              <div class="vv-subnav-item--title" :class="{'active':subNav['active'] }" v-for="(subNav,subNavIndex) in mainNav['children']" @click="_select_nav(mainNav,mainNavIndex,subNav,subNavIndex)">{{ subNav['name']}}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="vv-main-content vc-padding__lg">

        <keep-alive>
          <router-view v-if="$route.meta.keepAlive"></router-view>
        </keep-alive>
        <router-view v-if="!$route.meta.keepAlive"></router-view>

      </div>
    </div>
  </div>

</template>
<style scoped>


</style>
