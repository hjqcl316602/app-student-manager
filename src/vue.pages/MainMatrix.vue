<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import jz  from '../vue.mixins/jz'
  export default {
    name: "MainMatrix",
    components: {},
    mixins: [ jz ],
    data() {
      return {
        params:{
          type:'info',
          typeId:'',
          areaId:'',
          edit:'insert'
        },

        editParams:{
          jzId:'',
          name:'',
          pic:'',
          url:'',
          type:'',
          sort:'',
          areaId:''
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
        await this.$get_jz_list(this.params)
        await this.$get_province_list();
        await this.$get_jz_type_list();

      },
      _init_params(){
        this.editParams.jzId = '';
        this.editParams.name = '';
        this.editParams.url = '';
        this.editParams.pic = '';
        this.editParams.areaId = '';
        this.editParams.type = '';
        this.editParams.sort = '';
      },
      _save_jz(){
        let message = this._valid_params();
        if(message ==='yes' ){
          if(this.params.edit ==='insert'){
            this.$insert_jz(this.editParams).then(()=>{
              this.$get_jz_list(this.params);
              this._init_params();
              this.params.type = 'info'
              this.$message({
                message: '新增矩阵成功',
                type: 'success'
              });
            })
          }else{
            this.$update_jz(this.editParams).then(()=>{
              this.$get_jz_list(this.params);
              this._init_params();
              this.params.type = 'info'
              this.$message({
                message: '更新矩阵成功',
                type: 'success'
              });
            })
          }

        }else{
          this.$message({
            message: message,
            type: 'warning'
          });
        }
      },
      _valid_params(){
        if(validates.validEmptyString(this.editParams.name)){
          return '请输入矩阵名称！'
        }
        if(validates.validEmptyString(this.editParams.url)){
          return '请输入矩阵链接！'
        }
        if(validates.validEmptyString(this.editParams.type)){
          return '请选择矩阵类型！'
        }
        if(validates.validEmptyString(this.editParams.name)){
          return '请选择矩阵所属！'
        }
        if(validates.validEmptyString(this.editParams.pic)){
          return '请选择矩阵logo！'
        }
        return 'yes'
      },
      _select_pic(e){
        let file = e.target.files[0];
        let formData = new FormData();
        formData.append('file',file);
        this.$upload_picture(formData).then((res)=>{
          e.target.value = '';
          this.editParams.pic = res['data']['fileUrl']
        })
      },
      _add_jz(){
        this.params.type = 'edit';
        this.params.edit = 'insert';
        this._init_params();
      },
      _search_jz(){
        this.jz.pageNum = 1 ;
        this.$get_jz_list(this.params)
      },
      _get_list_page(currentPage){
        this.jz.pageNum = currentPage;
        this.$get_jz_list(this.params)
      },
      _clear_search(){
        this.params.typeId = '';
        this.params.areaId = '';
        this.$get_jz_list(this.params)
      },
      _operate_jz(type,item){
        if(type === 'switch'){
          let params = {
            jzId:item['jzId'],status:( item['status'] == 0 ) ? 1 : 0
          };
          this.$update_jz_status(params).then(()=>{
            this.$get_jz_list(this.params);
            this.$message({
              message:  '矩阵状态修改成功',
              type: 'success'
            });
          })
        }else if(type === 'update'){
          this.params.edit = 'update';
          this.params.type = 'edit';

          this.editParams.jzId = item['jzId'];
          this.editParams.name = item['name'];
          this.editParams.url = item['url'];
          this.editParams.pic = item['pic'];
          this.editParams.sort = item['sort'];
          this.editParams.type = item['type'];
          this.editParams.areaId = item['areaId'];

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
      <div class="vc-padding__lg--bm  ">
        <div class="vc-row" data-gutter="20">
          <div class="vc-col--08 el-cover">
            <el-select v-model="params.typeId" placeholder="请选择矩阵类型...">
              <el-option
                v-for="item in jzType.list"
                :key="item.typeId"
                :label="item.name"
                :value="item.typeId">
              </el-option>
            </el-select>
          </div>
          <div class="vc-col--08 el-cover">
            <el-select v-model="params.areaId" placeholder="请选择地区...">
              <el-option
                v-for="item in province.list"
                :key="item.areaId"
                :label="item.areaName"
                :value="item.areaId">
              </el-option>
            </el-select>
          </div>
          <div class="vc-col--08">
            <div class="vc-flex--between-center">
              <div class=" ">
                <el-button type="primary" @click.native="_search_jz">查询</el-button>
                <el-button  @click.native="_clear_search">清空</el-button>
              </div>
              <div class=" ">
                <el-button type="primary" @click.native="_add_jz">添加矩阵</el-button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </template>

    <template>
      <table class="vp-table" >
        <colgroup>
          <col width="100">
          <col width="200">
          <col width="100">
          <col width="20%">
          <col width="200">
        </colgroup>
        <tr class="vp-table--tr">
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">序号</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">名称</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">logo</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">链接</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">类型</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">所属地区</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">顺序</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">状态</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">操作时间</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">操作</div></td>
        </tr>

        <tr class="vp-table--tr" v-for="(item,index) in jz.list" >
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ (index+1) * jz.pageNum }}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--bold">{{ item['name'] }}</div></td>


          <td class="vp-table--td">
            <div class="vp-table--content vc-text--light ">
              <div class="vc-margin--rt" style="width: 100px;height:100px;"  >
                <div class="vp-img__inner">
                  <img   :src="item['pic']" alt=""  class="vp-img--max"  >
                  <img src="../images/img-error-loading.png" alt="" class="vp-img--error vp-img--half">
                </div>
              </div>
            </div>
          </td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light vc-text--sm"> {{ item['url']}} </div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light vc-text--sm"> {{ item['typeName']}} </div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light vc-text--sm"> {{ item['areaName']}} </div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light vc-text--sm"> {{ item['sort']}} </div></td>
          <td class="vp-table--td">
            <div class="vp-table--content  ">
              <span v-if="item['status'] == 0" class="vc-text--gray">不可用</span>
              <span v-if="item['status'] == 1" class="vc-text--danger">正常</span>
            </div>
          </td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light vc-text--sm"> {{ item['updatedTime']}} </div></td>
          <td class="vp-table--td">
            <div class="vp-table--content vc-text--light">
              <el-button type="warning" @click.native="_operate_jz('switch' ,item)" v-if="item['status'] == 0">启用</el-button>
              <el-button type="danger" @click.native="_operate_jz('switch' ,item)" v-if="item['status'] == 1">关闭</el-button>
              <el-button type="primary" @click.native="_operate_jz('update' ,item)" >编辑</el-button>
            </div>
          </td>
        </tr>

      </table>
      <template v-if="jz.list.length == 0">
        <div class="vc-padding__lg--ud">
          <div class="vc-text--gray vc-text--center">暂无矩阵数据</div>
        </div>

      </template>
    </template>

    <template v-if="true">
      <div class="vc-padding__lg vc-text--center"  v-if="jz.list.length > 0 &&   jz.list.length < jz.pageCount ">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="jz.pageCount"
          :page-size="jz.pageSize"
          @current-change="_get_list_page"
        >
        </el-pagination>
      </div>
    </template>

  </template>


  <template v-if="params.type == 'edit'">
    <div class="vc-row">
      <div class="vc-col--12">

        <div class="vc-margin__lg--bm vc-text--center" >
          <span v-if="params.edit == 'update'" class="vc-text--bold ">更新矩阵</span>
          <span v-if="params.edit == 'insert'" class="vc-text--bold ">新增矩阵</span>
        </div>

        <div class="vc-flex vc-items--center vc-margin__lg--bm">
          <div class="" style="width: 100px;"><div class="vc-text--bold vc-text--right vc-padding--rt">矩阵名称：</div></div>
          <div class="vc-flex--fit">
            <el-input v-model="editParams.name" placeholder="请输入矩阵名称..."></el-input>
          </div>
        </div>



        <div class="vc-flex vc-items--center vc-margin__lg--bm">
          <div class="" style="width: 100px;"><div class="vc-text--bold vc-text--right vc-padding--rt">矩阵链接：</div></div>
          <div class="vc-flex--fit">
            <el-input v-model="editParams.url" placeholder="请输入矩阵链接..."></el-input>
          </div>
        </div>


        <div class="vc-flex vc-items--center vc-margin__lg--bm">
          <div class="" style="width: 100px;"><div class="vc-text--bold vc-text--right vc-padding--rt">矩阵类型：</div></div>
          <div class="vc-flex--fit">
            <el-select v-model="editParams.type" placeholder="请选择矩阵类型..."  >

              <el-option
                v-for="item in jzType.list"
                :key="item.typeId"
                :label="item.name"
                :value="item.typeId"
                v-if="item['status'] == 1"
              >
              </el-option>
            </el-select>
          </div>
        </div>


        <div class="vc-flex vc-items--center vc-margin__lg--bm">
          <div class="" style="width: 100px;"><div class="vc-text--bold vc-text--right vc-padding--rt">矩阵所属：</div></div>
          <div class="vc-flex--fit">
            <el-select v-model="editParams.areaId" placeholder="请选择矩阵所属...">
              <el-option
                v-for="item in province.list"
                :key="item.areaId"
                :label="item.areaName"
                :value="item.areaId">
              </el-option>
            </el-select>
          </div>
        </div>


        <div class="vc-flex vc-items--center vc-margin__lg--bm">
          <div class="" style="width: 100px;"><div class="vc-text--bold vc-text--right vc-padding--rt">矩阵顺序：</div></div>
          <div class="vc-flex--fit">
            <el-input-number v-model="editParams.sort" :min="1"></el-input-number>
          </div>
        </div>

        <div class="vc-flex vc-items--center vc-margin__lg--bm">
          <div class="" style="width: 100px;"><div class="vc-text--bold vc-text--right vc-padding--rt">矩阵logo：</div></div>
          <div class="vc-flex--fit">

            <div class="vc-row">
              <div class="vp-ratio" style="width: 200px">
                <div class="vp-ratio__outer" data-ratio="100%">
                  <template v-if="!!editParams.pic">
                    <div class="vp-ratio__inner vp-img__inner">
                      <img :src="editParams.pic" alt="" class="" @load="$img_load">
                    </div>
                    <div class="vp-img__close" @click="editParams.pic = ''">
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
          <el-button type="primary" @click.native="_save_jz">保存</el-button>
        </div>
      </div>
    </div>
  </template>

</div>
</template>
<style scoped></style>
