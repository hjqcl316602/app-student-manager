<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  //import manager  from './mixin/manager'
  import banner   from '../vue.mixins/banner'
  export default {
    name: "MainBanner",
    components: {},
    mixins: [ banner ],
    data() {
      return {
        params:{
          type:'info',
          title:'',
          pic:'',
          content:'',
          indx:1,
          editType:'insert',
          psdId:'',
          status:''
        },
        initParams:{
          type:'info',
          title:'',
          pic:'',
          content:'',
          indx:1,
          editType:'insert'
        },
      }
    },
    mounted() {
    },
    activated() {
      this._init_page();
    },
    methods: {
      async _init_page() {
        this.$get_banner_list()
      },
      _select_pic(e){
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append('file',file);
        this.$upload_picture(formData).then((res)=>{
          e.target.value = '';
          this.params.pic = res['data']['fileUrl']
        })
      },
      _valid_params(params){
        if(validates.validEmptyString(params.title)){
          return '请输入海报主题！'
        }
        if(validates.validEmptyString(params.content)){
          return '请输入海报详情！'
        }
        if(validates.validEmptyString(params.content)){
          return '请选择海报图！'
        }
        return 'yes'
      },
      _save_banner(){
        let message = this._valid_params(this.params);

        if(message == 'yes'){
          this.$confirm('是否确认提交海报信息?', '提示信息', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'info'
          }).then(() => {

            if(this.params.editType =='insert'){
              this.$insert_banner(this.params).then(()=>{
                this.$message({
                  message: '海报添加成功！',
                  type: 'success'
                });
                this.params = Object.assign({},this.initParams );
                this.$get_banner_list()
              })
            }else if(this.params.editType =='update'){
              this.$update_banner(this.params).then(()=>{
                this.$message({
                  message: '海报修改成功！',
                  type: 'success'
                });
                this.params = Object.assign({},this.initParams );
                this.$get_banner_list()
              })
            }

          });
        }else{
          this.$alert(message, '错误提示', {
            confirmButtonText: '确定',
          });
        }
      },
      _operate_banner(type,item){

        if(type == 'insert'){
          this.params = Object.assign({},this.initParams);
          this.params.type = 'edit';

        }else{
          this.params.psdId = item['psdId'];
          this.params.title = item['title'];
          this.params.content = item['content'];
          this.params.indx = item['indx'];
          this.params.pic = item['pic'];
          this.params.status = item['status'];
          if(type == 'update'){
            this.params.type = 'edit';
            this.params.editType = 'update';

          }else if(type == 'delete'){
            this.$confirm('是否确认删除海报信息?', '提示信息', {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
              type: 'info'
            }).then(() => {
              this.$delete_banner(this.params).then(()=>{
                this.$message({
                  message: '海报删除成功！',
                  type: 'success'
                });
                this.$get_banner_list()
              })

            });
          }else if(type == 'up'){
            this.$up_banner(this.params).then(()=>{
              this.$message({
                message: '海报上架成功！',
                type: 'success'
              });
              this.$get_banner_list()
            })
          }else if(type == 'down'){
            this.$down_banner(this.params).then(()=>{
              this.$message({
                message: '海报下架成功！',
                type: 'success'
              });
              this.$get_banner_list()
            })
          }
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
            <el-button type="primary" @click.native=" _operate_banner('insert')">添加海报</el-button>
          </div>
        </template>
        <template>
          <div style="overflow-x: auto">
            <table class="vp-table">
              <colgroup>
                <col width="150"><col   ><col  width="20%"><col  ><col  ><col  ><col width="300" ><col  >
              </colgroup>
              <tr class="vp-table--tr">
                <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">海报主题</div></td>
                <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">缩略图</div></td>
                <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">发布内容</div></td>
                <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">发布时间</div></td>
                <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">顺序</div></td>
                <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">状态</div></td>
                <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">操作</div></td>
              </tr>

              <tr class="vp-table--tr" v-for="(item,index) in banner.list">
                <td class="vp-table--td"><div class="vp-table--content vc-text--light vc-text--bold">{{ item['title']}}</div></td>
                <td class="vp-table--td"><div class="vp-table--content vc-text--light">
                  <div class="" style="width: 300px;height:120px;">
                    <div class="vp-img__inner">
                      <img :src="item['pic']" alt="" @load="$img_load">
                    </div>
                  </div>
                </div></td>
                <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['content']}}</div></td>
                <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['time']}}</div></td>
                <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['indx']}}</div></td>
                <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['status'] | str_status_banner}}</div></td>
                <td class="vp-table--td">
                  <div class="vp-table--content vc-text--light">
                    <el-button type="success" @click.native="_operate_banner('up',item)" v-if="item['status'] == 2 || item['status'] == 0">上架</el-button>
                    <el-button type="warning" @click.native="_operate_banner('down',item)" v-if="item['status'] == 1">下架</el-button>
                    <el-button type="primary" @click.native="_operate_banner('update',item)">编辑</el-button>
                    <el-button type="danger" @click.native="_operate_banner('delete',item)">删除</el-button>
                  </div>
                </td>
              </tr>
            </table>
          </div>
          <template v-if="banner.list.length == 0 ">
            <div class="vc-padding__lg--ud">
              <div class="vc-text--gray vc-text--center">无海报栏列表数据</div>
            </div>

          </template>
        </template>
      </div>
    </template>
    <template v-if="params.type == 'edit'">
      <div class="vc-row">
        <div class="vc-col--12">
          <div class="vc-flex vc-items--center vc-margin__lg--bm">
            <div class="" style="width: 100px;"><div class="vc-text--bold vc-text--right vc-padding--rt">海报主题：</div></div>
            <div class="vc-flex--fit">
              <el-input v-model="params.title" placeholder="请输入内容"></el-input>
            </div>
          </div>

          <div class="vc-flex vc-items--center vc-margin__lg--bm">
            <div class="" style="width: 100px;"><div class="vc-text--bold vc-text--right vc-padding--rt">海报详情：</div></div>
            <div class="vc-flex--fit">
              <el-input
                type="textarea"
                :rows="5"
                placeholder="请输入内容"
                v-model="params.content">
              </el-input>
            </div>
          </div>

          <div class="vc-flex vc-items--center vc-margin__lg--bm">
            <div class="" style="width: 100px;"><div class="vc-text--bold vc-text--right vc-padding--rt">海报顺序：</div></div>
            <div class="vc-flex--fit">
              <el-input-number v-model="params.indx" :min="1"></el-input-number>
            </div>
          </div>

          <div class="vc-flex vc-items--center vc-margin__lg--bm">
            <div class="" style="width: 100px;"><div class="vc-text--bold vc-text--right vc-padding--rt">海报图：</div></div>
            <div class="vc-flex--fit">

              <div class="vc-row">
                <div class="vp-ratio" style="width: 200px">
                  <div class="vp-ratio__outer" data-ratio="100%">
                    <template v-if="!!params.pic">
                      <div class="vp-ratio__inner vp-img__inner">
                        <img :src="params.pic" alt="" class="" @load="$img_load">
                      </div>
                      <div class="vp-img__close" @click="params.pic = ''">
                        <i class="iconfont icon-quxiao vc-text--xl-x vc-text--danger"></i>
                      </div>
                    </template>
                    <template v-else>
                      <div class="vp-ratio__inner vp-input--file">
                        <label for="input" class="">
                          <svg viewBox="0 0 1024 1024" version="1.1" p-id="1903" height="100%" width="100%" >
                            <path xmlns="http://www.w3.org/2000/svg" d="M610.133333 912.213333h70.4v28.586667H610.133333zM224 83.626667H294.4v28.586666H224zM736.426667 83.626667h70.4v28.586666h-70.4zM911.786667 736.853333h28.586666v70.4h-28.586666zM911.786667 905.386667a6.826667 6.826667 0 0 1-6.826667 6.826666h-42.666667V938.666667h56.32a21.333333 21.333333 0 0 0 21.333334-21.333334v-54.186666h-28.586667zM350.293333 912.213333h77.653334v28.586667H350.293333zM483.84 912.213333h70.4v28.586667h-70.4zM610.133333 83.626667h70.4v28.586666H610.133333zM919.04 85.333333h-56.32v28.586667h42.666667a6.4 6.4 0 0 1 4.693333 0 6.4 6.4 0 0 1 0 4.693333v49.92H938.666667V104.96a21.333333 21.333333 0 0 0-19.626667-19.626667zM911.786667 224.426667h28.586666v70.4h-28.586666zM911.786667 350.72h28.586666v77.653333h-28.586666zM911.786667 610.133333h28.586666v70.4h-28.586666zM911.786667 483.84h28.586666v70.4h-28.586666zM736.426667 912.213333h70.4v28.586667h-70.4zM83.626667 350.72h28.586666v77.653333h-28.586666zM83.626667 224.426667h28.586666v70.4h-28.586666zM83.626667 483.84h28.586666v70.4h-28.586666zM350.293333 83.626667h77.653334v28.586666H350.293333zM483.84 83.626667h70.4v28.586666h-70.4zM224 912.213333H294.4v28.586667H224zM83.626667 610.133333h28.586666v70.4h-28.586666zM83.626667 736.853333h28.586666v70.4h-28.586666zM111.786667 905.386667v-42.666667H85.333333v56.32a21.333333 21.333333 0 0 0 21.333334 21.333333h61.44v-28.586666H118.613333a6.826667 6.826667 0 0 1-6.826666-6.4zM85.333333 104.96v63.573333h28.586667V119.04a6.826667 6.826667 0 0 1 6.826667-6.826667h47.36V85.333333H104.96a21.333333 21.333333 0 0 0-19.626667 19.626667zM682.666667 499.2h-157.44V341.333333a13.226667 13.226667 0 1 0-26.026667 0v157.866667H341.333333a13.226667 13.226667 0 1 0 0 26.026667h157.44V682.666667a13.226667 13.226667 0 1 0 26.026667 0v-157.44H682.666667a13.226667 13.226667 0 0 0 0-26.026667z" fill="#707070" p-id="6095"/>
                          </svg>
                        </label>
                        <input type="file" id="input" class="" @change="_select_pic">
                      </div>
                    </template>
                  </div>
                </div>
              </div>

            </div>
          </div>

          <div class="vc-flex--center">
            <el-button type="" @click.native="params.type = 'info'">返回</el-button>
            <el-button type="primary" @click.native="_save_banner">保存</el-button>
          </div>
        </div>
      </div>
    </template>

  </div>
</template>
<style scoped>

</style>
