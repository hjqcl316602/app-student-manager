/**
 * Created by 41587 on 2018/9/9.
 */

import Vue from 'vue'
import axios from 'axios'
import qs from 'qs'

Vue.mixin({


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
            if(data['code'] === '000'){
              resolve(data)
            }else if(data['code'] === '004'){
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
          if(response['data']['code'] === '000'){
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




