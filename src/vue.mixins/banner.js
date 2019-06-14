export default {
  data(){
    return {
      banner:{
        pageNum:1,
        pageSize:15,
        list:[],
        totalNum:0,
        pageCount:0
      }
    }
  },
  methods:{

      //获得海报栏列表
    $get_banner_list( params,loading = 3 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/psd/list.do',
          loading: loading,
        }).then((response) => {
          this.banner.list = response['data'];
          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '获取海报栏列表失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    },
    //新增海报
    $insert_banner( params,loading = 2 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/psd/insert.do',
          loading: loading,
          data:{
            title:params.title,
            pic:params.pic,
            content:params.content,
            indx:params.indx,
          }
        }).then((response) => {
          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '海报栏新增失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    },
    //修改海报
    $update_banner( params,loading = 2 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/psd/update.do',
          loading: loading,
          data:{
            psdId:params.psdId,
            title:params.title,
            pic:params.pic,
            content:params.content,
            indx:params.indx,
            status:params.status
          }
        }).then((response) => {
          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '海报栏修改失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    },
    //删除海报
    $delete_banner( params,loading = 2 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/psd/update.do',
          loading: loading,
          data:{
            psdId:params.psdId,
            title:params.title,
            pic:params.pic,
            content:params.content,
            indx:params.indx,
            status:'3'
          }
        }).then((response) => {
          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '海报栏删除失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    },
    //上架海报
    $up_banner( params,loading = 2 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/psd/update.do',
          loading: loading,
          data:{
            psdId:params.psdId,
            title:params.title,
            pic:params.pic,
            content:params.content,
            indx:params.indx,
            status:'1'
          }
        }).then((response) => {
          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '海报栏上架失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    },
    //下架海报
    $down_banner( params,loading = 2 ){
      return new Promise((resovle, reject) => {

        this.$request({
          url: '/psd/update.do',
          loading: loading,
          data:{
            psdId:params.psdId,
            title:params.title,
            pic:params.pic,
            content:params.content,
            indx:params.indx,
            status:'2'
          }
        }).then((response) => {
          resovle(response)
        }, (error) => {
          this.$message({
            message: error['msg'] || '海报栏下架失败',
            type: 'warning'
          });
          reject(error)
        })
      })
    }
  }
}
