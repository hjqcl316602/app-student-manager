/**
 * Created by 41587 on 2018/9/9.
 */

import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

Vue.mixin({
  data(){
    return {
      configs:{
        ...configs,
        HTTP_WEB:window.location.href.split('#')[0]
      },
      popups:{ ['0']:false,['1']:false,['2']:false,['3']:false,['4']:false,['5']:false,['6']:false,['7']:false,['8']:false, }
      // 此处不能为数组，页面中修改之后不能起到效果
    }
  },
  beforeRouteEnter(to, from, next) {

    let keepAlivePages = to.meta['keepAlivePages'] || []; // 先设置一个数组，该页面的来自的页面后需要缓存的页面记录下来
    let fromName = from.name ;

    // 会执行两次，由于不同的层级之间的跳转影响到的
    let isBoolLoading = ( keepAlivePages.indexOf(fromName) > -1 && Object.getOwnPropertyNames(to.meta).indexOf('isLoad') > -1 ) ; // 判断从哪些页面来需要缓存页面

    if( isBoolLoading ){
      to.meta.isLoad = true;
    }else{
      to.meta.isLoad  = false
    }
    next()
  },
  beforeRouteLeave(to,from,next){
    // 商品详情页会通过分享，所以返回键就直接退出项目了，需要在meta信息中设置 back ，回到哪个页面
    let that = this;
    let bool = function(){
      let arr = Object.keys(that.popups) ;
      for(let n = 0 ; n < arr.length;n++){
        if(that.popups[arr[n]]){
          return true
        }
      }
      return false ;
    }();
    if( bool || ( this.popup && this.popup.show ) ){    // 由于子页面的该事件会后执行，所以目前只能通过在这里执行弹出框的显示和隐藏
      if(bool){
        let arr = Object.keys(that.popups) ;
        for(let n = 0 ; n < arr.length;n++){
          that.popups[arr[n]] = false
        }
      }

      if(this.popup && this.popup.show ){
        this.popup.show = false ;
      }

      next(false)
    }else{
      next()
    }
  },
  filters:{
    strMoney(value){
      if(value){
        return (value / 100).toFixed(2) ;
      } else{
        return '0.00'
      }
    },
    str_sex(value){
      let sex = [ { text :'男',value:'1'},{ text:'女' ,value:'2'}];
      let index = sex.findIndex((item)=>{ return item['value']  == value  } ) ;
      return index > -1 ? sex[index]['text'] : "不详";
    },
    str_status_banner(value){
      let status_banner = [ { text :'草稿',value:'0'},{ text:'上架' ,value:'1'},{ text:'下架' ,value:'2'}];
      let index = status_banner.findIndex((item)=>{ return item['value']  == value  } ) ;
      return index > -1 ? status_banner[index]['text'] : "不详";
    }
  },
  methods:{
    $request({url ,type = 'POST' ,data ,responseType = 'json' ,headerContentType='application/x-www-form-urlencoded' , loading = 1,interval = 0 }){

      // loading  1 - 不要加载动画 2 - 一直加载动画 3 - 第一次加载动画

      let isFirst = true ;
      if( loading == 3 ){
        let urls = sessionStorage.getItem('urls') ? JSON.parse( sessionStorage.getItem('urls') ) : [];

        if( urls.indexOf(url) == -1 ){
          urls.push(url);
          isFirst = true ;
        }else{
          isFirst = false
        }
        sessionStorage.setItem('urls',JSON.stringify(urls))
      }
      let loadPopup = null;
      if(loading == 2 || isFirst){
        loadPopup = this.$loading({
          lock: true,
          text: '加载中...',
          background: 'rgba(0, 0, 0, 0.5)'
        });
        interval = 400
      }

      return new Promise((resolve,reject)=>{
        axios({
          url:`${url}`,
          baseURL:configs['HTTP_REQUEST'],
          data:data,
          transformRequest: [function (data) {
            data = qs.stringify(data);
            return data
          }],
          method:type,
          headers: {'Content-Type': headerContentType },
          timeout:10000
        }).then((reponse)=>{

          setTimeout(()=>{

            loadPopup && loadPopup.close();

            let data = reponse.data;
            if(data['code'] == '000'){
              resolve(data)
            }else if(data['code'] == '004'){
              let router = window.location.href.split('#')[1];
              sessionStorage.setItem('redirect',router );
              sessionStorage.setItem('isLogin',false)
              this.$router.push({ path: '/Login' });
            }else{
              reject(data);
            }
          },interval)

        },(data)=>{
          this.$message({
            message: '请求失败，请检查网络',
            type: 'warning'
          });
          loadPopup && loadPopup.close();

        }).catch( (error)=> {
          loadPopup && loadPopup.close();
          this.$message({
            message: '异常',
            type: 'warning'
          });
        })
      })
    },
    $upload_picture(image){
      return new Promise((resovle,reject)=>{
        let config = { headers:{'Content-Type': 'multipart/form-data'} } ;
        let loadPopup = this.$loading({
          lock: true,
          text: '上传中...',
          background: 'rgba(0, 0, 0, 0.5)'
        });
        axios.post(configs['HTTP_REQUEST']+'/res/uploadImage.do',image,config).then((response)=>{
          setTimeout(()=>{
            loadPopup.close()
          },800);
          if(response['data']['code'] == '000'){
            resovle(response['data'])
          }else{
            this.$message({
              message: '上传图片失败！',
              type: 'warning'
            });
          }

        },(error)=>{
          this.$message({
            message: '上传图片失败！',
            type: 'warning'
          });
          reject(error)
        })
      })
    },
    // 设置图片的高宽，通过图片的最小边占满盒子
    $img_load(e){
      let  parentNode = e.target.parentNode || e.target.parentElement ;
      let imgBoxWidth = parentNode.offsetWidth;
      let imgBoxHeight = parentNode.offsetHeight;
      let imgHeight = e.target.height;
      let imgWidth = e.target.width;
      let imgBoxProp = imgBoxWidth / imgBoxHeight;
      let imgProp = imgWidth / imgHeight;
      if(imgProp >= imgBoxProp ){
        e.target.style.height = imgBoxHeight + 'px';
      }else{
        e.target.style.width = imgBoxWidth + 'px';
      }
    },
  }
});




