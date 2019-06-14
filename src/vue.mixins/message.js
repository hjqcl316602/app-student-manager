export default {
  data(){
    return {
      message:{
        pageNum:1,
        pageSize:15,
        list:[],
        totalNum:0,
        pageCount:0
      }
    }
  },
  methods:{

    //获得消息列表
    $get_msg_list( params,loading = 3 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/msg/list.do',
          loading: loading,
          data:{
            pageNum:this.message.pageNum,
            pageSize:this.message.pageSize
          }

        }).then((response) => {
          this.message.list = response['data']['list'];
          this.message.pageCount = response['data']['pageCount'];

          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '获取消息列表失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    },
    //添加消息
    $insert_msg( params,loading = 3 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/msg/insert.do',
          loading: loading,
          data:{
            title:this.params.title,
            message:this.params.message
          }
        }).then((response) => {
          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '新增消息失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    }
  }
}
