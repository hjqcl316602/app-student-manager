export default {
  data(){
    return {
      jzType:{
        list:[]
      },
      province:{
        list:[]
      },
      jz:{
        pageNum:1,
        pageSize:10,
        list:[],
        totalNum:0,
        pageCount:0
      }
    }
  },
  methods:{
    // 新增矩阵类型
    $insert_jz_type( params,loading = 2 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/jz/insertType.do',
          loading: loading,
          data:{
            name:params.name,
          }
        }).then((response) => {
          this.$get_jz_type_list()
          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '新增矩阵类型失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    },

    // 修改矩阵类型
    $update_jz_type( params,loading = 2 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/jz/updateType.do',
          loading: loading,
          data:{
            typeId:params.typeId,
            name:params.name,
          }
        }).then((response) => {
          this.$get_jz_type_list()
          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '更新矩阵类型失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    },

    // 切换矩阵状态
    $update_jz_type_status( params,loading = 2 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/jz/swithType.do',
          loading: loading,
          data:{
            typeId:params.typeId,
            status:params.status,
          }
        }).then((response) => {
          this.$get_jz_type_list();
          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '更新矩阵状态失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    },

    // 获取矩阵类型
    $get_jz_type_list( params,loading = 3 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/jz/typeList.do',
          loading: loading,

        }).then((response) => {
          this.jzType.list = response['data']
          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '获取矩阵类型失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    },
    // 获取省份
    $get_province_list( params,loading = 3 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/jz/province.do',
          loading: loading,
        }).then((response) => {
          this.province.list = response['data'];
          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '获取省份失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    },


    // 新增矩阵
    $insert_jz( params,loading = 2 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/jz/insertJz.do',
          loading: loading,
          data:{
             name:params.name,
             pic:params.pic,
             url:params.url,
             type:params.type,
             sort:params.sort,
             areaId:params.areaId,
          }
        }).then((response) => {

          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '新增矩阵失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    },
    // 修改矩阵
    $update_jz( params,loading = 2 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/jz/updateJz.do',
          loading: loading,
          data:{
            jzId:params.jzId,
            name:params.name,
            pic:params.pic,
            url:params.url,
            type:params.type,
            sort:params.sort,
            areaId:params.areaId,
          }
        }).then((response) => {

          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '更新矩阵失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    },
    // 新增矩阵
    $get_jz_list( params,loading = 3 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/jz/jzList.do',
          loading: loading,
          data:{
            pageSize:this.jz.pageSize,
            pageNum:this.jz.pageNum,
            type:params.typeId,
            areaId:params.areaId
          }
        }).then((response) => {
          this.jz.list = response['data']['list'];
          this.jz.pageCount = response['data']['cnt'];
          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '获取矩阵列表失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    },
    // 切换矩阵状态
    $update_jz_status(params,loading = 2 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/jz/swithJz.do',
          loading: loading,
          data:{
            jzId:params.jzId,
            status:params.status,
          }
        }).then((response) => {

          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '更新矩阵状态失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    }

  }
}
