<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  //import manager  from './mixin/manager'
  import message   from '../vue.mixins/message'
  export default {
    name: "MainMessage",
    components: {},
    mixins: [ message ],
    data() {
      return {
        params:{
          type:'info',
          title:'',
          message:''
        },
        initParams:{
          type:'info',
          title:'',
          message:''
        }
      }
    },
    mounted() {
    },
    activated() {
      this._init_page();
    },
    methods: {
      async _init_page() {
        this.$get_msg_list()
      },
      _get_list_page(currentPage){
        this.message.pageNum = currentPage;
        this.$get_msg_list()
      },
      _valid_params(params){
        if(validates.validEmptyString(params.title)){
          return '请输入消息标题！'
        }
        if(validates.validEmptyString(params.message)){
          return '请输入消息详情内容！'
        }
        return 'yes'
      },
      _save_msg(){
        let message = this._valid_params(this.params);

        if(message == 'yes'){
          this.$confirm('是否确认提交消息?', '提示信息', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {
            this.$insert_msg(this.params).then(()=>{
              this.$message({
                message: '消息添加成功！',
                type: 'success'
              });
              this.params = Object.assign({},this.initParams );
              this.$get_msg_list()
            })
          });
        }else{
          this.$alert(message, '错误提示', {
            confirmButtonText: '确定',
          });
        }
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
  <div>
    <template v-if="params.type == 'info'">
      <div>
        <template>
          <div class="vc-text--right">
            <el-button type="primary" @click.native="params.type ='edit'">添加消息</el-button>
          </div>
        </template>
        <template>
          <table class="vp-table">
            <colgroup>
              <col  width="100"><col  width="30%"><col  ><col  >
            </colgroup>
            <tr class="vp-table--tr">
              <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">消息编号</div></td>
              <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">消息主题</div></td>
              <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">消息内容</div></td>
              <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">消息发布时间</div></td>
              <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">发布人</div></td>
            </tr>

            <tr class="vp-table--tr" v-for="(item,index) in message.list">
              <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['msgid']}}</div></td>
              <td class="vp-table--td"><div class="vp-table--content vc-text--light vc-text--bold">{{ item['title']}}</div></td>
              <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['message']}}</div></td>
              <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['time']}}</div></td>
              <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['createdName']}}</div></td>
            </tr>
          </table>
          <template v-if="message.list.length == 0 ">
            <div class="vc-padding__lg--ud">
              <div class="vc-text--gray vc-text--center">暂无消息数据</div>
            </div>

          </template>
        </template>
        <template  v-if=" message.list.length > 0 &&   message.list.length < message.pageCount"  >
          <div class="vc-padding__lg vc-text--center" >
            <el-pagination
              background
              layout="prev, pager, next"
              :total="message.pageCount"
              :page-size="message.pageSize"
              @current-change="_get_list_page"
            >
            </el-pagination>
          </div>

        </template>
      </div>
    </template>
    <template v-if="params.type == 'edit'">
      <div class="vc-row">
        <div class="vc-col--12">
          <div class="vc-flex vc-items--center vc-margin__lg--bm">
            <div class="" style="width: 100px;"><div class="vc-text--bold vc-text--right vc-padding--rt">消息主题：</div></div>
            <div class="vc-flex--fit">
              <el-input v-model="params.title" placeholder="请输入内容消息主题..." maxlength="20"></el-input>
            </div>
          </div>

          <div class="vc-flex vc-items--center vc-margin__lg--bm">
            <div class="" style="width: 100px;"><div class="vc-text--bold vc-text--right vc-padding--rt">消息详情：</div></div>
            <div class="vc-flex--fit">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入消息详情..."
                v-model="params.message"
                maxlength="500"
              >
              </el-input>
            </div>
          </div>

          <div class="vc-flex--center">
            <el-button type="" @click.native="params.type = 'info'">返回</el-button>
            <el-button type="primary" @click.native="_save_msg">保存</el-button>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>
<style scoped>
</style>
