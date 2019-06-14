export default {
  data(){
    return {
      teacher:{
        pageNum:1,
        pageSize:15,
        list:[],
        totalNum:0,
        pageCount:0
      },
      parent:{
        pageNum:1,
        pageSize:15,
        list:[],
        totalNum:0,
        pageCount:0
      }
    }
  },
  methods:{
    //登录
    $get_user_login( params,loading = 2 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/user/login.do',
          loading: loading,
          data:{
            userName:params.userName,
            pwd:params.pwd
          }

        }).then((response) => {
          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '登录失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    },

    //获得老师列表
    $get_teacher_list( params,loading = 3 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/teacher/list.do',
          loading: loading,
          data:{
            search:params.search,
            pageNum:this.teacher.pageNum,
            pageSize:this.teacher.pageSize
          }

        }).then((response) => {
          this.teacher.list = response['data']['list'];
          this.teacher.pageCount = response['data']['pageCount'];
          this.teacher.totalNum = response['data']['totalNum'];

          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '获取老师列表失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    },
    //获得家长列表
    $get_parent_list( params,loading = 3 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/parent/list.do',
          loading: loading,
          data:{
            search:params.search,
            pageNum:this.parent.pageNum,
            pageSize:this.parent.pageSize
          }

        }).then((response) => {
          this.parent.list = response['data']['list'];
          this.parent.pageCount = response['data']['pageCount'];
          this.parent.totalNum = response['data']['totalNum'];

          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '获取家长列表失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    },
    //获得家长列表
    $get_referer_list( params,loading = 2 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/user/referer.do',
          loading: loading,
        }).then((response) => {

          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '获取推广关系表失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    },

  }
}
