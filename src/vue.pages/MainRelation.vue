<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import user  from '../vue.mixins/user'
  export default {
    name: "MainRelation",
    components: {},
    mixins: [ user ],
    data() {
      return {}
    },
    mounted() {

    },
    activated() {
      this._init_page();
    },
    methods: {
      async _init_page() {

      },
      _down_load(){
        this.$get_referer_list().then((response)=>{
          let data = response['data'];
          let str = [] ;
          str.push('<tr>' +
            '<td style="border: 1px solid #000 ; padding: 50px 15px; font-weight: 800;font-size: 18px;">用户ID</td>' +
            '<td style="border: 1px solid #000 ; padding: 50px 15px; font-weight: 800;font-size: 18px;">微信ID</td>' +
            '<td style="border: 1px solid #000 ; padding: 50px 15px; font-weight: 800;font-size: 18px;">微信名</td>' +
            '<td style="border: 1px solid #000 ; padding: 50px 15px; font-weight: 800;font-size: 18px;">用户姓名</td>' +
            '<td style="border: 1px solid #000 ; padding: 50px 15px; font-weight: 800;font-size: 18px;">电话号码</td>' +
            '<td style="border: 1px solid #000 ; padding: 50px 15px; font-weight: 800;font-size: 18px;">推广人ID</td>' +
            '<td style="border: 1px solid #000 ; padding: 50px 15px; font-weight: 800;font-size: 18px;">推广人微信ID</td>' +
            '<td style="border: 1px solid #000 ; padding: 50px 15px; font-weight: 800;font-size: 18px;">推广人微信名</td>' +
            '<td style="border: 1px solid #000 ; padding: 50px 15px; font-weight: 800;font-size: 18px;">推广人姓名</td>' +
            '<td style="border: 1px solid #000 ; padding: 50px 15px; font-weight: 800;font-size: 18px;">推广人电话号码</td>' +
            '</tr>');
          //循环遍历，每行加入tr标签，每个单元格加td标签
          for(let i = 0 ; i < data.length ; i++ ){
            str.push(`<tr>
              <td style="border: 1px solid #000 ; padding: 50px 15px; ">${data[i]['memId'] || ''}</td>
              <td style="border: 1px solid #000 ; padding: 50px 15px; ">${ data[i]['openId'] || ''}</td>
              <td style="border: 1px solid #000 ; padding: 50px 15px; ">${ data[i]['nickName'] || ''}</td>
              <td style="border: 1px solid #000 ; padding: 50px 15px; ">${data[i]['trueName'] || ''}</td>
              <td style="border: 1px solid #000 ; padding: 50px 15px; ">${data[i]['mobile'] || ''}</td>
              <td style="border: 1px solid #000 ; padding: 50px 15px; ">${data[i]['refererId'] || ''}</td>
              <td style="border: 1px solid #000 ; padding: 50px 15px; ">${ data[i]['refererOpenId'] || ''}</td>
              <td style="border: 1px solid #000 ; padding: 50px 15px; ">${ data[i]['refererNickName'] || ''}</td>
              <td style="border: 1px solid #000 ; padding: 50px 15px; ">${data[i]['refererTrueName'] || ''}</td>
              <td style="border: 1px solid #000 ; padding: 50px 15px; ">${data[i]['refererMobile'] || ''}</td>
            </tr>`);
          }
          this._table_excel(str.join(''))

        })
      },
      _down_load2(){
        let jsonData = [
          {
            name:'路人甲',
            phone:'123456',
            email:'123@123456.com'
          },
          {
            name:'炮灰乙',
            phone:'123456',
            email:'123@123456.com'
          },
          {
            name:'土匪丙',
            phone:'123456',
            email:'123@123456.com'
          },
          {
            name:'流氓丁',
            phone:'123456',
            email:'123@123456.com'
          },
        ]
        this._table_excel(jsonData)
      },
      _table_excel(str){

        //Worksheet名
        let worksheet = '关系推广表';
        let uri = 'data:application/vnd.ms-excel;base64,';

        //下载的表格模板数据
        let template = `<html xmlns:o="urn:schemas-microsoft-com:office:office"
            xmlns:x="urn:schemas-microsoft-com:office:excel"
            xmlns="http://www.w3.org/TR/REC-html40">
            <head><meta charset="utf-8"></head><body><table>${str}</table></body></html>`;
        //下载模板
        window.location.href = uri + this._get_base64(template)
      },
      // 转化成base64
      _get_base64 (s) {
        return window.btoa(unescape(encodeURIComponent(s)))
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
  <div class="vc-cover vc-flex--center">
    <el-button type="primary" @click.native="_down_load">下载推广关系表</el-button>
  </div>
</template>
<style scoped></style>
