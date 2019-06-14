export default {
  data(){
    return {
      classes:{
        pageNum:1,
        pageSize:15,
        list:[],
        totalNum:0,
        pageCount:0
      }
    }
  },
  methods:{

//获得班级列表
    $get_class_list( params,loading = 3 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/class/list.do',
          loading: loading,
          data:{
            search:params.search,
            pageNum:this.classes.pageNum,
            pageSize:this.classes.pageSize
          }

        }).then((response) => {
          this.classes.list = response['data']['list'];
          this.classes.pageCount = response['data']['pageCount'];
          this.classes.totalNum = response['data']['totalNum'];

          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '获取班级列表失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    }
  }
}
