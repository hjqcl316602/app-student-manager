<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import jz  from '../vue.mixins/jz'
  export default {
    name: "MainMatrixType",
    components: {},
    mixins: [ jz ],
    data() {
      return {
        params:{
          type:'info',
          name:'',
          typeId:'',
          editType:'insert'
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
        this.$get_jz_type_list()
      },
      _add_jz_type(){
        this.params.type = 'edit';
        this.params.edit = 'insert';
        this.params.name = '';
      },
      _save_jz_type(){
        if(this.params.edit === 'update'){
          this.$update_jz_type(this.params).then(()=>{
            this.params.type = 'info';
            this.params.name = '';
            this.params.typeId = '';
            this.$message({
              message:  '更新矩阵类型成功',
              type: 'success'
            });
          })
        }else{
          this.$insert_jz_type(this.params).then(()=>{
            this.params.type = 'info';
            this.params.name = '';
            this.$message({
              message:  '新增矩阵类型成功',
              type: 'success'
            });
          })
        }
      },
      _operate_jz_type(type,item){
        if(type === 'switch'){
          let params = {
            typeId:item['typeId'],status:( item['status'] == 0 ) ? 1 : 0
          };
          this.$update_jz_type_status(params).then(()=>{
            this.$message({
              message:  '矩阵类型状态修改成功',
              type: 'success'
            });
          })
        }else if(type === 'update'){
          this.params.edit = 'update';
          this.params.type = 'edit';
          this.params.typeId = item['typeId'];
          this.params.name = item['name']
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
      <template>
        <div class="vc-margin__lg--bm">
          <div class="vc-text--right">
            <el-button type="primary" @click.native="_add_jz_type ">添加矩阵类型</el-button>
          </div>
        </div>

      </template>


      <template>
        <table class="vp-table" >
          <colgroup>
            <col width="150">
            <col width="30%">
          </colgroup>
          <tr class="vp-table--tr">
            <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">矩阵类型序号</div></td>
            <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">名称</div></td>
            <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">状态</div></td>
            <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">操作</div></td>
          </tr>

          <tr class="vp-table--tr" v-for="(item,index) in jzType.list" >
            <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ ( index + 1 ) }}</div></td>

            <td class="vp-table--td"><div class="vp-table--content vc-text--bold">{{ item['name']}}</div></td>
            <td class="vp-table--td">
              <div class="vp-table--content  ">
                <span v-if="item['status'] == 0" class="vc-text--gray">不可用</span>
                <span v-if="item['status'] == 1" class="vc-text--danger">正常</span>
              </div>
            </td>
            <td class="vp-table--td">
              <div class="vp-table--content vc-text--light">
                <el-button type="warning" @click.native="_operate_jz_type('switch' , item)" v-if="item['status'] == 0">启用</el-button>
                <el-button type="danger" @click.native="_operate_jz_type('switch' , item)" v-if="item['status'] == 1">关闭</el-button>
                <el-button type="primary" @click.native="_operate_jz_type('update' , item)" >编辑</el-button>
              </div>
            </td>
          </tr>

        </table>
        <template v-if="false">
          <div class="vc-padding__lg--ud">
            <div class="vc-text--gray vc-text--center">暂无矩阵数据</div>
          </div>

        </template>
      </template>
    </template>
    <template v-if="params.type == 'edit'">
      <div class="vc-row">
        <div class="vc-col--12">

          <div class="vc-margin__lg--bm vc-text--center" >
             <span v-if="params.edit == 'update'" class="vc-text--bold ">更新矩阵类型</span>
            <span v-if="params.edit == 'insert'" class="vc-text--bold ">新增矩阵类型</span>
          </div>

          <div class="vc-flex vc-items--center vc-margin__lg--bm">
            <div class="" style="width: 100px;"><div class="vc-text--bold vc-text--right vc-padding--rt">矩阵类型：</div></div>
            <div class="vc-flex--fit">
              <el-input v-model="params.name" placeholder="请输入矩阵类型名称.."></el-input>
            </div>
          </div>

          <div class="vc-flex--center">
            <el-button type="" @click.native="params.type = 'info'">返回</el-button>
            <el-button type="primary" @click.native="_save_jz_type">保存</el-button>
          </div>
        </div>
      </div>
    </template>



  </div>
</template>
<style scoped></style>
