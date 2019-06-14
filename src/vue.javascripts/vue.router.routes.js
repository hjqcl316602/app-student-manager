

const Login = r => require.ensure([], () => r(require('@/vue.pages/Login.vue')), 'Login');
const Main = r => require.ensure([], () => r(require('@/vue.pages/Main.vue')), 'Main');

const MainClass = r => require.ensure([], () => r(require('@/vue.pages/MainClass.vue')), 'MainClass');
const MainBanner = r => require.ensure([], () => r(require('@/vue.pages/MainBanner.vue')), 'MainBanner');
const MainTeacher = r => require.ensure([], () => r(require('@/vue.pages/MainTeacher.vue')), 'MainTeacher');
const MainParent = r => require.ensure([], () => r(require('@/vue.pages/MainParent.vue')), 'MainParent');
const MainMessage = r => require.ensure([], () => r(require('@/vue.pages/MainMessage.vue')), 'MainMessage');
const MainAuthenDeal = r => require.ensure([], () => r(require('@/vue.pages/MainAuthenDeal.vue')), 'MainAuthenDeal');
const MainAuthenDone = r => require.ensure([], () => r(require('@/vue.pages/MainAuthenDone.vue')), 'MainAuthenDone');
const MainAuthenCost = r => require.ensure([], () => r(require('@/vue.pages/MainAuthenCost.vue')), 'MainAuthenCost');
const MainRelation = r => require.ensure([], () => r(require('@/vue.pages/MainRelation.vue')), 'MainRelation');
const MainMatrix = r => require.ensure([], () => r(require('@/vue.pages/MainMatrix.vue')), 'MainMatrix');
const MainMatrixType = r => require.ensure([], () => r(require('@/vue.pages/MainMatrixType.vue')), 'MainMatrixType');

export default  [
  { path: '*', redirect: '/Login'},
  { path: '/', redirect: '/Login'},
  { path: '/Login', name: 'Login', component:Login   , meta:{ keepAlive:true,title:"登录",isLogin:false   }},
  { path: '/Main', name: 'Main', component:Main  , meta:{ keepAlive:true,title:"98同班后台管理系统",isLogin:true ,},
    children:[
      { path: 'Class',    name: 'MainClass', component:MainClass   ,meta:{ keepAlive:true,title:"班级管理",isLogin:true }},
      { path: 'Teacher',  name: 'MainTeacher', component:MainTeacher   ,meta:{ keepAlive:true,title:"老师管理",isLogin:true }},
      { path: 'Parent',   name: 'MainParent', component:MainParent   ,meta:{ keepAlive:true,title:"家长管理",isLogin:true }},
      { path: 'Banner',   name: 'MainBanner', component:MainBanner   ,meta:{ keepAlive:true,title:"海报栏管理列表",isLogin:true }},
      { path: 'Message',  name: 'MainMessage', component:MainMessage   ,meta:{ keepAlive:true,title:"消息管理",isLogin:true }},
      { path: 'AuthenDeal',  name: 'MainAuthenDeal', component:MainAuthenDeal   ,meta:{ keepAlive:true,title:"待审核认证",isLogin:true }},
      { path: 'AuthenDone',  name: 'MainAuthenDone', component:MainAuthenDone   ,meta:{ keepAlive:true,title:"已审核认证",isLogin:true }},
      { path: 'AuthenCost',  name: 'MainAuthenCost', component:MainAuthenCost   ,meta:{ keepAlive:true,title:"认证费用设置",isLogin:true }},
      { path: 'Relation',  name: 'MainRelation', component:MainRelation   ,meta:{ keepAlive:true,title:"推广关系表下载",isLogin:true }},
      { path: 'Matrix',  name: 'MainMatrix', component:MainMatrix   ,meta:{ keepAlive:true,title:"矩阵管理",isLogin:true }},
      { path: 'MatrixType',  name: 'MainMatrixType', component:MainMatrixType   ,meta:{ keepAlive:true,title:"矩阵类型管理",isLogin:true }},
    ]
  },
]



// isLoaded - 用于判断是否第一次加载，第一次加载是不管从来自哪个页面（即使是来自的页面需要缓存该页面），
// idLoad - 用于判断页面是否需要缓存
// keepAlivePages - 来自的页面需要缓存当前页面的页面组

/*
在需要缓存的页面中 activated中添加方法
if(!this.$route.meta.isLoaded || (this.$route.meta.isLoaded && !this.$route.meta.isLoad)){
  this.$route.meta.isLoaded = true;
  this._init_page();
}
*/
