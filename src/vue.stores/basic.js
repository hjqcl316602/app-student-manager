
export default {
  state:{
    isLogin:false,
    userMessage:JSON.parse( sessionStorage.getItem('userMessage' ) ) || {}
  },

  mutations:{
    ['set_login'](state,status){
      state.isLogin = status
    },
    ['get_user_message'](state,obj={}){

      state.userMessage = obj ;

      sessionStorage.setItem('userMessage',JSON.stringify(state.userMessage));

      /*Object.keys(obj).forEach((item,i)=>{   必要要属性名存在，不然不能渲染页面
        state.userMessage[item] = obj[item]
      });*/

    }

  }
}
