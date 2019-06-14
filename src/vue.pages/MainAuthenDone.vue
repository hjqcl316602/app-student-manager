<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import vip  from '../vue.mixins/vip'
  export default {
    name: "MainAuthenDone",
    components: {},
    mixins: [ vip ],
    data() {
      return {
        params :{
          search:'',
          popupPic:false,
          popupPicUrl:'',
          popup:false,
          evaluate:'',
          vipRecordId:'',
          vipRecordName:''
        }
      }
    },
    beforeRouteLeave(to,from,next){
      if(  this.params.popupPic ||  this.params.popup){
        this.params.popupPic = false ;
        this.params.popup = false
        next(false)
      }else{
        next()
      }
    },
    computed:{
      vipList(){
        let vipList = [];
        this.vip.list.forEach((item)=>{
          let obj = Object.assign({},item);
          obj.pic = obj.pic ? obj.pic.split(',') : [];
          vipList.push(obj)
        });
        return vipList
      }
    },

    mounted() {

    },
    activated() {
      this._init_page();
    },
    methods: {
      async _init_page() {
        this.$get_vip_audit_list(this.params)
      },
      _get_list_page(currentPage){
        this.vip.pageNum = currentPage;
        this.$get_vip_audit_list(this.params)
      },
      _show_picture(pic){
        this.params.popupPic = true ;
        this.params.popupPicUrl = pic
      },
      _operate_vip(type,item){
        this.params.vipRecordId = item['vipRecordId'];
        this.params.vipRecordName = item['className'];
        if(type==='pass'){
          this.params.status = 4 ;
          this.$update_status(this.params).then(()=>{
            this.$get_vip_audit_list(this.params);
            this.$message({
              message: `班级【${this.params.vipRecordName}】开启成功`,
              type: 'success'
            });
          })
        }else{
          this.params.popup = true ;
          this.params.status = 3 ;
        }
      },
      _close_popup(){

        this.params.popup = false ;

        this.$update_status(this.params).then(()=>{
          this.params.evaluate = '';

          this.$get_vip_audit_list(this.params);
          this.$message({
            message:`班级【${this.params.vipRecordName}】禁用成功`,
            type: 'success'
          });
        })
      },

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
  <div>

    <el-dialog
      title="提示"
      :visible.sync="params.popup"
      width="30%" >
      <el-input
        type="textarea"
        :rows="4"
        placeholder="请输入理由"
        v-model="params.evaluate">
      </el-input>

      <span slot="footer" class="dialog-footer">
        <el-button @click="params.popup = false">取 消</el-button>
        <el-button type="primary" @click="_close_popup">确 定</el-button>
      </span>

    </el-dialog>

    <el-dialog
      title=""
      :visible.sync="params.popupPic"
      width="50%"
    >
      <div class="vc-text--center">
        <img :src="params.popupPicUrl" alt="">
      </div>

      <span slot="footer" class="dialog-footer">

          <el-button type="primary" @click="params.popupPic = false">关 闭</el-button>
      </span>
    </el-dialog>


    <template>
      <div class="vc-margin__lg--bm">
        <div class="vc-text--lg vc-text--bold">开通认证班级总数：{{ vip.totalNum }} </div>
      </div>
    </template>

    <template>
      <div class="vc-padding__lg--bm  ">
        <div class="vc-row">
          <div class="vc-col--08">
            <el-input v-model="params.search" placeholder="请输入班级编号、名称、地址" @keyup.enter.native="_init_page">
              <el-button slot="append" icon="el-icon-search" @click.native="_init_page"></el-button>
            </el-input>
          </div>
        </div>
      </div>
    </template>

    <template>
      <table class="vp-table" style="overflow-x: auto">
        <colgroup>
          <col width="100"><col width="100"><col width="100"><col width="100"><col width="100">
        </colgroup>
        <tr class="vp-table--tr">
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">班级编号</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">班级名称</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">学校名称</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">地区</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">创建人</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">申请时间</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">申请类型</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">上传资料</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">姓名</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">电话号码</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">状态</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">操作</div></td>
        </tr>

        <tr class="vp-table--tr" v-for="(item,index) in vipList" >
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['classId']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['className']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['schoolName']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['areaName']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['createdBy']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['time']}}</div></td>
          <td class="vp-table--td">
            <div class="vp-table--content vc-text--light" v-if="item['type'] == 0"> 个人 </div>
            <div class="vp-table--content vc-text--light" v-if="item['type'] == 1"> 企业 </div>
          </td>
          <td class="vp-table--td">
            <div class="vp-table--content vc-text--light vc-flex">
              <div class="vc-margin--rt" style="width: 100px;height:100px;" v-for="(pic,ii) in item['pic']">
                <div class="vp-img__inner">
                  <img :src="pic" alt=""  class="vp-img--max vp-cursor--pointer" @click="_show_picture(pic)">
                  <img src="../images/img-error-loading.png" alt="" class="vp-img--error vp-img--half">
                </div>
              </div>
            </div>
          </td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['contractName']}} </div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light"> {{ item['contractMobile']}}</div></td>
          <td class="vp-table--td">
            <div class="vp-table--content vc-text--light">
              <span v-if="item['disable'] == 1 " class="vc-text--danger">已禁用</span>
              <span v-if="item['disable'] == 0 " class="vc-text--warning">已开启</span>
            </div>
          </td>
          <td class="vp-table--td">
            <div class="vp-table--content vc-text--light">
              <el-button type="danger" @click.native="_operate_vip('pass',item)" v-if="item['disable'] == 1">开启</el-button>
              <el-button type="warning" @click.native="_operate_vip('refuse',item)" v-if="item['disable'] == 0">禁用</el-button>
            </div>
          </td>
        </tr>
      </table>
      <template v-if="vipList.length == 0 ">
        <div class="vc-padding__lg--ud">
          <div class="vc-text--gray vc-text--center">无开通认证班级数据</div>
        </div>

      </template>
    </template>

    <template  >
      <div class="vc-padding__lg vc-text--center"  v-if="vip.list.length > 0 &&   vip.list.length < vip.pageCount ">
        <el-pagination
        background
        layout="prev, pager, next"
        :total="vip.pageCount"
        :page-size="vip.pageSize"
        @current-change="_get_list_page"
        >
        </el-pagination>
      </div>
    </template>
  </div>

</template>
<style scoped></style>
