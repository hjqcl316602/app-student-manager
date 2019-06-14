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
        this.parent.pageNum = 1 ;
        this.$get_parent_list(this.params)
      },
      _get_list_page(currentPage){
        this.parent.pageNum = currentPage;
        this.$get_parent_list(this.params)
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
        <div class="vc-text--lg vc-text--bold">当前家长总数：{{ parent.totalNum }}</div>
      </div>
    </template>

    <template>
      <div class="vc-padding__lg--bm  ">
        <div class="vc-row">
          <div class="vc-col--08">
            <el-input v-model="params.search" placeholder="请输入家长姓名、学生名称、地址" @keyup.enter.native="_init_page">
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
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">家长编号</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">家长姓名</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">性别</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">关联孩子</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">孩子性别</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">与孩子关系</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">所在班级</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">学校名称</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">学校地址</div></td>
          <td class="vp-table--th"><div class="vp-table--content vc-text--light vc-text--bold ">班级人数统计</div></td>
        </tr>

        <tr class="vp-table--tr" v-for="(item,index) in parent.list">
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['parentId']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['trueName']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['parentSex'] | str_sex }}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['stuName']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['stuSex'] | str_sex }}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['chengHu']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['className']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['schoolName']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['areaName']}}</div></td>
          <td class="vp-table--td"><div class="vp-table--content vc-text--light">{{ item['stuNum'] || 0 }}</div></td>
        </tr>
      </table>
      <template>
        <div class="vc-padding__lg--ud" v-if="parent.list.length == 0 ">
          <div class="vc-text--gray vc-text--center">无家长数据</div>
        </div>

      </template>
    </template>
    <div class="vc-padding__lg vc-text--center" v-if=" parent.list.length > 0 &&   parent.list.length < parent.pageCount ">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="parent.pageCount"
        :page-size="parent.pageSize"
        @current-change="_get_list_page"
      >
      </el-pagination>
    </div>
  </div>
</template>
<style scoped></style>
