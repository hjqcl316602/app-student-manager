<script type="text/ecmascript-6">
  //import { VaPopupRadio }  from './component'
  import user  from '../vue.mixins/user'
  export default {
    name: "MainParent",
    components: {},
    mixins: [ user ],
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
        this.teacher.pageNum = 1 ;
        this.$get_teacher_list(this.params)
      },
      _get_list_page(currentPage){
        this.teacher.pageNum = currentPage;
        this.$get_teacher_list(this.params)
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
        <div class="vc-text--lg vc-text--bold">当前老师总数：{{ teacher.totalNum }}</div>
      </div>
    </template>

    <template>
      <div class="vc-padding__lg--bm  ">
        <div class="vc-row">
          <div class="vc-col--08">
            <el-input v-model="params.search" placeholder="请输入老师姓名、班级名称、地址" @keyup.enter.native="_init_page">
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
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">老师编号</div></td>
          <!--<td class="vp-table&#45;&#45;th"><div class="vp-table&#45;&#45;content vc-text&#45;&#45;light vc-text&#45;&#45;bold ">老师昵称</div></td>-->
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">老师姓名</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">所在班级</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">学校名称</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">学校地区</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">班级人数统计</div></td>
        </tr>

        <tr class="vp-table--tr" v-for="(item,index) in teacher.list">
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['teacherId']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['teacherName']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['className']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['schoolName']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['areaName']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['stuNum']}}</div></td>
        </tr>
      </table>
      <template>
        <div class="vc-padding__lg--ud" v-if="teacher.list.length == 0 ">
          <div class="vc-text--gray vc-text--center">无老师数据</div>
        </div>
      </template>
    </template>
    <div class="vc-padding__lg vc-text--center" v-if=" teacher.list.length > 0 &&   teacher.list.length < teacher.pageCount  ">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="teacher.pageCount"
        :page-size="teacher.pageSize"
        @current-change="_get_list_page"
      >
      </el-pagination>
    </div>
  </div>
</template>
<style scoped></style>
