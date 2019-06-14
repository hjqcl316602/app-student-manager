<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import classes  from '../vue.mixins/class'
  export default {
    name: "MainClass",
    components: {},
    mixins: [  classes  ],
    data() {
      return {
        params:{
          search:''
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
        this.classes.pageNum = 1 ;
        this.$get_class_list(this.params)
      },
      _get_list_page(currentPage){
        this.classes.pageNum = currentPage;
        this.$get_class_list(this.params)
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
    <template>
      <div class="vc-margin__lg--bm">
        <div class="vc-text--lg vc-text--bold">当前班级总数：{{ classes.totalNum }}</div>
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
      <table class="vp-table">
        <colgroup>
           <col  width="100"><col  ><col  ><col  >
        </colgroup>
        <tr class="vp-table--tr">
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">班级编号</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">班级名称</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">学校名称</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">地区</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">班级人数统计</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">创建人</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">创建时间</div></td>
        </tr>

        <tr class="vp-table--tr" v-for="(item,index) in classes.list">
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['classId']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['className']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['schoolName']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['areaName']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['stuNum']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['createdBy']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['time']}}</div></td>
        </tr>
      </table>
      <template v-if="classes.list.length == 0 ">
        <div class="vc-padding__lg--ud">
          <div class="vc-text--gray vc-text--center">无班级数据</div>
        </div>

      </template>
    </template>

    <template>
      <div class="vc-padding__lg vc-text--center"  v-if="classes.list.length > 0 &&   classes.list.length < classes.pageCount ">
        <el-pagination
          background
          layout="prev, pager, next"
          :total="classes.pageCount"
          :page-size="classes.pageSize"
          @current-change="_get_list_page"
        >
        </el-pagination>
      </div>
    </template>

  </div>
</template>
<style scoped></style>
